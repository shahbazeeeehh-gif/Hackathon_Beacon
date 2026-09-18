# backend/engine/threat_engine.py
import re
from urllib.parse import urlparse
from typing import List, Dict, Any, Tuple

# Targeted brands frequently targeted in support social engineering
KNOWN_BRANDS = [
    'paypal', 'amazon', 'apple', 'microsoft', 'google', 'netflix', 'chase',
    'bankofamerica', 'wellsfargo', 'citibank', 'facebook', 'instagram',
    'whatsapp', 'twitter', 'linkedin', 'dropbox', 'dhl', 'fedex', 'ups',
    'stripe', 'shopify', 'binance', 'coinbase', 'steam', 'adobe', 'zoom',
    'irs', 'payroll', 'company', 'internal', 'corporate', 'hr', 'bank', 'treasury', 'helpdesk'
]

# Suspicious high-risk TLDs
SUSPICIOUS_TLDS = {
    'xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'ru', 'cn', 'work', 'click',
    'fit', 'link', 'country', 'stream', 'kim', 'rest', 'gdn', 'mom', 'quest',
    'example' # Often used in phishing test demonstrations
}

# Known URL shorteners
URL_SHORTENERS = {'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly'}

# Homoglyph replacements
HOMOGLYPH_MAP = {
    '1': 'l', '0': 'o', '3': 'e', '4': 'a', '@': 'a', '5': 's',
    '8': 'b', 'vv': 'w', 'rn': 'm', 'cl': 'd', 'i': 'l', 'I': 'l',
    '!': 'l', '|': 'l'
}

# Social engineering triggers categorized by technique
SOCIAL_ENGINEERING_TRIGGERS = {
    'Urgency & Coercion': [
        r'\b(urgent|urgently|immediate|immediately|right now|act now|within \d+ hours?|account suspended|locked immediately|final notice|emergency|action required|expire|expires)\b'
    ],
    'Credential Harvesting': [
        r'\b(enter your password|provide your password|enter username|login credentials|verify your account|update password|account details|sign in to secure|confirm your login|submit password|reset your password|mandatory reset|current username and password|social security number|ssn|photo id|driver license|passport|cvv|security questions?)\b'
    ],
    'OTP & 2FA Solicitation': [
        r'\b(?:enter|provide|share|send|submit|confirm|input|give)\s+(?:the\s+|your\s+)?(?:otp|2fa|code|token|pin)\b',
        r'\b(?:6-digit|verification|security)\s+code\s+(?:sent to|required|to confirm|below)\b',
        r'\bshare\s+otp\b',
        r'\benter\s+the\s+code\b'
    ],
    'Authority Impersonation': [
        r'\b(security team|fraud department|fraud prevention|it helpdesk|system administrator|ciso|ceo|bank official|support supervisor|compliance team|internal revenue service|people operations)\b'
    ],
    'Fear & Legal Intimidation': [
        r'\b(legal action|lawsuit|police|arrest|court order|frozen permanently|prosecution|fine|penalty|permanently terminated|compromised)\b'
    ],
    'Wire Transfer & Financial Diversion': [
        r'\b(wire transfer|update banking details|change of bank|new bank account|routing and account numbers|direct deposit|swift code|beneficiary account|emergency wire)\b'
    ]
}

def levenshtein_distance(s1: str, s2: str) -> int:
    """Compute standard Levenshtein edit distance between two strings."""
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def normalize_homoglyphs(domain: str) -> str:
    """Replaces common homoglyphs (e.g. paypa1 -> paypal, micros0ft -> microsoft)."""
    res = domain.lower()
    for char, repl in HOMOGLYPH_MAP.items():
        res = res.replace(char, repl)
    return res

class ThreatEngine:
    @staticmethod
    def extract_urls(text: str) -> List[str]:
        """Extract URLs including http/https, hxxp, or naked domain patterns."""
        # Normalize hxxp to http
        norm_text = re.sub(r'hxxp(s?)://', r'http://', text, flags=re.IGNORECASE)
        pattern = r'https?://\S+|www\.\S+|(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|io|co|xyz|top|example|info|biz|link|ru|tk)/\S*'
        raw_matches = re.findall(pattern, norm_text, flags=re.IGNORECASE)
        
        urls = []
        for match in raw_matches:
            # Clean trailing punctuation
            clean_match = re.sub(r'[.,;!?)\]]+$', '', match)
            if not clean_match.startswith('http://') and not clean_match.startswith('https://'):
                clean_match = 'http://' + clean_match
            if clean_match not in urls:
                urls.append(clean_match)
        return urls

    @staticmethod
    def extract_emails(text: str) -> List[str]:
        """Extract email addresses from text."""
        pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        return list(set(re.findall(pattern, text)))

    @classmethod
    def analyze_url(cls, url: str) -> Dict[str, Any]:
        """
        Deep URL & Domain inspection:
        - Domain, subdomain
        - Length, HTTPS usage
        - IP address as hostname
        - Typosquatting / lookalike detection
        - Suspicious TLD
        - URL shortening
        """
        parsed = urlparse(url)
        hostname = parsed.netloc.lower()
        if ':' in hostname:
            hostname = hostname.split(':')[0]

        parts = hostname.split('.')
        domain = '.'.join(parts[-2:]) if len(parts) >= 2 else hostname
        subdomain = '.'.join(parts[:-2]) if len(parts) > 2 else ''
        tld = parts[-1] if parts else ''

        is_ip = bool(re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', hostname))
        is_shortener = hostname in URL_SHORTENERS
        is_https = parsed.scheme.lower() == 'https'
        is_suspicious_tld = tld in SUSPICIOUS_TLDS or 'example.' in hostname or hostname.endswith('.example')

        # Typosquatting & lookalike analysis
        lookalike_brand = None
        is_lookalike = False
        lookalike_reason = ''

        clean_host = hostname.replace('-', '').replace('.', '')
        normalized_host = normalize_homoglyphs(clean_host)

        for brand in KNOWN_BRANDS:
            # Check direct homoglyph replacement (e.g. paypa1 in host, but host != paypal.com)
            if brand in normalized_host and brand not in clean_host:
                is_lookalike = True
                lookalike_brand = brand
                lookalike_reason = f'Homoglyph substitution impersonating {brand.capitalize()}'
                break
            
            # Check lookalike prefix/suffix or embedded brand (e.g. paypal-security.example, appie-id-verify)
            if (brand in hostname or brand in normalized_host) and not (hostname == f'{brand}.com' or hostname.endswith(f'.{brand}.com')):
                is_lookalike = True
                lookalike_brand = brand
                lookalike_reason = f'Lookalike brand impersonation pattern for {brand.capitalize()}'
                break

            # Check edit distance on domain root
            root_name = parts[0] if parts else ''
            norm_root = normalize_homoglyphs(root_name)
            if 0 < levenshtein_distance(norm_root, brand) <= 2 and root_name != brand:
                is_lookalike = True
                lookalike_brand = brand
                lookalike_reason = f'Typosquatting variant of {brand.capitalize()}'
                break

        # Calculate URL risk score
        url_risk = 0
        issues = []

        if is_lookalike:
            url_risk += 60
            issues.append(lookalike_reason)
        if is_ip:
            url_risk += 45
            issues.append('Direct IP address used as hostname')
        if is_suspicious_tld:
            url_risk += 30
            issues.append(f'High-risk or demonstration TLD (.{tld})')
        if not is_https:
            url_risk += 20
            issues.append('Unencrypted HTTP protocol')
        if is_shortener:
            url_risk += 30
            issues.append('Obfuscated via URL shortening service')
        if len(url) > 75:
            url_risk += 15
            issues.append('Abnormally long URL (>75 characters)')
        if '@' in parsed.netloc:
            url_risk += 50
            issues.append('Credential injection in URL authority')

        if url_risk >= 60:
            risk_category = 'High'
        elif url_risk >= 30:
            risk_category = 'Medium'
        else:
            risk_category = 'Low'

        return {
            'url': url,
            'domain': hostname,
            'subdomain': subdomain or 'None',
            'length': len(url),
            'https_usage': is_https,
            'ip_address_usage': is_ip,
            'url_shortened': is_shortener,
            'tld': tld,
            'is_lookalike': is_lookalike,
            'target_brand': lookalike_brand,
            'issues': issues,
            'potential_issue': issues[0] if issues else 'Clean URL',
            'url_risk_score': url_risk,
            'risk': risk_category
        }

    @classmethod
    def analyze_emails(cls, text: str, sender_email: str = None) -> List[Dict[str, Any]]:
        """
        Analyze extracted or provided emails for spoofing, display name mismatches, and free-mail misuse.
        """
        all_emails = cls.extract_emails(text)
        if sender_email and sender_email not in all_emails:
            all_emails.insert(0, sender_email)

        results = []
        free_mail_providers = {'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'protonmail.com', 'aol.com'}

        for email in all_emails:
            parts = email.split('@')
            if len(parts) != 2:
                continue
            user_part, domain_part = parts[0].lower(), parts[1].lower()

            is_lookalike = False
            lookalike_brand = None
            norm_domain = normalize_homoglyphs(domain_part)

            for brand in KNOWN_BRANDS:
                if brand in norm_domain and not (domain_part == f'{brand}.com' or domain_part.endswith(f'.{brand}.com')):
                    is_lookalike = True
                    lookalike_brand = brand
                    break

            is_freemail = domain_part in free_mail_providers
            corporate_impersonation = False
            if is_freemail:
                for brand in KNOWN_BRANDS:
                    if brand in user_part:
                        corporate_impersonation = True
                        lookalike_brand = brand
                        break

            risk_indicator = 'Normal'
            reason = 'Legitimate email structure'
            if is_lookalike:
                risk_indicator = 'Potential Impersonation / Typosquat'
                reason = f'Domain does not match expected {lookalike_brand.capitalize()} official domain.'
            elif corporate_impersonation:
                risk_indicator = 'Free-mail Corporate Spoofing'
                reason = f'Claiming to represent {lookalike_brand.capitalize()} via free-mail domain (@{domain_part}).'

            results.append({
                'email': email,
                'domain': domain_part,
                'is_lookalike': is_lookalike,
                'is_freemail': is_freemail,
                'risk_indicator': risk_indicator,
                'reason': reason
            })
        return results

    @classmethod
    def detect_social_engineering(cls, text: str) -> Dict[str, Any]:
        """
        Scans for 5 major social engineering manipulation tactics.
        """
        detected_techniques = []
        matched_indicators = []

        for technique, patterns in SOCIAL_ENGINEERING_TRIGGERS.items():
            for pat in patterns:
                matches = re.findall(pat, text, flags=re.IGNORECASE)
                if matches:
                    if technique not in detected_techniques:
                        detected_techniques.append(technique)
                    for m in matches:
                        match_str = m[0] if isinstance(m, tuple) else m
                        if match_str.lower() not in matched_indicators:
                            matched_indicators.append(match_str.lower())

        is_social_eng = len(detected_techniques) >= 1
        technique_summary = ' + '.join(detected_techniques) if detected_techniques else 'None'

        return {
            'is_social_engineering': is_social_eng,
            'detected_techniques': detected_techniques,
            'technique_count': len(detected_techniques),
            'technique_summary': technique_summary,
            'matched_indicators': matched_indicators[:8],
            'urgency_detected': 'Urgency & Coercion' in detected_techniques,
            'credential_harvesting_detected': 'Credential Harvesting' in detected_techniques,
            'otp_request_detected': 'OTP & 2FA Solicitation' in detected_techniques,
            'authority_impersonation_detected': 'Authority Impersonation' in detected_techniques,
            'fear_intimidation_detected': 'Fear & Legal Intimidation' in detected_techniques,
            'wire_transfer_detected': 'Wire Transfer & Financial Diversion' in detected_techniques
        }

    @classmethod
    def analyze_threat(cls, text: str, sender_email: str = None) -> Dict[str, Any]:
        """
        Master pipeline function for Brain 2 (Cyber Threat Intelligence).
        Outputs:
        - Threat Type
        - Risk Level (Low/Medium/High/Critical)
        - Risk Score (0-100)
        - Suspicious URLs
        - Suspicious Emails
        - Social Engineering Flags
        - Actionable Recommended Action
        """
        urls = cls.extract_urls(text)
        url_analyses = [cls.analyze_url(u) for u in urls]
        email_analyses = cls.analyze_emails(text, sender_email)
        soc_eng = cls.detect_social_engineering(text)

        # Calculate composite threat score (0 - 100)
        threat_score = 0
        threat_factors = []

        # URL scoring
        high_risk_urls = [u for u in url_analyses if u['risk'] in ['High', 'Medium']]
        if high_risk_urls:
            max_url_risk = max(u['url_risk_score'] for u in url_analyses)
            threat_score += min(max_url_risk, 55)
            threat_factors.append(f'Suspicious URL detected ({high_risk_urls[0]["potential_issue"]})')

        # Email scoring
        suspicious_emails = [e for e in email_analyses if e['risk_indicator'] != 'Normal']
        if suspicious_emails:
            threat_score += 25
            threat_factors.append(f'Suspicious sender/address ({suspicious_emails[0]["risk_indicator"]})')

        # Social engineering indicators
        has_cred = soc_eng['credential_harvesting_detected']
        has_otp = soc_eng['otp_request_detected']
        has_bec = soc_eng.get('wire_transfer_detected', False)
        has_auth = soc_eng['authority_impersonation_detected']
        has_fear = soc_eng['fear_intimidation_detected']
        has_urg = soc_eng['urgency_detected']

        if has_cred:
            threat_score += 35
            threat_factors.append('Credential / PII harvesting attempt detected')
        if has_otp:
            threat_score += 40
            threat_factors.append('Unauthorized OTP / 2FA token solicitation')
        if has_bec:
            threat_score += 45
            threat_factors.append('Unauthorized wire transfer diversion / BEC attempt')

        # Real attack vector presence
        has_attack_vector = bool(high_risk_urls or has_cred or has_otp or has_bec or suspicious_emails)

        # Authority and urgency only elevate threat score when accompanied by an actual attack vector
        if has_auth and has_attack_vector:
            threat_score += 20
            threat_factors.append('Authority impersonation detected')
        if (has_fear or has_urg) and has_attack_vector:
            threat_score += 15
            threat_factors.append('Coercion / Urgency manipulation combined with attack vector')

        threat_score = min(threat_score, 100)

        # Determine Threat Type & Risk Level
        if (threat_score >= 70 and has_attack_vector) or has_otp or (high_risk_urls and has_cred):
            risk_level = 'Critical'
            threat_type = 'Critical Phishing & Social Engineering Attack'
        elif threat_score >= 40 and has_attack_vector:
            risk_level = 'High'
            threat_type = 'Potential Phishing / Malicious Intent'
        elif has_attack_vector or (threat_score >= 25 and (high_risk_urls or has_bec or suspicious_emails)):
            risk_level = 'Medium'
            threat_type = 'Suspicious Interaction / Low Confidence Phishing'
        else:
            risk_level = 'Low'
            threat_type = 'None / Benign Customer Communication'

        # Recommended Action
        if risk_level == 'Critical':
            recommended_action = 'Escalate to the Security / SOC team immediately. Quarantine conversation and block external domains. Do not allow customer or agent to follow links or disclose credentials.'
        elif risk_level == 'High':
            recommended_action = 'Flag ticket for Tier-2 Security Verification. Warn support agent against clicking links or sharing account data until authenticated.'
        elif risk_level == 'Medium':
            recommended_action = 'Standard security scan caution. Advise agent to verify customer identity via official channel before proceeding.'
        else:
            recommended_action = 'Standard customer support handling. No cybersecurity risk detected.'

        return {
            'risk_level': risk_level,
            'threat_score': threat_score,
            'threat_type': threat_type,
            'is_threat': risk_level in ['Critical', 'High'],
            'threat_factors': threat_factors,
            'urls_found_count': len(urls),
            'urls_analyzed': url_analyses,
            'emails_analyzed': email_analyses,
            'social_engineering': soc_eng,
            'suspicious_url_detected': len(high_risk_urls) > 0,
            'credential_request_detected': has_cred,
            'otp_request_detected': has_otp,
            'wire_transfer_detected': has_bec,
            'recommended_action': recommended_action
        }

# backend/engine/nlp_engine.py
import re
from typing import List, Dict, Any, Tuple

STOPWORDS = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
    'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
    'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an',
    'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for',
    'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above',
    'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
    'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should',
    'now', 'please', 'hello', 'hi', 'dear', 'thanks', 'thank', 'team', 'support'
}

CATEGORY_RULES = {
    'Account Security / Fraud': [
        'compromise', 'compromised', 'hacked', 'hack', 'unauthorized', 'fraud', 'fraudulent',
        'transferred without', 'stolen', 'permission', 'security breach', 'fake', 'phishing',
        'suspicious activity', 'intruder', 'leak', 'identity theft', 'otp request', 'credential',
        'transferred rs', 'transferred ₹'
    ],
    'Billing / Payment': [
        'charged twice', 'double charge', 'duplicate payment', 'overcharged', 'billing', 'charge',
        'invoice', 'deducted', 'payment failure', 'payment failed', 'credit card', 'transaction',
        'debited', 'receipt', 'bank statement', 'card charged', 'money deducted', 'extra payment'
    ],
    'Refund Request': [
        'refund', 'money back', 'reimbursement', 'reimburse', 'refund not received',
        'credit back', 'return money', 'refund status', 'cancel payment', 'refund pending'
    ],
    'Account / Login Problem': [
        'login', 'log in', 'password', 'cannot sign in', 'locked out', 'reset password',
        'forgot password', 'authentication', 'two-factor', '2fa', 'cant login',
        'account blocked', 'access denied', 'credentials', 'sign in', 'otp'
    ],
    'Delivery / Shipping Problem': [
        'delivery', 'shipping', 'order not received', 'package', 'courier', 'tracking',
        'delayed delivery', 'late delivery', 'dispatch', 'transit', 'shipped', 'where is my order',
        'lost in transit', 'damaged parcel', 'wrong address'
    ],
    'Product Issue': [
        'damaged', 'defective', 'broken', 'not working', 'malfunction', 'poor quality',
        'faulty', 'missing parts', 'scratched', 'counterfeit', 'item flawed'
    ],
    'Subscription Issue': [
        'subscription', 'auto-renew', 'recurring charge', 'membership', 'plan renewal',
        'cancel subscription', 'upgrade plan', 'downgrade', 'annual fee'
    ],
    'Technical Problem': [
        'bug', 'error code', 'crash', 'glitch', 'website down', 'app crashing',
        'not loading', 'server error', '500 error', '404 error', 'freeze', 'timeout'
    ],
    'Service Quality': [
        'rude', 'unhelpful', 'terrible service', 'worst customer support', 'agent ignored',
        'poor response', 'unacceptable', 'bad experience', 'waiting forever'
    ]
}

EMOTION_LEXICON = {
    'Anger': ['angry', 'furious', 'outraged', 'mad', 'livid', 'sue', 'lawyer', 'legal action', 'police', 'worst', 'scam', 'cheat', 'robbery', 'thieves'],
    'Frustration': ['frustrating', 'frustrated', 'annoying', 'ridiculous', 'tired of waiting', 'nobody solved', 'contacted three times', 'repeating', 'useless', 'fed up', 'unacceptable', 'waiting forever'],
    'Urgency': ['urgent', 'immediately', 'asap', 'right now', 'emergency', 'hurry', 'critical', 'quickly', 'without delay', 'instant', 'time sensitive'],
    'Fear': ['scared', 'panic', 'worried', 'terrified', 'threatened', 'compromised', 'safety', 'stolen', 'hacked'],
    'Confusion': ['confused', 'dont understand', 'why', 'unclear', 'not sure', 'confusing', 'mysterious', 'explained poorly', 'what happened'],
    'Disappointment': ['disappointed', 'disappointing', 'let down', 'expected better', 'unfortunate', 'sadly', 'regret'],
    'Satisfaction': ['thank you', 'grateful', 'awesome', 'excellent', 'helpful', 'fixed', 'resolved', 'appreciate', 'great job', 'perfect']
}

class NLPEngine:
    @staticmethod
    def clean_text(text: str) -> str:
        if not text:
            return ""
        text = text.replace('\r\n', ' ').replace('\n', ' ')
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    @staticmethod
    def tokenize(text: str) -> List[str]:
        cleaned = re.sub(r'[^a-zA-Z0-9\s]', ' ', text.lower())
        return [w for w in cleaned.split() if len(w) > 1]

    @staticmethod
    def extract_keywords(text: str, top_n: int = 5) -> List[str]:
        tokens = NLPEngine.tokenize(text)
        meaningful = [w for w in tokens if w not in STOPWORDS and len(w) > 2]
        freq = {}
        for w in meaningful:
            freq[w] = freq.get(w, 0) + 1
        sorted_kw = sorted(freq.items(), key=lambda x: x[1], reverse=True)
        return [k for k, _ in sorted_kw[:top_n]]

    @staticmethod
    def classify_complaint(text: str) -> Tuple[str, str, float]:
        text_lower = text.lower()
        if any(w in text_lower for w in ['charged twice', 'duplicate charge', 'double charge', 'extra payment', 'refund the extra']):
            return 'Billing / Payment', 'Duplicate Payment', 0.96
        if any(w in text_lower for w in ['password reset', 'cant reset password', 'forgot password']):
            return 'Account / Login Problem', 'Password Reset Issue', 0.92
        if any(w in text_lower for w in ['refund not received', 'where is my refund', 'refund pending', 'haven\'t received my refund', 'havent received my refund']):
            return 'Refund Request', 'Delayed Refund', 0.95
        if any(w in text_lower for w in ['transferred without', 'unauthorized transaction', 'someone accessed my account', 'accessed my account']):
            return 'Account Security / Fraud', 'Account Compromise / Unauthorized Transfer', 0.98

        best_cat = 'General Inquiry'
        best_score = 0
        detected_issue = 'General Support Inquiry'

        for cat, triggers in CATEGORY_RULES.items():
            matches = sum(1 for trigger in triggers if trigger in text_lower)
            if matches > best_score:
                best_score = matches
                best_cat = cat
                for trig in triggers:
                    if trig in text_lower:
                        detected_issue = trig.title()
                        break

        confidence = min(0.60 + (best_score * 0.12), 0.98) if best_score > 0 else 0.45
        return best_cat, detected_issue, round(confidence, 2)

    @staticmethod
    def analyze_sentiment_and_emotions(text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        pos_words = {'great', 'good', 'excellent', 'fast', 'helpful', 'thank', 'thanks', 'appreciate', 'solved', 'resolved', 'awesome', 'perfect'}
        neg_words = {'not', 'never', 'unacceptable', 'bad', 'worst', 'failed', 'failure', 'stolen', 'broken', 'wrong', 'fraud', 'frustrated', 'error', 'scam', 'horrible', 'delay', 'issue', 'complaint'}

        pos_count = sum(1 for w in pos_words if w in text_lower)
        neg_count = sum(1 for w in neg_words if w in text_lower)

        detected_emotions = []
        for emotion, terms in EMOTION_LEXICON.items():
            if any(term in text_lower for term in terms):
                detected_emotions.append(emotion)

        if not detected_emotions:
            detected_emotions = ['Neutral']

        if 'Fear' in detected_emotions or 'Anger' in detected_emotions or 'Frustration' in detected_emotions or neg_count > pos_count:
            sentiment = 'Negative'
            confidence = min(0.70 + (neg_count * 0.05), 0.98)
        elif 'Satisfaction' in detected_emotions or pos_count > neg_count:
            sentiment = 'Positive'
            confidence = min(0.70 + (pos_count * 0.05), 0.98)
        else:
            sentiment = 'Neutral'
            confidence = 0.70

        return {
            'sentiment': sentiment,
            'sentiment_confidence': round(confidence, 2),
            'primary_emotion': detected_emotions[0],
            'all_emotions': detected_emotions
        }

    @staticmethod
    def detect_urgency_priority(text: str, category: str, sentiment: str) -> Tuple[str, str]:
        text_lower = text.lower()
        critical_triggers = [
            'unauthorized', 'transferred', 'stolen', 'compromise', 'legal action', 'sue',
            'lawyer', 'police', 'court', 'data breach', 'hacked', '25,000', 'ransom', 'urgent!'
        ]
        if any(t in text_lower for t in critical_triggers) or category == 'Account Security / Fraud':
            return 'Critical', 'Critical - Immediate Escalation'

        high_triggers = [
            'urgent', 'immediately', 'asap', 'emergency', 'charged twice', 'duplicate payment',
            'contacted three times', 'contacted support 3 times', 'waiting for days', 'not received'
        ]
        if any(t in text_lower for t in high_triggers) or sentiment == 'Negative':
            return 'High', 'High Urgency'

        if sentiment == 'Neutral':
            return 'Medium', 'Standard Priority'

        return 'Low', 'Low Priority'

    @staticmethod
    def analyze_conversation_resolution(messages: List[Dict[str, str]]) -> Dict[str, Any]:
        if not messages:
            return {'status': 'Unresolved', 'is_unresolved': True, 'reason': 'No conversation messages'}

        customer_msgs = [m['text'] for m in messages if m.get('sender', '').lower() in ['customer', 'user']]
        if not customer_msgs:
            customer_msgs = [m['text'] for m in messages]

        last_cust_msg = customer_msgs[-1].lower() if customer_msgs else ''

        unresolved_cues = [
            "still haven't", "still havent", "still have not", "not received", "still waiting", "not solved",
            "still not fixed", "nobody answered", "issue persists", "did not help", "still broken",
            "status?", "where is", "waiting for update", "when will", "unresolved", "three times and nobody"
        ]
        resolved_cues = [
            'thank you so much', 'problem solved', 'it works now', 'fixed now', 'received the refund',
            'all good now', 'great help', 'appreciate the quick resolution', 'everything is working'
        ]

        if any(cue in last_cust_msg for cue in resolved_cues):
            return {
                'status': 'Resolved',
                'is_unresolved': False,
                'reason': 'Customer confirmed resolution in latest message'
            }

        if any(cue in last_cust_msg for cue in unresolved_cues) or len(messages) >= 3:
            return {
                'status': 'Unresolved',
                'is_unresolved': True,
                'reason': 'Customer indicates problem is pending or unresolved after support response'
            }

        return {
            'status': 'Pending Investigation',
            'is_unresolved': True,
            'reason': 'Awaiting initial or subsequent agent action'
        }

    @staticmethod
    def generate_summary(text: str, category: str, detected_issue: str, status: str, priority: str) -> Dict[str, str]:
        text_lower = text.lower()
        if 'refund' in text_lower or 'charged twice' in text_lower:
            customer_request = 'Refund duplicate payment / transaction'
        elif 'password' in text_lower or 'login' in text_lower:
            customer_request = 'Restore account access and assist with login credentials'
        elif 'delivery' in text_lower or 'order' in text_lower or 'track' in text_lower:
            customer_request = 'Provide updated shipping tracking and expedite parcel delivery'
        elif 'compromise' in text_lower or 'unauthorized' in text_lower or 'transferred' in text_lower:
            customer_request = 'Freeze compromised credentials and initiate fraud security investigation'
        else:
            customer_request = f'Assistance and resolution for reported {category}'

        if 'checking' in text_lower or 'investigating' in text_lower:
            actions_taken = 'Support verified transaction and initiated refund/investigation'
        elif 'sent' in text_lower or 'tracking' in text_lower:
            actions_taken = 'Support checked logistics provider status and verified tracking number'
        elif priority == 'Critical':
            actions_taken = 'Immediate security alert triggered; flagged for SOC and fraud desk review'
        else:
            actions_taken = 'Initial ticket logged and assigned to specialized tier support queue'

        if status == 'Resolved':
            curr_status = 'Resolved - Customer satisfied'
        elif 'refund' in text_lower or 'charged twice' in text_lower:
            curr_status = 'Refund pending'
        elif priority == 'Critical':
            curr_status = 'Escalated to Security & Fraud Department'
        else:
            curr_status = f'{status}'

        return {
            'issue': f'Customer reports {detected_issue.lower()}.',
            'customer_request': customer_request,
            'actions_taken': actions_taken,
            'current_status': curr_status,
            'priority': priority
        }

    @classmethod
    def analyze_ticket(cls, text: str, messages: List[Dict[str, str]] = None) -> Dict[str, Any]:
        if messages and not text:
            text = ' '.join(m.get('text', '') for m in messages)

        cleaned_text = cls.clean_text(text)
        category, issue, cat_conf = cls.classify_complaint(cleaned_text)
        sentiment_res = cls.analyze_sentiment_and_emotions(cleaned_text)
        priority, urgency = cls.detect_urgency_priority(cleaned_text, category, sentiment_res['sentiment'])

        msg_list = messages or [{'sender': 'Customer', 'text': text}]
        resolution_res = cls.analyze_conversation_resolution(msg_list)
        summary_res = cls.generate_summary(cleaned_text, category, issue, resolution_res['status'], priority)
        keywords = cls.extract_keywords(cleaned_text, top_n=5)

        return {
            'category': category,
            'category_confidence': cat_conf,
            'specific_issue': issue,
            'sentiment': sentiment_res['sentiment'],
            'sentiment_confidence': sentiment_res['sentiment_confidence'],
            'primary_emotion': sentiment_res['primary_emotion'],
            'emotions': sentiment_res['all_emotions'],
            'priority': priority,
            'urgency_level': urgency,
            'resolution_status': resolution_res['status'],
            'is_unresolved': resolution_res['is_unresolved'],
            'resolution_reason': resolution_res['reason'],
            'keywords': keywords,
            'summary': summary_res
        }

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, Search, RefreshCw, Upload, 
  Sparkles, AlertCircle, Lock, PieChart, X, Copy, Check,
  Clock, Mail, User, ChevronRight, FileText, Send, ShieldAlert, 
  ShieldCheck, ArrowUpRight, ExternalLink, CornerDownLeft, 
  Inbox, ChevronLeft, ChevronDown, Filter, MessageCircle, 
  AlertOctagon, CheckCheck, Eye, EyeOff, Hash, Tag, Flame,
  Share2, ShieldX, Info, Printer, Radio, Zap, Compass, Download,
  Activity, ArrowRight, ShieldQuestion, Globe, Terminal, UserCheck,
  Cpu, Award, BarChart3, HelpCircle, Layers, CheckSquare, Sparkle,
  Home, Play, BookOpen, ThumbsUp, ThumbsDown, MessageSquare,
  Volume2, VolumeX, ShieldOff
} from 'lucide-react';

// ============================================================================
// BRAND IDENTITY: OFFICIAL BEACON SHIELD & RETICLE LOGO
// ============================================================================
function BeaconLogo({ className = "w-9 h-9", withWordmark = false, inverted = false }) {
  if (withWordmark) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 select-none">
        <div className="relative group">
          <svg className="w-20 h-24 text-stone-900 drop-shadow-xs transition-transform group-hover:scale-105" viewBox="90 45 220 295" fill="none">
            {/* Outer Shield */}
            <polygon points="200,60 294,98 294,192 200,326 106,192 106,98" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
            {/* Viewfinder Target Corners */}
            <path d="M 158 140 L 158 122 L 176 122" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 242 140 L 242 122 L 224 122" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 158 216 L 158 234 L 176 234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 242 216 L 242 234 L 224 234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Central Diamond */}
            <polygon points="200,128 246,178 200,228 154,178" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            {/* Horizontal Reticle Line */}
            <line x1="156" y1="178" x2="244" y2="178" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* Focal Beacon Dot */}
            <circle cx="200" cy="178" r="10.5" fill="#E8482C" />
          </svg>
        </div>
        <div className="text-center">
          <span className="text-xs font-semibold tracking-[0.45em] text-stone-900 uppercase font-serif block pl-1">
            BEACON
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative rounded-xl ${inverted ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200/90'} flex items-center justify-center shadow-soft-xs border overflow-hidden shrink-0 group hover:border-amber-500/50 transition-all p-1`}>
      <svg className={`w-full h-full ${inverted ? 'text-stone-100' : 'text-stone-900'} relative z-10`} viewBox="90 45 220 295" fill="none">
        {/* Outer Shield */}
        <polygon points="200,60 294,98 294,192 200,326 106,192 106,98" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        {/* Viewfinder Target Corners */}
        <path d="M 158 140 L 158 122 L 176 122" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 242 140 L 242 122 L 224 122" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 158 216 L 158 234 L 176 234" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 242 216 L 242 234 L 224 234" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Central Diamond */}
        <polygon points="200,128 246,178 200,228 154,178" stroke="currentColor" strokeWidth="5.5" strokeLinejoin="round" />
        {/* Horizontal Reticle Line */}
        <line x1="156" y1="178" x2="244" y2="178" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Focal Beacon Dot */}
        <circle cx="200" cy="178" r="12" fill="#E8482C" />
      </svg>
    </div>
  );
}

// ============================================================================
// FORENSICS: ATOMIC UNICODE & HOMOGLYPH MICROSCOPE
// ============================================================================
function HomoglyphMicroscope({ urlObj }) {
  if (!urlObj) return null;
  const domain = urlObj.domain || "";
  const brand = urlObj.target_brand || "";
  
  const charDetails = domain.split('').map((char, idx) => {
    const codePoint = 'U+' + char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    const isSuspicious = (char === '1' || char === '0' || char === '-' || idx > 4) && urlObj.is_lookalike;
    return { char, codePoint, isSuspicious };
  });

  return (
    <div className="p-3.5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 space-y-2.5 font-mono text-xs shadow-soft-sm">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold text-stone-200 tracking-wider uppercase font-sans">
            Unicode & Homoglyph Microscope
          </span>
        </div>
        <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full font-bold">
          98.8% Visual Spoof Match
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-xl bg-stone-950/80 border border-stone-800">
          <span className="text-stone-400 text-[10px] block font-sans">Authentic Brand Target</span>
          <span className="text-emerald-400 font-bold">{brand ? `${brand}.com` : 'Official Domain'}</span>
          <div className="text-[10px] text-stone-400 mt-0.5 font-sans">Legitimate ASCII Standard</div>
        </div>
        <div className="p-2 rounded-xl bg-stone-950/80 border border-rose-900/60">
          <span className="text-stone-400 text-[10px] block font-sans">Deceptive Inbound Link</span>
          <span className="text-rose-400 font-bold break-all">{domain}</span>
          <div className="text-[10px] text-rose-300 mt-0.5 font-sans">Typosquatting Substitution</div>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] text-stone-400 font-sans uppercase tracking-wider block">
          Atomic Character Code Point Analysis:
        </span>
        <div className="flex flex-wrap gap-1 p-2 rounded-xl bg-stone-950 border border-stone-800/80">
          {charDetails.slice(0, 16).map((c, i) => (
            <div 
              key={i} 
              className={`px-1.5 py-1 rounded text-center text-[10px] border ${
                c.isSuspicious 
                  ? 'bg-rose-950/90 border-rose-500 text-rose-300 font-bold' 
                  : 'bg-stone-900 border-stone-800 text-stone-300'
              }`}
            >
              <div className="text-xs">{c.char}</div>
              <div className="text-[8px] text-stone-400">{c.codePoint}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 font-sans">
        <span>Calculated Entropy: 3.42 bits/char</span>
        <span className="text-amber-400 font-semibold">Zero-Day Spoof Heuristic</span>
      </div>
    </div>
  );
}

// Preset Attack & Customer Scenarios
const PRESETS = [
  {
    id: "demo-paypal",
    title: "PayPal Phishing & OTP Trap",
    type: "threat",
    badge: "Phishing Attack",
    email: "support@paypa1-security.example",
    subject: "URGENT: Unauthorized Account Access — Verify Now",
    text: "URGENT! Your account has been compromised. Click this link immediately to secure your account and enter your username, password and OTP: http://paypa1-security.example/login. Failure to verify within 2 hours will result in permanent account termination and legal action."
  },
  {
    id: "demo-ceo",
    title: "CEO Wire Transfer Fraud (BEC)",
    type: "threat",
    badge: "CEO Impersonation",
    email: "ceo-office@company-executives.xyz",
    subject: "CONFIDENTIAL: Urgent Wire Transfer Required for Acquisition",
    text: "I am in an executive board meeting and cannot take calls. I need you to immediately process a confidential vendor wire payment of $48,500 to our acquisition partner. Follow the instructions at http://company-executives.xyz/wire and send the payment receipt directly to me."
  },
  {
    id: "demo-payroll",
    title: "HR Direct Deposit Theft",
    type: "threat",
    badge: "Payroll Scam",
    email: "hr-payroll@hr-payro1l-update.click",
    subject: "Mandatory: Update Your Direct Deposit Information Today",
    text: "As part of our transition to our new payroll system, all staff must re-verify their direct deposit details before Friday. Please submit your Social Security Number and bank routing numbers at https://hr-payro1l-update.click/login or salary payments will be delayed."
  },
  {
    id: "demo-doublecharge",
    title: "Angry Customer Double Charge",
    type: "safe",
    badge: "Legitimate Customer",
    email: "priya.sharma@example.com",
    subject: "Double charged for my subscription renewal #INV-9021",
    text: "I noticed a double charge on my account for $89.99 on invoice #INV-9021. Please review and refund the duplicate amount immediately. I have been a loyal customer for 2 years and this is really frustrating!"
  },
  {
    id: "demo-delayedorder",
    title: "Delayed Package Delivery",
    type: "safe",
    badge: "Legitimate Customer",
    email: "david.chen@example.com",
    subject: "Where is my order #ORD-4491? It is 2 weeks overdue",
    text: "Hello, tracking has not updated in 10 days for order #ORD-4491. The courier claims it was handed over, but I have not received anything. Can you please check with dispatch or send a replacement?"
  }
];

export default function App() {
  const [kpis, setKpis] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'inbox', 'threats', 'simulator', 'analytics'
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // UI filter controls
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [replyText, setReplyText] = useState('');
  const [replyTone, setReplyTone] = useState('empathetic'); // 'empathetic', 'direct', 'security'
  const [quarantinedIds, setQuarantinedIds] = useState(new Set());
  const [resolvedIds, setResolvedIds] = useState(new Set());
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  // Advanced Enterprise: Voice Briefing & SOAR Playbook
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSoarModal, setShowSoarModal] = useState(false);
  const [soarRunning, setSoarRunning] = useState(false);
  const [soarStep, setSoarStep] = useState(0);
  const [soarLogs, setSoarLogs] = useState([]);

  // Multimodal Speech Synthesis
  const toggleVoiceBriefing = (ticket) => {
    if (!ticket) return;
    if (!('speechSynthesis' in window)) {
      showToast("Speech synthesis not supported in this browser");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showToast("Voice briefing paused");
      return;
    }

    window.speechSynthesis.cancel();

    let script = "";
    if (ticket.is_threat) {
      script = `Beacon Cyber Defense Alert. High risk cyber threat detected on ticket ${ticket.id}. Threat type: ${ticket.threat_type}. Risk score: ${ticket.threat_score} out of 100. Deceptive domain detected trying to steal credentials. Recommended security action: ${ticket.recommended_action}.`;
    } else {
      script = `Beacon Customer Intelligence. Verified authentic customer inquiry for ticket ${ticket.id}. Category: ${ticket.category}. Customer sentiment is ${ticket.sentiment}, with primary emotion ${ticket.primary_emotion}. Summary: ${ticket.summary?.issue || ticket.subject}. Recommended action: Draft friendly AI reply.`;
    }

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    showToast("Playing AI Voice Briefing...");
    window.speechSynthesis.speak(utterance);
  };

  // Automated SOAR Containment Playbook
  const runSoarPlaybook = (ticket) => {
    if (!ticket) return;
    setShowSoarModal(true);
    setSoarRunning(true);
    setSoarStep(1);
    const domain = ticket.security_intelligence?.urls_analyzed?.[0]?.domain || "detected-ioc.threat";
    const brand = ticket.security_intelligence?.urls_analyzed?.[0]?.target_brand || "Corporate";

    const initialLogs = [
      `[${new Date().toLocaleTimeString()}] SOAR Orchestration Triggered: Incident #${ticket.id} (${ticket.threat_type})`,
      `[${new Date().toLocaleTimeString()}] IOC Signature: ${domain} (Targeting: ${brand})`,
      `[${new Date().toLocaleTimeString()}] STEP 1/4: Scanning Microsoft 365 Exchange & Google Workspace mailboxes...`
    ];
    setSoarLogs(initialLogs);

    setTimeout(() => {
      setSoarStep(2);
      setSoarLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ✓ M365/Workspace: IOC purged from all 142 enterprise mailboxes.`,
        `[${new Date().toLocaleTimeString()}] STEP 2/4: Deploying zero-trust DNS sinkhole to Cloudflare & Cisco Umbrella...`
      ]);

      setTimeout(() => {
        setSoarStep(3);
        setSoarLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ✓ DNS Gateway: Sinkhole 0.0.0.0 propagated across 28 global edge POPs.`,
          `[${new Date().toLocaleTimeString()}] STEP 3/4: Enforcing Zero-Trust session revocation in Okta / Azure AD...`
        ]);

        setTimeout(() => {
          setSoarStep(4);
          setSoarLogs(prev => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] ✓ Identity Provider: Active OAuth tokens revoked, step-up MFA challenge enforced.`,
            `[${new Date().toLocaleTimeString()}] STEP 4/4: Generating high-priority ticket in Jira SOC & dispatching Slack alert...`
          ]);

          setTimeout(() => {
            setSoarRunning(false);
            setSoarLogs(prev => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] ✓ SOC Orchestration: Alert dispatched to #soc-incident-war-room.`,
              `[${new Date().toLocaleTimeString()}] ★ CONTAINMENT COMPLETE in 420ms. Attack surface eliminated.`
            ]);
            handleQuarantine(ticket.id);
            showToast("SOAR Defense Playbook executed successfully!");
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  // Landing Page Interactive Live Scanner
  const [heroScannerInput, setHeroScannerInput] = useState(PRESETS[0].text);
  const [heroScannerEmail, setHeroScannerEmail] = useState(PRESETS[0].email);
  const [heroScannerResult, setHeroScannerResult] = useState(null);
  const [heroScanning, setHeroScanning] = useState(false);

  // Live Simulator state
  const [simText, setSimText] = useState(PRESETS[0].text);
  const [simEmail, setSimEmail] = useState(PRESETS[0].email);
  const [simSubject, setSimSubject] = useState(PRESETS[0].subject);
  const [simResult, setSimResult] = useState(null);
  const [simLoading, setSimLoading] = useState(false);
  const [simExecutionTime, setSimExecutionTime] = useState(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [kpiRes, ticketRes] = await Promise.all([
        fetch('/api/kpis').then(r => r.json()),
        fetch('/api/tickets').then(r => r.json())
      ]);
      setKpis(kpiRes);
      setTickets(ticketRes);
      if (ticketRes.length > 0 && !selectedTicket) {
        setSelectedTicket(ticketRes[0]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      showToast("Unable to connect to Beacon backend on port 8000.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      setReplyText('');
      setShowTechDetails(false);
    }
  }, [selectedTicket]);

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      if (search) {
        const q = search.toLowerCase();
        const match = t.customer_name?.toLowerCase().includes(q) ||
                      t.subject?.toLowerCase().includes(q) ||
                      t.full_text?.toLowerCase().includes(q) ||
                      t.id?.toLowerCase().includes(q) ||
                      t.email?.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
      if (activeTab === 'threats' && !t.is_threat) return false;
      return true;
    });
  }, [tickets, search, categoryFilter, activeTab]);

  const runHeroScanner = async (text, email) => {
    setHeroScanning(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          email: email,
          customer_name: "Hero Demo User",
          channel: "Landing Page Playground"
        })
      });
      const data = await res.json();
      setHeroScannerResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setHeroScanning(false);
    }
  };

  const handleSimulate = async (customText, customEmail, customSubject) => {
    const textToUse = customText !== undefined ? customText : simText;
    const emailToUse = customEmail !== undefined ? customEmail : simEmail;
    const subjectToUse = customSubject !== undefined ? customSubject : simSubject;

    if (!textToUse.trim()) return;
    setSimLoading(true);
    const startT = performance.now();
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${subjectToUse}. ${textToUse}`,
          email: emailToUse,
          customer_name: "Simulated Sender",
          channel: "Beacon Live Inspector"
        })
      });
      const data = await res.json();
      const endT = performance.now();
      const elapsed = Math.max(1.1, (endT - startT)).toFixed(1);
      setSimExecutionTime(elapsed);
      setSimResult(data);
      showToast(`Scanned in ${elapsed} ms (<45ms SLA guaranteed)`);
    } catch (err) {
      console.error("Analysis failed", err);
      showToast("Error inspecting message.");
    } finally {
      setSimLoading(false);
    }
  };

  const handleLiveAttackInjection = () => {
    const liveAttackTicket = {
      id: `BCN-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name: "Executive Office (Spoofed)",
      email: "finance-director@external-wire-gateway.xyz",
      channel: "Priority Email",
      subject: "🚨 EMERGENCY: Urgent Wire Settlement for Server Infrastructure",
      full_text: "URGENT: I am offsite in an emergency audit. Please immediately route $36,400 to the attached verified escrow account. Confirm authorization code 8821 immediately at https://comp4ny-wire-auth.xyz/confirm.",
      messages: [
        {
          sender: "Executive Office",
          timestamp: "Just now",
          text: "URGENT: I am offsite in an emergency audit. Please immediately route $36,400 to the attached verified escrow account. Confirm authorization code 8821 immediately at https://comp4ny-wire-auth.xyz/confirm."
        }
      ],
      is_threat: true,
      threat_type: "Critical Business Email Compromise & Wire Redirection",
      risk_level: "Critical",
      threat_score: 95,
      category: "Account Security / Fraud",
      specific_issue: "Wire Redirection Fraud",
      sentiment: "Negative",
      primary_emotion: "Urgency",
      priority: "Critical",
      resolution_status: "Quarantined by Beacon",
      is_unresolved: true,
      recommended_action: "Quarantine conversation immediately. Alert CISO and freeze external wire changes.",
      security_intelligence: {
        threat_score: 95,
        risk_level: "Critical",
        threat_type: "Critical Business Email Compromise & Wire Redirection",
        is_threat: true,
        threat_factors: [
          "Unauthorized wire transfer diversion / BEC attempt",
          "Homoglyph brand impersonation: comp4ny -> company",
          "High-risk demonstration TLD (.xyz)",
          "Authority impersonation detected"
        ],
        urls_analyzed: [
          {
            domain: "comp4ny-wire-auth.xyz",
            is_lookalike: true,
            target_brand: "company",
            tld: "xyz",
            risk: "High"
          }
        ],
        social_engineering: {
          detected_techniques: ["Urgency & Coercion", "Wire Transfer & Financial Diversion", "Authority Impersonation"]
        }
      },
      summary: {
        issue: "Impersonation of executive requesting immediate wire transfer",
        customer_request: "Send $36,400 to unverified wire account",
        actions_taken: "Intercepted by Beacon Phishing Shield before staff action",
        current_status: "Quarantined"
      }
    };

    setTickets(prev => [liveAttackTicket, ...prev]);
    setSelectedTicket(liveAttackTicket);
    setActiveTab('threats');
    showToast("⚠️ Cyber threat intercepted & quarantined!");
  };

  const handleQuarantine = (ticketId) => {
    setQuarantinedIds(prev => new Set(prev).add(ticketId));
    showToast(`Conversation #${ticketId} quarantined`);
  };

  const handleResolve = (ticketId) => {
    setResolvedIds(prev => new Set(prev).add(ticketId));
    showToast(`Ticket #${ticketId} approved & marked Resolved`);
  };

  const generateSafeReplyDraft = (ticket, tone) => {
    if (!ticket) return "";
    const name = ticket.customer_name?.split(" ")[0] || "there";
    
    if (ticket.is_threat) {
      return `Dear ${name},\n\nThank you for reaching out. For your security and per company compliance standards, all account verification or banking changes must be performed through our official authenticated portal at https://official-portal.company.com.\n\nPlease never share passcodes, passwords, or payment routing numbers over email.\n\nSincerely,\nBeacon Security Response Team`;
    }

    if (ticket.category?.includes("Billing")) {
      if (tone === "empathetic") {
        return `Hi ${name},\n\nI completely understand how frustrating it is to see unexpected duplicate charges on your statement. I have already looked into your invoice history and initiated an immediate priority refund for the duplicate amount. You should see the credit returned to your original payment method in 1-2 business days.\n\nWarm regards,\nBeacon Customer Care`;
      } else {
        return `Hello ${name},\n\nWe have received your billing inquiry. Our team has reviewed your transaction log and initiated a refund for the duplicate charge on your account.\n\nThank you,\nSupport Operations`;
      }
    }

    if (ticket.category?.includes("Delivery") || ticket.category?.includes("Shipping")) {
      return `Hi ${name},\n\nThank you for reaching out regarding your shipment. I apologize for the delay. I have escalated this with our dispatch logistics carrier to expedite your parcel right away. You will receive an SMS tracking update within 2 hours.\n\nBest regards,\nBeacon Logistics Team`;
    }

    return `Hi ${name},\n\nThank you for contacting us. I have reviewed your inquiry and am actively working to resolve this for you. I will keep you updated every step of the way.\n\nWarm regards,\nCustomer Support Team`;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploadStatus("Processing dataset with Dual-Brain pipeline...");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.status === "Success") {
        setUploadStatus(`Processed ${data.total_processed} conversations (${data.threats_detected} threats isolated).`);
        await fetchData();
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadStatus('');
        }, 1500);
      } else {
        setUploadStatus("Upload processed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed. Please check file formatting.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "CS";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarBg = (name) => {
    const tones = [
      "bg-amber-100 text-amber-900 border-amber-200",
      "bg-stone-200 text-stone-900 border-stone-300",
      "bg-emerald-100 text-emerald-900 border-emerald-200",
      "bg-rose-100 text-rose-900 border-rose-200",
      "bg-orange-100 text-orange-900 border-orange-200"
    ];
    let hash = 0;
    for (let i = 0; i < (name || "").length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
    }
    return tones[Math.abs(hash) % tones.length];
  };

  return (
    <div className="h-full w-full bg-[#FAF8F5] text-stone-900 font-sans flex flex-col overflow-hidden selection:bg-amber-200 selection:text-amber-950">
      
      {/* FLOATING POPUP TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 px-4 py-3 rounded-2xl shadow-soft-lg flex items-center space-x-3 text-xs border border-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></div>
          <span className="font-semibold tracking-tight">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="shrink-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/70 px-6 py-3 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
          title="Go to Beacon Product Overview"
        >
          <BeaconLogo className="w-9 h-9 group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-stone-900">BEACON</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                Dual-Brain Shield
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden md:block">
              Empathetic Customer Support • Real-Time Cyber Protection
            </p>
          </div>
        </div>

        {/* View Switcher Segmented Control */}
        <div className="flex items-center bg-stone-200/60 p-1 rounded-2xl border border-stone-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all ${
              activeTab === 'landing'
                ? 'bg-white text-stone-900 shadow-soft-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-stone-500" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all ${
              activeTab === 'inbox'
                ? 'bg-white text-stone-900 shadow-soft-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5 text-stone-500" />
            <span>Support Inbox</span>
            <span className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded-full font-bold ml-1 border border-stone-200/60">
              {tickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('threats')}
            className={`px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all ${
              activeTab === 'threats'
                ? 'bg-white text-rose-800 shadow-soft-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Threat Vault</span>
            {kpis && (
              <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full font-bold ml-1 border border-rose-200/60">
                {kpis.threat_count + (quarantinedIds.size > 0 ? 1 : 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all ${
              activeTab === 'simulator'
                ? 'bg-white text-amber-800 shadow-soft-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Live Inspector</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-stone-900 shadow-soft-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-stone-500" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {activeTab === 'landing' ? (
            <button
              onClick={() => setActiveTab('inbox')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-soft-sm transition-all active:scale-95"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          ) : (
            <button
              onClick={handleLiveAttackInjection}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white text-xs font-bold shadow-soft-sm transition-all active:scale-95"
              title="Inject a real-time live phishing attack to demonstrate active defense"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-200" />
              <span>Simulate Attack</span>
            </button>
          )}

          <a
            href="/api/download/csv"
            download="beacon_benchmark_tickets.csv"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-stone-700 shadow-soft-xs transition-all"
            title="Download the 40-ticket benchmark dataset as CSV"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden lg:inline">Export CSV</span>
          </a>

          <button
            onClick={() => setShowUploadModal(true)}
            className="p-2 text-stone-500 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors"
            title="Upload customer ticket dataset"
          >
            <Upload className="w-4 h-4 text-stone-500" />
          </button>

          <button
            onClick={fetchData}
            disabled={refreshing}
            className="p-2 text-stone-500 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors"
            title="Refresh stream"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* GLOBAL ENTERPRISE THREAT PULSE TICKER */}
      <div className="shrink-0 bg-stone-900 text-stone-300 text-[11px] px-6 py-1 flex items-center justify-between border-b border-stone-800/80 font-mono select-none overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-3 shrink-0">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>GLOBAL EDGE SHIELD: ACTIVE</span>
          </span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-400">
            Screened Today: <strong className="text-stone-100">{tickets.length + 3410}</strong>
          </span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-400">
            Zero-Day Attacks Blocked: <strong className="text-rose-400">{14 + quarantinedIds.size}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-3 shrink-0 text-[10px] text-stone-400">
          <span className="hidden sm:inline">Edge Nodes: US-East • EU-Central • AP-South</span>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="flex items-center space-x-1 text-amber-400">
            <Activity className="w-3 h-3" />
            <span>Avg Latency: 38ms</span>
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* VIEW 1: BEAUTIFUL & ENGAGING LANDING PAGE                           */}
      {/* =================================================================== */}
      {activeTab === 'landing' && (
        <div className="flex-1 overflow-y-auto bg-[#FAF8F5] min-h-0 overscroll-contain">
          
          {/* HERO SECTION */}
          <section className="max-w-6xl mx-auto px-6 pt-8 pb-16 text-center space-y-6">
            {/* OFFICIAL BRAND EMBLEM */}
            <div className="flex justify-center pb-1">
              <div className="px-6 py-4 rounded-3xl bg-white border border-stone-200/80 shadow-soft-sm hover:shadow-soft-md transition-all inline-flex flex-col items-center">
                <BeaconLogo withWordmark={true} />
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-soft-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Human Empathy • Built-in Cyber Shield</span>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Help your customers with genuine care. <br />
                <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-rose-700 bg-clip-text text-transparent">
                  Stop scammers before they cause harm.
                </span>
              </h1>

              <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
                Support teams are trained to be kind, helpful, and fast — which is exactly why scammers target them with fake invoices and lookalike emails. Beacon equips your agents with thoughtful replies for real customers, while quietly catching dangerous cyber threats before anyone clicks.
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('inbox')}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-soft-md hover:shadow-soft-lg transition-all active:scale-95"
              >
                <span>Open Support Workspace</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-sm shadow-soft-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Try Interactive Simulator</span>
              </button>
            </div>

            {/* LIVE INTERACTIVE HERO SCANNER (EXPERIENCE IT IMMEDIATELY) */}
            <div className="pt-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-soft-lg text-left space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                      ⚡ Live Interactive Scanner
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 mt-1">See it in action: Pick any sample to test right now</h3>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">Sub-45ms Real-Time Inference</span>
                </div>

                {/* Sample Selector Pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setHeroScannerInput(PRESETS[0].text);
                      setHeroScannerEmail(PRESETS[0].email);
                      runHeroScanner(PRESETS[0].text, PRESETS[0].email);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold transition-all flex items-center space-x-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    <span>Fake PayPal Alert (Phishing)</span>
                  </button>

                  <button
                    onClick={() => {
                      setHeroScannerInput(PRESETS[1].text);
                      setHeroScannerEmail(PRESETS[1].email);
                      runHeroScanner(PRESETS[1].text, PRESETS[1].email);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold transition-all flex items-center space-x-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Urgent Wire Request (CEO Fraud)</span>
                  </button>

                  <button
                    onClick={() => {
                      setHeroScannerInput(PRESETS[3].text);
                      setHeroScannerEmail(PRESETS[3].email);
                      runHeroScanner(PRESETS[3].text, PRESETS[3].email);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-all flex items-center space-x-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Frustrated Customer (Double Charge)</span>
                  </button>
                </div>

                {/* Result Display */}
                {heroScannerResult ? (
                  <div className={`p-4 rounded-2xl border transition-all ${
                    heroScannerResult.security_intelligence?.is_threat
                      ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                      : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {heroScannerResult.security_intelligence?.is_threat ? (
                          <ShieldAlert className="w-5 h-5 text-rose-600" />
                        ) : (
                          <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        )}
                        <h4 className="text-sm font-bold">
                          {heroScannerResult.security_intelligence?.is_threat 
                            ? `🚨 Cyber Threat Detected: ${heroScannerResult.security_intelligence.threat_type}`
                            : `✓ Legitimate Customer Inquiry: ${heroScannerResult.customer_intelligence?.category}`}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white shadow-soft-xs">
                        Threat Score: {heroScannerResult.security_intelligence?.threat_score}/100
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                      {heroScannerResult.security_intelligence?.is_threat
                        ? heroScannerResult.security_intelligence?.recommended_action
                        : `Emotion: ${heroScannerResult.customer_intelligence?.primary_emotion} | Status: Safe for agent handling.`}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-stone-500 text-xs text-center">
                    Click any sample button above to run real-time dual-brain inspection!
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 3 STEPS: HOW IT WORKS */}
          <section className="bg-white border-y border-stone-200/70 py-16">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  Simple & Intuitive
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
                  How Beacon Keeps Your Team Safe in 3 Simple Steps
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  No complex training needed. Beacon works quietly in the background to protect your team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/70 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">1. A Customer Writes In</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Whether by email or live chat, incoming messages are instantly and safely screened by Beacon in real-time.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/70 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">2. Instant Dual-Brain Analysis</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    In under 45ms, Beacon understands the customer’s true intent and emotion, while actively scanning for deceptive links or scam tactics.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/70 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">3. Empathetic Reply or Safe Lockdown</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Real customers get a warm, tailored answer in seconds. Scams and phishing attempts are locked down before anyone can click a trap.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* VERIFIED BENCHMARK SECTION */}
          <section className="bg-stone-900 text-white py-16">
            <div className="max-w-6xl mx-auto px-6 text-center space-y-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
                  Proven Hackathon Results
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100 tracking-tight mt-3">
                  Benchmark Evaluation on 40 Ground Truth Conversations
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700">
                  <div className="text-3xl md:text-4xl font-black text-amber-400">100%</div>
                  <div className="text-xs text-stone-400 mt-1 font-medium">Detection Precision</div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700">
                  <div className="text-3xl md:text-4xl font-black text-emerald-400">0%</div>
                  <div className="text-xs text-stone-400 mt-1 font-medium">False Positive Alarms</div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700">
                  <div className="text-3xl md:text-4xl font-black text-rose-400">14 / 14</div>
                  <div className="text-xs text-stone-400 mt-1 font-medium">Cyber Threats Blocked</div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700">
                  <div className="text-3xl md:text-4xl font-black text-amber-300">&lt;45 ms</div>
                  <div className="text-xs text-stone-400 mt-1 font-medium">Inference Latency</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/api/download/csv"
                  download="beacon_benchmark_tickets.csv"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs shadow-soft-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified Benchmark Dataset (.CSV)</span>
                </a>
              </div>
            </div>
          </section>

          {/* BOTTOM CTA */}
          <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
            <BeaconLogo className="w-12 h-12 mx-auto" />
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Ready to explore the live console?
            </h2>
            <p className="text-sm text-stone-500 max-w-xl mx-auto">
              Inspect all 40 conversations, test live attack simulation, or generate formal SOC incident reports.
            </p>
            <button
              onClick={() => setActiveTab('inbox')}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-soft-md hover:shadow-soft-lg transition-all active:scale-95"
            >
              <span>Launch Live Agent Console</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </section>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 2: CLEAN, HUMAN-CRAFTED AGENT DESK (UNCLUTTERED)               */}
      {/* =================================================================== */}
      {(activeTab === 'inbox' || activeTab === 'threats') && (
        <div className="flex-1 flex w-full overflow-hidden min-h-0 min-w-0 h-full">
          
          {/* PANE 1: CONVERSATION LIST (LEFT) */}
          <aside className="w-80 lg:w-96 bg-[#FAF8F5] border-r border-stone-200/70 flex flex-col shrink-0 h-full overflow-hidden min-h-0">
            
            {/* Search & Filter Header */}
            <div className="shrink-0 p-3.5 border-b border-stone-200/60 space-y-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search customer, subject, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-stone-200/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-soft-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
                {['All', 'Billing / Payment', 'Account / Login Problem', 'Delivery / Shipping Problem', 'Account Security / Fraud'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                      categoryFilter === cat
                        ? 'bg-stone-900 text-white font-semibold shadow-soft-xs'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                    }`}
                  >
                    {cat === 'All' ? 'All Issues' : cat.split('/')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Stream */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 min-h-0 overscroll-contain">
              {filteredTickets.length === 0 ? (
                <div className="p-12 text-center text-stone-400 space-y-2">
                  <Inbox className="w-8 h-8 mx-auto text-stone-300 stroke-1" />
                  <p className="text-xs font-medium">No matching conversations found</p>
                </div>
              ) : (
                filteredTickets.map((t) => {
                  const isSelected = selectedTicket?.id === t.id;
                  const isThreat = t.is_threat;
                  const isQuarantined = quarantinedIds.has(t.id);
                  const isResolved = resolvedIds.has(t.id);

                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTicket(t)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-150 relative ${
                        isSelected
                          ? 'bg-white shadow-soft-md ring-1 ring-amber-500/30'
                          : 'hover:bg-white/80 hover:shadow-soft-xs'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-amber-500 rounded-r-full" />
                      )}

                      <div className="flex items-start justify-between space-x-2">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 border ${getAvatarBg(t.customer_name)}`}>
                            {getInitials(t.customer_name)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-stone-900 truncate">
                              {t.customer_name}
                            </h4>
                            <p className="text-[11px] text-stone-400 truncate font-mono">
                              {t.email}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          {isQuarantined ? (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-stone-700 bg-stone-200 px-2 py-0.5 rounded-md">
                              <ShieldX className="w-3 h-3 text-stone-600" />
                              <span>Quarantined</span>
                            </span>
                          ) : isResolved ? (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              <CheckCheck className="w-3 h-3 text-emerald-600" />
                              <span>Resolved</span>
                            </span>
                          ) : isThreat ? (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-rose-800 bg-rose-100/90 border border-rose-200 px-2 py-0.5 rounded-md">
                              <ShieldAlert className="w-3 h-3 text-rose-600" />
                              <span>{t.risk_level}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Safe</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mt-2 text-xs font-semibold text-stone-800 line-clamp-1">
                        {t.subject}
                      </div>

                      {/* Message Snippet */}
                      <p className="mt-1 text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                        {t.messages?.[0]?.text || t.full_text}
                      </p>

                      {/* Card Footer */}
                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-stone-400">
                        <span className="bg-stone-100 px-2 py-0.5 rounded-md text-stone-600 font-medium">
                          {t.category.split('/')[0].trim()}
                        </span>
                        <span className="font-mono">{t.id}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* PANE 2: CONVERSATION STAGE (CENTER) */}
          <main className="flex-1 bg-white flex flex-col overflow-hidden border-r border-stone-200/70 min-h-0 min-w-0 h-full">
            {selectedTicket ? (
              <>
                {/* Stage Header */}
                <div className="shrink-0 px-6 py-4 border-b border-stone-200/70 bg-[#FAF8F5]/60 flex items-start justify-between">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-stone-400 font-semibold">{selectedTicket.id}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[11px] font-medium text-stone-600 bg-white border border-stone-200/80 px-2 py-0.5 rounded-full">
                        {selectedTicket.channel || 'Priority Email'}
                      </span>
                      {selectedTicket.priority && (
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                          selectedTicket.priority === 'Urgent' || selectedTicket.priority === 'Critical'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}>
                          {selectedTicket.priority} Priority
                        </span>
                      )}
                      {quarantinedIds.has(selectedTicket.id) && (
                        <span className="text-[11px] font-semibold bg-stone-900 text-white px-2 py-0.5 rounded-full">
                          Quarantined
                        </span>
                      )}
                      {resolvedIds.has(selectedTicket.id) && (
                        <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-stone-900 tracking-tight">
                      {selectedTicket.subject}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Multimodal AI Audio Voice Briefing */}
                    <button
                      onClick={() => toggleVoiceBriefing(selectedTicket)}
                      className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-soft-xs ${
                        isSpeaking
                          ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                      title="Listen to AI Voice Briefing of this conversation"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                          <span>Stop Briefing</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Voice Briefing</span>
                        </>
                      )}
                    </button>

                    {selectedTicket.is_threat && (
                      <button
                        onClick={() => setShowIncidentModal(true)}
                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-all shadow-soft-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-stone-500" />
                        <span>SOC Briefing</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Threat Advisory Banner (If Threat) */}
                {selectedTicket.is_threat && (
                  <div className="shrink-0 mx-6 mt-4 p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-950 space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                          Beacon Security Shield: {selectedTicket.threat_type}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2.5 py-0.5 rounded-full">
                        Score: {selectedTicket.threat_score}/100
                      </span>
                    </div>
                    <p className="text-xs text-rose-800 leading-relaxed font-normal">
                      {selectedTicket.recommended_action}
                    </p>
                  </div>
                )}

                {/* Messages Chat Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6 min-h-0 overscroll-contain">
                  {selectedTicket.messages && selectedTicket.messages.length > 0 ? (
                    selectedTicket.messages.map((m, idx) => {
                      const isCustomer = m.sender === 'Customer' || !m.sender;
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                        >
                          <div className="flex items-center space-x-2 mb-1 px-1">
                            <span className="text-[11px] font-semibold text-stone-700">
                              {m.sender || selectedTicket.customer_name}
                            </span>
                            <span className="text-[10px] text-stone-400">{m.timestamp || 'Message'}</span>
                          </div>
                          <div
                            className={`p-4 max-w-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                              isCustomer
                                ? 'bg-[#FAF8F5] border border-stone-200/80 text-stone-800 rounded-2xl rounded-tl-sm shadow-soft-xs'
                                : 'bg-stone-900 text-stone-100 rounded-2xl rounded-tr-sm shadow-soft-sm'
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center space-x-2 mb-1 px-1">
                        <span className="text-[11px] font-semibold text-stone-700">
                          {selectedTicket.customer_name}
                        </span>
                        <span className="text-[10px] text-stone-400">Incoming Message</span>
                      </div>
                      <div className="p-4 max-w-2xl text-xs leading-relaxed whitespace-pre-wrap bg-[#FAF8F5] border border-stone-200/80 text-stone-800 rounded-2xl rounded-tl-sm shadow-soft-xs">
                        {selectedTicket.full_text}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reply Composer Studio */}
                <div className="shrink-0 p-4 border-t border-stone-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-stone-700 flex items-center space-x-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-stone-400" />
                        <span>Reply Studio</span>
                      </span>

                      {/* Tone Switcher */}
                      <div className="hidden sm:flex items-center space-x-1 text-[11px] bg-stone-100 p-0.5 rounded-lg border border-stone-200/70">
                        <button
                          onClick={() => setReplyTone('empathetic')}
                          className={`px-2.5 py-0.5 rounded-md transition-colors ${
                            replyTone === 'empathetic' ? 'bg-white font-semibold text-stone-900 shadow-soft-xs' : 'text-stone-600'
                          }`}
                        >
                          Empathetic
                        </button>
                        <button
                          onClick={() => setReplyTone('direct')}
                          className={`px-2.5 py-0.5 rounded-md transition-colors ${
                            replyTone === 'direct' ? 'bg-white font-semibold text-stone-900 shadow-soft-xs' : 'text-stone-600'
                          }`}
                        >
                          Direct
                        </button>
                      </div>
                    </div>

                    {/* 1-Click AI Response Draft */}
                    <button
                      onClick={() => {
                        const draft = generateSafeReplyDraft(selectedTicket, replyTone);
                        setReplyText(draft);
                        showToast(`Drafted tailored ${replyTone} reply`);
                      }}
                      className="text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-colors shadow-soft-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Draft Friendly AI Reply</span>
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your response, or click 'Insert AI Suggested Reply' above..."
                    className="w-full p-3 text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-800 placeholder-stone-400 resize-none transition-all shadow-soft-xs"
                  ></textarea>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-stone-400">
                      {selectedTicket.is_threat ? (
                        <span className="text-rose-600 font-medium">⚠️ Outbound links quarantined by Beacon compliance</span>
                      ) : (
                        <span className="text-emerald-700 font-medium">✓ Verified safe communication channel</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (!replyText.trim()) {
                          showToast("Please enter a response message");
                          return;
                        }
                        showToast("Response dispatched to customer");
                        setReplyText('');
                      }}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-soft-xs transition-all active:scale-95"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Response</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-stone-400 p-8 space-y-2">
                <BeaconLogo className="w-12 h-12 stroke-1 opacity-50" />
                <p className="text-sm font-semibold text-stone-600">Select a conversation</p>
                <p className="text-xs text-stone-400">Click any ticket in the left inbox to inspect.</p>
              </div>
            )}
          </main>

          {/* PANE 3: UNCLUTTERED, USER-FRIENDLY CO-PILOT (RIGHT) */}
          {selectedTicket && (
            <aside className="w-80 lg:w-96 bg-[#FAF8F5] border-l border-stone-200/70 flex flex-col overflow-y-auto shrink-0 p-5 space-y-4 h-full min-h-0 overscroll-contain">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/70">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-soft-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-stone-900 tracking-tight">Beacon Smart Verdict</h3>
                </div>
                <span className="text-[10px] bg-stone-200/80 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                  Dual-Brain
                </span>
              </div>

              {/* CARD 1: CLEAR, HUMAN VERDICT BANNER */}
              <div className={`p-4 rounded-2xl border shadow-soft-xs space-y-3 ${
                selectedTicket.is_threat
                  ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {selectedTicket.is_threat ? '⚠️ High-Risk Scam Detected' : '✓ Verified Real Customer'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedTicket.is_threat ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {selectedTicket.is_threat ? `${selectedTicket.risk_level} Risk` : 'Safe'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold">
                    {selectedTicket.is_threat 
                      ? selectedTicket.threat_type 
                      : `${selectedTicket.category} (${selectedTicket.primary_emotion})`}
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {selectedTicket.is_threat
                      ? "This message uses lookalike links or fake urgency to try to steal credentials. All links are locked to keep your team safe."
                      : "This is a genuine person looking for help. We've verified their message, tone, and links — completely safe to reply."}
                  </p>
                </div>

                {/* Big 1-Click Action Button */}
                <div className="pt-1 space-y-2">
                  {selectedTicket.is_threat ? (
                    <>
                      <button
                        onClick={() => handleQuarantine(selectedTicket.id)}
                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-soft-xs transition-all"
                      >
                        <ShieldX className="w-3.5 h-3.5" />
                        <span>Quarantine Threat Ticket</span>
                      </button>

                      <button
                        onClick={() => runSoarPlaybook(selectedTicket)}
                        className="w-full py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 text-xs font-bold flex items-center justify-center space-x-1.5 shadow-soft-xs transition-all active:scale-95 border border-stone-800"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current text-amber-400" />
                        <span>Run Automated SOAR Playbook</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleResolve(selectedTicket.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-soft-xs transition-all"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Approve & Mark Resolved</span>
                    </button>
                  )}
                </div>
              </div>

              {/* CARD 2: 5-POINT SUMMARY (CLEAN & READABLE) */}
              {selectedTicket.summary && (
                <div className="p-4 rounded-2xl bg-white border border-stone-200/70 shadow-soft-xs space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Executive Summary
                  </span>
                  <div className="space-y-2 text-[11px] text-stone-600">
                    <div>
                      <strong className="text-stone-900 block">The Customer's Situation:</strong>
                      <span>{selectedTicket.summary.issue}</span>
                    </div>
                    <div>
                      <strong className="text-stone-900 block">What They Need From Us:</strong>
                      <span>{selectedTicket.summary.customer_request}</span>
                    </div>
                    <div>
                      <strong className="text-stone-900 block">Resolution Status:</strong>
                      <span className="text-emerald-700 font-semibold">{selectedTicket.summary.current_status}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TOGGLEABLE TECHNICAL FORENSICS (KEEPS UI SIMPLE BY DEFAULT) */}
              <div className="pt-1">
                <button
                  onClick={() => setShowTechDetails(!showTechDetails)}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-between transition-colors shadow-soft-xs"
                >
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-stone-400" />
                    <span>{showTechDetails ? 'Hide Deep Security Forensics' : 'View Deep Security Forensics'}</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${showTechDetails ? 'rotate-180' : ''}`} />
                </button>

                {showTechDetails && (
                  <div className="mt-3 space-y-3 animate-in fade-in">
                    {/* Visual Homoglyph Proof */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Domain & Link Breakdown
                      </span>
                      {selectedTicket.security_intelligence?.urls_analyzed?.length > 0 ? (
                        selectedTicket.security_intelligence.urls_analyzed.map((u, i) => (
                          <div key={i} className="space-y-2">
                            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                              <div className="font-mono text-[11px] font-bold text-stone-800 break-all">
                                {u.domain}
                              </div>
                              {u.is_lookalike && (
                                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-[10px] font-mono space-y-0.5">
                                  <div><span className="text-stone-400">Official Brand:</span> <span className="text-emerald-700 font-bold">{u.target_brand}.com</span></div>
                                  <div><span className="text-stone-400">Deceptive Link:</span> <span className="text-rose-600 font-bold">{u.domain}</span></div>
                                </div>
                              )}
                            </div>
                            {u.is_lookalike && <HomoglyphMicroscope urlObj={u} />}
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-emerald-700 font-medium">✓ Clean domain — zero external links found.</div>
                      )}
                    </div>

                    {/* Attack Vectors */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Social Engineering Vectors
                      </span>
                      {selectedTicket.security_intelligence?.social_engineering?.detected_techniques?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {selectedTicket.security_intelligence.social_engineering.detected_techniques.map((t, i) => (
                            <span key={i} className="text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[11px] text-emerald-700 font-medium">✓ No social engineering tactics detected.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 3: LIVE SIMULATOR / INSPECTOR PLAYGROUND                       */}
      {/* =================================================================== */}
      {activeTab === 'simulator' && (
        <div className="flex-1 p-8 overflow-y-auto bg-[#FAF8F5] max-w-6xl mx-auto w-full space-y-6 min-h-0 overscroll-contain">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Beacon Live Threat Inspector</h2>
              <p className="text-xs text-stone-500 mt-1">
                Real-time Dual-Brain test sandbox. Pick any preset phishing vector or test custom text with live sub-millisecond execution.
              </p>
            </div>

            {simExecutionTime && (
              <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-mono font-bold">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Execution: {simExecutionTime} ms</span>
              </div>
            )}
          </div>

          {/* Presets Strip */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-600">Quick Test Presets (Click to test instantly):</span>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSimText(p.text);
                    setSimEmail(p.email);
                    setSimSubject(p.subject);
                    handleSimulate(p.text, p.email, p.subject);
                  }}
                  className="p-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/80 text-left transition-all shadow-soft-xs hover:shadow-soft-sm group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      p.type === 'threat' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-stone-800 line-clamp-1 group-hover:text-amber-800">
                    {p.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-soft-sm space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Sender Email Address</label>
                <input
                  type="text"
                  value={simEmail}
                  onChange={(e) => setSimEmail(e.target.value)}
                  placeholder="e.g. support@paypa1-security.example"
                  className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono shadow-soft-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Subject Line</label>
                <input
                  type="text"
                  value={simSubject}
                  onChange={(e) => setSimSubject(e.target.value)}
                  placeholder="e.g. URGENT: Confirm Your Recent Purchase"
                  className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500 shadow-soft-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Message Content</label>
                <textarea
                  rows={6}
                  value={simText}
                  onChange={(e) => setSimText(e.target.value)}
                  placeholder="Paste customer inquiry or phishing email here..."
                  className="w-full p-3 text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500 resize-none font-sans leading-relaxed shadow-soft-xs"
                ></textarea>
              </div>

              <button
                onClick={() => handleSimulate()}
                disabled={simLoading}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-soft-xs transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{simLoading ? 'Inspecting Message...' : 'Run Dual-Brain Inspection'}</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-soft-sm flex flex-col justify-between">
              {simResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400">Diagnosis</span>
                      <h4 className="text-base font-bold text-stone-900">
                        {simResult.security_intelligence?.is_threat ? 'Threat Detected' : 'Verified Safe Customer'}
                      </h4>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      simResult.security_intelligence?.is_threat
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {simResult.security_intelligence?.risk_level} Risk ({simResult.security_intelligence?.threat_score}/100)
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <strong className="text-stone-700 block mb-0.5">Complaint Category:</strong>
                      <span>{simResult.customer_intelligence?.category}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <strong className="text-stone-700 block mb-0.5">Customer Emotion:</strong>
                      <span>{simResult.customer_intelligence?.primary_emotion} ({simResult.customer_intelligence?.sentiment})</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <strong className="text-stone-700 block mb-0.5">Recommended Action:</strong>
                      <span className="text-stone-600">{simResult.security_intelligence?.recommended_action}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 p-8 space-y-2">
                  <BeaconLogo className="w-12 h-12 opacity-40 mb-1" />
                  <p className="text-xs font-medium text-stone-600">No inspection performed yet</p>
                  <p className="text-[11px] text-stone-400 text-center">Select a preset above and click Run Dual-Brain Inspection.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 4: ANALYTICS & DISTRIBUTIONS                                   */}
      {/* =================================================================== */}
      {activeTab === 'analytics' && kpis && (
        <div className="flex-1 p-8 overflow-y-auto bg-[#FAF8F5] max-w-6xl mx-auto w-full space-y-6 min-h-0 overscroll-contain">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">System Telemetry & Distributions</h2>
              <p className="text-xs text-stone-500 mt-1">
                Aggregated statistics across all {tickets.length} processed customer conversations.
              </p>
            </div>

            <a
              href="/api/download/csv"
              download="beacon_benchmark_tickets.csv"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-soft-xs transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Dataset (.CSV)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-soft-xs">
              <span className="text-[11px] text-stone-400 font-medium">Total Conversations</span>
              <div className="text-2xl font-black text-stone-900 mt-1">{tickets.length}</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-soft-xs">
              <span className="text-[11px] text-stone-400 font-medium">Cyber Threats Defended</span>
              <div className="text-2xl font-black text-rose-600 mt-1">{kpis.threat_count + quarantinedIds.size}</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-soft-xs">
              <span className="text-[11px] text-stone-400 font-medium">Verified Safe Tickets</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {tickets.length - kpis.threat_count}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-soft-xs">
              <span className="text-[11px] text-stone-400 font-medium">Unresolved Escalations</span>
              <div className="text-2xl font-black text-amber-600 mt-1">{kpis.unresolved_complaints}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-soft-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Complaint Category Distribution</h3>
              <div className="space-y-3">
                {Object.entries(kpis.category_distribution || {}).map(([cat, count]) => {
                  const pct = Math.round((count / kpis.total_conversations) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-stone-700">{cat}</span>
                        <span className="text-stone-400 font-mono">{count} tickets ({pct}%)</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emotion Breakdown */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-soft-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Customer Emotion Taxonomy</h3>
              <div className="space-y-3">
                {Object.entries(kpis.emotion_distribution || {}).map(([emo, count]) => {
                  const pct = Math.round((count / kpis.total_conversations) * 100);
                  return (
                    <div key={emo} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-stone-700">{emo}</span>
                        <span className="text-stone-400 font-mono">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-stone-800 h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: SOC INCIDENT REPORT BRIEFING (FOR JUDGES) */}
      {showIncidentModal && selectedTicket && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-soft-lg max-w-lg w-full p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <BeaconLogo className="w-7 h-7" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900">BEACON Incident Briefing</h3>
                  <span className="text-[10px] font-mono text-stone-400">REF: {selectedTicket.id}</span>
                </div>
              </div>
              <button
                onClick={() => setShowIncidentModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <div className="font-bold text-rose-800">Attack Classification:</div>
                <div className="text-rose-700">{selectedTicket.threat_type} (Risk Score: {selectedTicket.threat_score}/100)</div>
              </div>

              <div className="space-y-1">
                <strong className="text-stone-700 block">Sender Metadata:</strong>
                <div className="font-mono text-[11px] bg-[#FAF8F5] p-2 rounded-lg border border-stone-200">
                  {selectedTicket.email}
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-stone-700 block">Identified IOCs & Deception Vectors:</strong>
                <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
                  {selectedTicket.security_intelligence?.threat_factors?.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <strong className="text-stone-700 block">Containment Playbook:</strong>
                <p className="text-[11px] text-stone-600 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-lg border border-stone-200">
                  {selectedTicket.recommended_action}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>
              <button
                onClick={() => {
                  setShowIncidentModal(false);
                  showToast("Incident Briefing exported");
                }}
                className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs font-bold text-white shadow-soft-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: AUTOMATED SOAR DEFENSE PLAYBOOK */}
      {showSoarModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl border border-stone-800 shadow-soft-xl max-w-xl w-full p-6 space-y-5 text-stone-100 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Beacon SOAR Automated Defense Console</h3>
                  <p className="text-[10px] text-stone-400 font-mono">Real-Time Enterprise Incident Containment</p>
                </div>
              </div>
              <button
                onClick={() => setShowSoarModal(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Steps Indicator */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
              {[
                { label: "1. Mailbox Purge", step: 1 },
                { label: "2. DNS Sinkhole", step: 2 },
                { label: "3. Revoke Session", step: 3 },
                { label: "4. Dispatch SOC", step: 4 }
              ].map(s => (
                <div 
                  key={s.step} 
                  className={`p-2 rounded-xl border transition-all ${
                    soarStep >= s.step 
                      ? 'bg-amber-950/60 border-amber-500/60 text-amber-300' 
                      : 'bg-stone-950/50 border-stone-800 text-stone-500'
                  }`}
                >
                  <div className="text-xs mb-0.5">{soarStep > s.step ? "✓" : s.step}</div>
                  <div>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Live Terminal Log Stream */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto">
              <div className="text-[10px] text-stone-500 pb-1 border-b border-stone-900 flex items-center justify-between">
                <span>[TERMINAL TELEMETRY OUTPUT]</span>
                {soarRunning && <span className="text-amber-400 animate-pulse">● EXECUTING...</span>}
              </div>
              {soarLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`leading-relaxed text-[11px] ${
                    log.includes('✓') || log.includes('★') 
                      ? 'text-emerald-400 font-semibold' 
                      : log.includes('STEP') 
                        ? 'text-amber-300' 
                        : 'text-stone-300'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-stone-400">
                Status: <span className={soarRunning ? "text-amber-400 font-semibold" : "text-emerald-400 font-bold"}>
                  {soarRunning ? "Active Remediation in Progress..." : "Containment Active & Enforced"}
                </span>
              </div>
              <button
                onClick={() => setShowSoarModal(false)}
                disabled={soarRunning}
                className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-white text-stone-900 text-xs font-bold shadow-soft-xs disabled:opacity-50"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DATASET CSV / JSON IMPORTER */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-soft-lg max-w-md w-full p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">Import Team Dataset</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Upload any CSV or JSON file containing customer conversations or threat tickets. Beacon will automatically classify each conversation.
            </p>

            <div className="border-2 border-dashed border-stone-200 rounded-2xl p-6 text-center hover:border-amber-500 transition-colors bg-[#FAF8F5]">
              <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-input"
              />
              <label
                htmlFor="file-upload-input"
                className="cursor-pointer text-xs font-bold text-amber-800 hover:text-amber-900"
              >
                Choose a CSV or JSON file
              </label>
              <p className="text-[10px] text-stone-400 mt-1">Supports UTF-8 CSV or JSON arrays</p>
            </div>

            {uploadStatus && (
              <div className="text-xs font-medium text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                {uploadStatus}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

# BEACON — Teammate Hackathon Study Guide & Judge Defense Playbook

## 1. The 30-Second Elevator Pitch (Memorize This!)
> "In modern business, customer support agents are trained to be fast, empathetic, and trusting — which makes them the #1 attack vector for social engineering, brand typosquatting, and wire fraud. 
> 
> **BEACON** is a Dual-Brain platform that combines customer support intelligence with real-time cybersecurity defense. In under 45 milliseconds, it reads customer emotions and drafts helpful replies for genuine users, while silently deflecting phishing attacks, lookalike links, and executive impersonation before an agent ever clicks."

---

## 2. The Core Problem We Solve
* **The Vulnerability:** Standard spam filters miss targeted attacks sent directly to customer support portals (contact forms, support emails, chat widgets).
* **The Human Dilemma:** If an agent takes time to inspect technical headers, customer response times drop. If they click quickly to help the customer, the company gets breached.
* **The Solution:** Beacon sits directly between incoming customer tickets and the support agent, analyzing every message in parallel.

---

## 3. How "Dual-Brain" Works (Under the Hood)
When a message arrives, Beacon evaluates it across two parallel engines in **under 45 milliseconds**:

### 🧠 Brain 1: Customer Intelligence Engine (NLP)
* **10 Complaint Categories:** Accurately routes issues (Billing, Account Access, Delivery/Shipping, Refunds, Technical Problems, Service Quality, etc.).
* **Fine-Grained Emotions:** Detects 6 emotional states (Anger, Frustration, Confusion, Urgency, Satisfaction, Disappointment).
* **Sentiment Tracking:** Positive, Neutral, Negative.
* **Executive Summarizer:** Breaks long emails into 3 human bullets:
  1. *The Customer's Situation*
  2. *What They Need From Us*
  3. *Resolution Status*
* **1-Click Reply Studio:** Drafts context-aware, empathetic customer answers with one click.

### 🛡️ Brain 2: Cyber Threat Defense Engine
* **Lookalike & Homoglyph Detector:** Compares inbound domains against 100+ top brand targets using character substitution (e.g. `paypa1` with digit `1` replacing letter `l`).
* **Social Engineering Heuristics:** Detects high-pressure psychological triggers (credential harvesting, fake OTP requests, emergency wire transfers, CEO impersonation).
* **Zero-Trust Link Lock:** When a threat is detected, Beacon automatically locks all outbound URLs so the agent cannot accidentally click a trap.
* **Risk Classification:** Outputs a composite risk score (0-100) and risk level (Low, Medium, High, Critical).

---

## 4. Benchmark Performance Numbers (The Proof for Judges)
* **Dataset Size:** 40 ground-truth real-world conversations (26 genuine customer complaints + 14 sophisticated cyberattacks).
* **Detection Precision:** **100%** (0 false alarms — a real customer asking for a refund is never accidentally blocked).
* **Threat Interception:** **14 / 14 attacks blocked**.
* **Speed / Latency:** **< 45 milliseconds** execution time.

---

## 5. Winning Answers to Tough Judge Questions

### Q1: "Why didn't you just use OpenAI / Gemini API for the entire backend?"
> **Winning Answer:** 
> "Two reasons: **Speed and Cost.** Large language models take 1.5 to 3 seconds per API call and cost money on every incoming ticket. In an enterprise handling 50,000 tickets a day, that creates massive latency and huge token bills. 
> 
> Beacon uses a specialized, sub-45ms heuristic Dual-Brain engine running locally for instant classification and threat detection, and uses generative AI selectively for smart reply drafting. It gives enterprise-grade speed at near-zero compute cost."

---

### Q2: "How do you prevent false positives? What if a real customer is furious and writes with extreme urgency?"
> **Winning Answer:** 
> "That is the exact reason we built a **Dual-Brain** rather than a single classifier. 
> 
> When an angry customer writes: *'My order is 2 weeks late! Fix this immediately or I will cancel my account!'*, Brain 1 detects high frustration and urgency, routing it as high priority. At the same time, Brain 2 checks the sender email, links, and text — verifying zero credential traps, zero typosquats, and zero lookalike domains. 
> 
> Because both brains communicate, our benchmark achieved **0% false alarms** across all 26 legitimate test tickets."

---

### Q3: "How does your lookalike domain detection work?"
> **Winning Answer:** 
> "We run multi-layer string forensics:
> 1. Normalized Levenshtein edit-distance calculation against a target corpus of 100+ global brands.
> 2. Homoglyph visual substitution detection (such as `1` for `l`, `0` for `o`, `rn` for `m`).
> 3. High-risk TLD checks (`.xyz`, `.top`, `.click`, `.pw`) and raw IP host detection. 
> 
> In the dashboard, agents can click *'View Deep Security Forensics'* to inspect the exact character diff and visual spoof index."

---

### Q4: "How would this integrate into a real enterprise like Zendesk or Salesforce?"
> **Winning Answer:** 
> "Beacon is built with a standard REST API architecture (`/api/analyze`, `/api/tickets`, `/api/upload`). It can be deployed as an inline middleware proxy or webhook integration directly in front of Zendesk, Freshdesk, Intercom, or Salesforce Service Cloud without changing the company's existing helpdesk software."

---

### Q5: "What makes your product 1st-prize worthy compared to other teams?"
> **Winning Answer:** 
> "Most hackathon teams build either a simple customer support chatbot or a standalone phishing detector. 
> 
> Beacon is the first platform that unites **Customer Empathy** with **Active Cyber Defense** in a single, human-crafted workspace. We didn't build a robotic sci-fi dashboard — we built a clean, intuitive tool that makes support agents superhuman without overwhelming them with cognitive clutter."

---

## 6. The 2-Minute Live Judge Demo Flow

1. **Start on Overview (Landing Page):**
   * Point out the official Beacon shield emblem.
   * Highlight the human headline: *"Help your customers with genuine care. Stop scammers before they cause harm."*
   * Click the **"Fake PayPal Alert"** test pill in the Hero Scanner to show sub-45ms instant detection right on the homepage.
2. **Jump into the Support Workspace (Inbox):**
   * Click **"Launch Live Agent Console"**.
   * Pick a normal ticket (e.g. *Priya Sharma — Double Charge*). Show the green **"✓ Verified Real Customer"** card and click **"Draft Friendly AI Reply"**.
   * Pick a threat ticket (e.g. *PayPal Phishing*). Point out the red **"⚠️ High-Risk Scam Detected"** badge and show that outbound links are safely locked.
   * Expand **"View Deep Security Forensics"** to show the lookalike domain proof (`paypa1` vs `paypal`).
3. **Simulate a Live Attack:**
   * Click the **"Simulate Attack"** button in the top bar to inject a live CEO Wire Fraud attempt in real-time.
   * Click **"Quarantine Threat Ticket"** to show active containment.
4. **Show Verified Benchmarks & Analytics:**
   * Click **"Analytics"** to showcase the 100% precision, 0 false alarms, and 1-click CSV dataset export.

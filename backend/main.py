import os
import re
import json
import csv
import io
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from backend.engine.nlp_engine import NLPEngine
    from backend.engine.threat_engine import ThreatEngine
except ModuleNotFoundError:
    from engine.nlp_engine import NLPEngine
    from engine.threat_engine import ThreatEngine

app = FastAPI(
    title="SentinAI - Customer Support Intelligence & Phishing Threat Detection",
    description="Dual-Brain Platform combining Customer NLP Intelligence with Real-Time Cybersecurity Threat Detection",
    version="1.0.0"
)

# Enable CORS for local Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Mount static assets
DIST_PATH = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.exists(DIST_PATH):
    assets_path = os.path.join(DIST_PATH, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "tickets.json")

def load_and_process_tickets():
    if not os.path.exists(DATA_PATH):
        return []
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        raw_tickets = json.load(f)

    processed = []
    for t in raw_tickets:
        subject = t.get("subject", "")
        raw_msgs = t.get("messages", [])
        msg_text = " ".join([m.get("text", "") for m in raw_msgs])
        full_text = f"{subject}. {msg_text}".strip()
        
        sender_email = t.get("email") or ""
        if not sender_email:
            # Check for email inside the text (e.g. From: Team <email@domain>)
            emails = ThreatEngine.extract_emails(full_text)
            if emails:
                sender_email = emails[0]
            else:
                clean_name = re.sub(r'[^a-zA-Z0-9]+', '.', t.get("customer_name", "user")).strip('.').lower()
                sender_email = f"{clean_name}@example.com"

        nlp_res = NLPEngine.analyze_ticket(full_text, raw_msgs)
        threat_res = ThreatEngine.analyze_threat(full_text, sender_email)

        # If confirmed threat, ensure category reflects cybersecurity incident
        category = "Account Security / Fraud" if threat_res["is_threat"] else nlp_res["category"]

        processed.append({
            "id": t.get("id"),
            "customer_name": t.get("customer_name"),
            "email": sender_email,
            "channel": t.get("channel", "Email"),
            "subject": subject,
            "messages": raw_msgs,
            "full_text": full_text,
            "customer_intelligence": nlp_res,
            "security_intelligence": threat_res,
            # Flattened fields for easy grid display
            "category": category,
            "specific_issue": nlp_res["specific_issue"],
            "sentiment": nlp_res["sentiment"],
            "primary_emotion": nlp_res["primary_emotion"],
            "priority": nlp_res["priority"],
            "resolution_status": nlp_res["resolution_status"],
            "is_unresolved": nlp_res["is_unresolved"],
            "is_threat": threat_res["is_threat"],
            "threat_type": threat_res["threat_type"],
            "risk_level": threat_res["risk_level"],
            "threat_score": threat_res["threat_score"],
            "summary": nlp_res["summary"],
            "recommended_action": threat_res["recommended_action"]
        })

    # Also synchronize tickets.csv for judge evaluations and downloads
    try:
        import csv
        csv_path = os.path.join(os.path.dirname(__file__), "data", "tickets.csv")
        fieldnames = [
            "id", "customer_name", "email", "channel", "subject", "category",
            "sentiment", "primary_emotion", "priority", "resolution_status",
            "is_unresolved", "is_threat", "risk_level", "threat_score", "threat_type"
        ]
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            for row in processed:
                writer.writerow(row)
    except Exception as e:
        print(f"Warning: Failed to write tickets.csv: {e}")

    return processed

# In-memory ticket storage
TICKETS_CACHE = load_and_process_tickets()

class AnalyzeRequest(BaseModel):
    text: str
    email: Optional[str] = None
    customer_name: Optional[str] = "Live Test Customer"
    channel: Optional[str] = "Live Simulator"
    messages: Optional[List[Dict[str, str]]] = None

DIST_PATH = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

@app.get("/api/health")
def health_check():
    return {
        "status": "Online",
        "system": "SentinAI Dual-Brain Platform",
        "endpoints": ["/api/kpis", "/api/tickets", "/api/tickets/{id}", "/api/analyze", "/api/upload"]
    }

@app.get("/")
def serve_root():
    index_file = os.path.join(DIST_PATH, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"status": "Online", "message": "Building frontend..."}

@app.get("/api/kpis")
def get_kpis():
    total = len(TICKETS_CACHE)
    if total == 0:
        return {"total_conversations": 0}

    threat_count = sum(1 for t in TICKETS_CACHE if t["is_threat"])
    critical_count = sum(1 for t in TICKETS_CACHE if t["risk_level"] == "Critical" or t["priority"] == "Critical")
    unresolved_count = sum(1 for t in TICKETS_CACHE if t["is_unresolved"])

    # Sentiment distribution
    sentiment_dist = {"Positive": 0, "Neutral": 0, "Negative": 0}
    for t in TICKETS_CACHE:
        s = t["sentiment"]
        sentiment_dist[s] = sentiment_dist.get(s, 0) + 1

    # Emotion distribution
    emotion_dist = {}
    for t in TICKETS_CACHE:
        emo = t["primary_emotion"]
        emotion_dist[emo] = emotion_dist.get(emo, 0) + 1

    # Category distribution
    category_dist = {}
    for t in TICKETS_CACHE:
        c = t["category"]
        category_dist[c] = category_dist.get(c, 0) + 1

    # Threat level distribution
    threat_dist = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
    for t in TICKETS_CACHE:
        r = t["risk_level"]
        threat_dist[r] = threat_dist.get(r, 0) + 1

    # Frequently reported issues (aggregating sub-issues)
    issue_counts = {}
    for t in TICKETS_CACHE:
        iss = t["specific_issue"]
        issue_counts[iss] = issue_counts.get(iss, 0) + 1

    sorted_issues = sorted(issue_counts.items(), key=lambda x: x[1], reverse=True)
    frequently_reported_issues = [
        {"issue": item[0], "count": item[1]}
        for item in sorted_issues[:8]
    ]

    most_common_cat = max(category_dist.items(), key=lambda x: x[1])[0] if category_dist else "None"
    most_common_issue = sorted_issues[0][0] if sorted_issues else "None"

    return {
        "total_conversations": total,
        "total_complaints": sentiment_dist.get("Negative", 0),
        "threat_count": threat_count,
        "threat_rate_pct": round((threat_count / total) * 100, 1),
        "critical_alerts": critical_count,
        "unresolved_complaints": unresolved_count,
        "unresolved_rate_pct": round((unresolved_count / total) * 100, 1),
        "sentiment_distribution": sentiment_dist,
        "emotion_distribution": emotion_dist,
        "category_distribution": category_dist,
        "threat_level_distribution": threat_dist,
        "frequently_reported_issues": frequently_reported_issues,
        "most_common_complaint": most_common_cat,
        "most_frequent_issue": most_common_issue
    }

@app.get("/api/tickets")
def get_tickets(
    search: Optional[str] = None,
    category: Optional[str] = None,
    risk_level: Optional[str] = None,
    sentiment: Optional[str] = None,
    channel: Optional[str] = None,
    unresolved_only: Optional[bool] = False 
):
    results = TICKETS_CACHE

    if search:
        s_lower = search.lower()
        results = [
            t for t in results
            if s_lower in t["customer_name"].lower()
            or s_lower in t["subject"].lower()
            or s_lower in t["full_text"].lower()
            or s_lower in t["id"].lower()
            or s_lower in t["specific_issue"].lower()
        ]

    if category and category != "All":
        results = [t for t in results if t["category"] == category]

    if risk_level and risk_level != "All":
        results = [t for t in results if t["risk_level"] == risk_level]

    if sentiment and sentiment != "All":
        results = [t for t in results if t["sentiment"] == sentiment]

    if channel and channel != "All":
        results = [t for t in results if t["channel"] == channel]

    if unresolved_only:
        results = [t for t in results if t["is_unresolved"]]

    return results

@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str):
    for t in TICKETS_CACHE:
        if t["id"] == ticket_id:
            return t
    raise HTTPException(status_code=404, detail="Ticket not found")

@app.post("/api/analyze")
def analyze_input(req: AnalyzeRequest):
    text = req.text.strip()
    if not text and req.messages:
        text = " ".join(m.get("text", "") for m in req.messages)

    if not text:
        raise HTTPException(status_code=400, detail="Empty text input provided")

    messages = req.messages or [{"sender": "Customer", "text": text}]
    nlp_res = NLPEngine.analyze_ticket(text, messages)
    threat_res = ThreatEngine.analyze_threat(text, req.email)

    combined_response = {
        "id": f"LIVE-{hash(text) % 100000:05d}",
        "customer_name": req.customer_name,
        "email": req.email or "unknown@client.net",
        "channel": req.channel,
        "subject": text[:60] + ("..." if len(text) > 60 else ""),
        "messages": messages,
        "customer_intelligence": nlp_res,
        "security_intelligence": threat_res,
        # Combined fields matching Section 9 & 10 of hackathon doc
        "combined_intelligence": {
            "what_is_customer_saying": text,
            "what_do_they_need": nlp_res["summary"]["customer_request"],
            "how_serious_is_issue": f"Priority {nlp_res['priority']} | Urgency {nlp_res['urgency_level']}",
            "is_security_threat": threat_res["is_threat"],
            "threat_summary": threat_res["threat_type"],
            "threat_risk_level": threat_res["risk_level"],
            "recommended_action": threat_res["recommended_action"]
        }
    }
    return combined_response

@app.post("/api/upload")
async def upload_dataset(file: UploadFile = File(...)):
    global TICKETS_CACHE
    contents = await file.read()
    filename = file.filename.lower()

    new_raw = []
    if filename.endswith(".json"):
        try:
            new_raw = json.loads(contents.decode("utf-8"))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid JSON file: {str(e)}")
    elif filename.endswith(".csv"):
        try:
            reader = csv.DictReader(io.StringIO(contents.decode("utf-8")))
            for row in reader:
                msg_text = row.get("conversation_text") or row.get("message") or row.get("text") or ""
                new_raw.append({
                    "id": row.get("id", f"CSV-{len(new_raw)+1}"),
                    "customer_name": row.get("customer_name", "CSV User"),
                    "email": row.get("email", ""),
                    "channel": row.get("channel", "Uploaded CSV"),
                    "subject": row.get("subject", "Customer Inquiry"),
                    "messages": [{"sender": "Customer", "text": msg_text}]
                })
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid CSV file: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Only JSON and CSV files are accepted.")

    # Save to disk and reload
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(new_raw, f, indent=2)

    TICKETS_CACHE = load_and_process_tickets()
    return {
        "message": f"Successfully loaded and processed {len(TICKETS_CACHE)} conversations from {file.filename}.",
        "ticket_count": len(TICKETS_CACHE)
    }

@app.post("/api/reset")
def reset_default_dataset():
    global TICKETS_CACHE
    # Re-trigger load
    TICKETS_CACHE = load_and_process_tickets()
    return {"message": "Dataset reloaded", "total": len(TICKETS_CACHE)}

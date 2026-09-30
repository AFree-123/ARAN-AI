# 🌊 ARAN AI

## AI-Powered Coastal Disaster Resiliency & Grounded Early-Warning Platform

> **From Information → Intelligence → Action**

ARAN AI is an AI-powered coastal disaster intelligence platform designed to support anticipatory disaster preparedness by combining geospatial intelligence, meteorological information, official disaster updates, infrastructure exposure analysis, and Gemini-powered reasoning.

The platform focuses on helping authorities and public actors understand cyclone, rainfall, flood, storm-surge and coastal-risk information through a single decision-support interface.

---

## 🚨 Problem

Coastal communities are exposed to multiple hazards such as:

- Cyclones
- Heavy rainfall
- Flooding
- Storm surge
- Coastal weather events
- Infrastructure disruption

Disaster-related information is often distributed across different sources, making it difficult to quickly understand:

- What is happening?
- Where is it happening?
- How severe is the situation?
- Which infrastructure may be exposed?
- What information should stakeholders pay attention to?

ARAN AI addresses this challenge by bringing relevant information into one intelligent platform.

---

## 💡 Why I Built ARAN AI

I built ARAN AI to explore how Artificial Intelligence, satellite-based geospatial intelligence and cloud technologies can support disaster preparedness.

The goal is not to replace disaster-management authorities or official warning systems.

Instead, ARAN AI acts as a **decision-support and information-intelligence platform** that helps users understand verified information faster and convert complex disaster information into simple, actionable context.

The core idea is:

**Information → Intelligence → Action**

---

## 🎯 Who Is ARAN AI For?

### 🏛️ Authorities

Designed to support:

- Disaster-management stakeholders
- Municipal authorities
- Emergency-response teams
- Infrastructure planners
- Local administrative stakeholders

ARAN AI provides:

- Disaster information awareness
- Risk visualization
- Rainfall intelligence
- Infrastructure exposure awareness
- Cyclone context
- Grounded AI explanations
- Decision-support information

### 👥 Public Actors

Designed to support:

- Coastal residents
- Communities
- Volunteers
- Community organizations
- Students and researchers

ARAN AI provides:

- Simple disaster explanations
- Weather context
- Alert awareness
- Risk-map visualization
- Preparedness information
- AI-assisted disaster questions

---

# 🌪️ What ARAN AI Does

ARAN AI combines multiple disaster-intelligence capabilities in one platform.

### 1. Live Disaster Alerts

Retrieves relevant disaster information and presents:

- Location
- Timestamp
- Hazard type
- Severity
- Source
- AI explanation

The platform prioritizes authoritative sources such as official disaster-management and meteorological information whenever available.

---

### 2. Cyclone Intelligence

The platform provides cyclone and disturbance context through the disaster intelligence layer.

Users can understand:

- Current cyclone/disturbance status
- System type
- Relevant location
- Severity context
- Source information

---

### 3. 🌧️ Rainfall Intelligence

ARAN AI integrates geospatial rainfall information and meteorological data.

The Risk Map provides a visual representation of rainfall-related conditions using Google Earth Engine data.

---

### 4. 🗺️ Geospatial Risk Map

The Risk Map provides a visual interface for understanding rainfall and geographic risk.

The platform is designed to integrate satellite-derived geospatial intelligence into a decision-support workflow.

---

### 5. 🏗️ Infrastructure Exposure

ARAN AI includes an infrastructure-awareness module covering categories such as:

- Roads
- Power infrastructure
- Medical facilities
- Emergency assets

The current prototype uses reference/demo inventory where official datasets are not yet integrated.

---

### 6. 🏥 Shelter Awareness

The platform provides a shelter-awareness interface designed to support disaster preparedness.

Prototype shelter information is clearly treated as reference/demo information and should not be interpreted as an official emergency shelter registry.

---

### 7. 🤖 Gemini AI Assistant

ARAN AI includes a Gemini-powered disaster intelligence assistant.

Users can ask questions about:

- Cyclones
- Floods
- Heavy rainfall
- Storm surge
- Coastal weather
- Disaster preparedness
- Infrastructure exposure
- Emergency preparedness

The assistant follows a grounded-response approach.

It does not intentionally generate:

- Fake evacuation orders
- Fake government instructions
- Fake cyclone coordinates
- Fake rainfall measurements
- Fake road closures
- Fake official warnings

Official emergency information should always be verified with the appropriate authorities.

---

# 🧠 Grounded Early-Warning Workflow

ARAN AI follows the workflow:

```text
RETRIEVE
    ↓
VERIFY
    ↓
GROUND
    ↓
ANALYZE
    ↓
EXPLAIN
    ↓
LOCALIZE
    ↓
ALERT / SUPPORT

The purpose is to transform complex disaster information into understandable decision-support context while preserving source meaning.

🌐 Google Technology Integration

ARAN AI uses Google technologies as important parts of its architecture.

Google Gemini

Used for:

AI-powered reasoning
Disaster explanations
Natural-language interaction
Multilingual assistance
Disaster preparedness guidance
Google Earth Engine

Used for:

Satellite-derived geospatial intelligence
Rainfall visualization
Geographic analysis
Earth observation data workflows
Firebase

Used for:

Authentication
Google Sign-In
Application data infrastructure
Firestore integration
Google Cloud

The architecture is designed to support scalable cloud deployment and future integration with additional Google Cloud services.

🏗️ System Architecture
Official / Disaster Information
            │
            ▼
Meteorological Data
            │
            ▼
Google Earth Engine
            │
            ▼
      Flask Backend
            │
     ┌──────┴──────┐
     ▼             ▼
Gemini AI      Risk Analysis
     │             │
     └──────┬──────┘
            ▼
       ARAN AI UI
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Alerts    Risk Map   Weather
 ▼          ▼          ▼
Infrastructure   Shelters
       │
       ▼
 AI Assistant / Reports
🖥️ Platform Modules

ARAN AI contains the following major modules:

Dashboard
Live Alerts
Risk Map
Infrastructure
Shelters
Weather
News & Updates
AI Assistant
Parametric Risk Simulation
Reports
Settings
Firebase Authentication
📸 Product Preview
Login

Dashboard

Live Alerts

Risk Map

AI Assistant

Infrastructure

Parametric Risk Simulation

Screenshots represent the current prototype interface.

🛠️ Technology Stack
Frontend
HTML5
CSS3
JavaScript
Leaflet
Responsive dashboard UI
Backend
Python
Flask
REST APIs
Artificial Intelligence
Google Gemini
Gemini multimodal reasoning architecture
Geospatial Intelligence
Google Earth Engine
Satellite-derived datasets
Geospatial visualization
Cloud & Data
Firebase Authentication
Firebase Firestore
Google Cloud ecosystem
External Data Services
Meteorological APIs
Official disaster-information sources
Map/tile services
📁 Project Structure
ARAN-AI-final-fixed/
│
├── app.py
│
├── data/
│   └── alerts.json
│
├── docs/
│   └── screenshots/
│       ├── aran-login.png
│       ├── aran-dashboard.png
│       ├── aran-live-alerts.png
│       ├── aran-risk-map.png
│       ├── aran-ai-assistant.png
│       ├── aran-infrastructure.png
│       └── aran-insurance.png
│
├── services/
│   ├── cyclone_service.py
│   ├── disaster_ai.py
│   ├── firebase_service.py
│   ├── gee_service.py
│   ├── imd_alert_service.py
│   └── weather_service.py
│
├── static/
│   ├── css/
│   ├── images/
│   └── js/
│
├── templates/
│
├── .env.example
├── .gitignore
├── README.md
└── requirements.txt
⚙️ Installation
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd ARAN-AI-final-fixed
2. Create a virtual environment
python -m venv venv
Windows
venv\Scripts\activate
3. Install dependencies
pip install -r requirements.txt
🔐 Environment Variables

Create a .env file in the project root.

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-3.8-flash

FRONTEND_URL=http://127.0.0.1:5000

Do not commit .env or private service-account credentials to GitHub.

🌍 Google Earth Engine Setup

ARAN AI uses Google Earth Engine for geospatial analysis.

Authenticate Earth Engine:

earthengine authenticate

Then initialize the project:

import ee

ee.Initialize(project="YOUR_EARTH_ENGINE_PROJECT_ID")

The application can then access configured Earth Engine datasets through the backend service.

🔥 Firebase Setup

Firebase is used for authentication and application data.

Configure:

Email/Password Authentication
Google Authentication
Firestore

Firebase configuration should be stored securely.

Do not expose Firebase Admin service-account credentials in the public repository.

▶️ Run Locally

Start the Flask application:

python app.py

Open:

http://127.0.0.1:5000

Dashboard:

http://127.0.0.1:5000/dashboard
🔌 API Modules

Important backend endpoints include:

/api/alerts
/api/cyclone
/api/risk-map/rainfall
/api/insurance
/api/ask

These APIs connect the frontend interface with disaster intelligence, geospatial analysis, weather information and Gemini-powered assistance.

🌧️ Parametric Risk Simulation

ARAN AI includes a prototype parametric risk decision-support module.

The prototype compares observed/modelled rainfall against a configured threshold.

Example:

Rainfall Measurement
        ↓
Threshold Comparison
        ↓
Risk Status
        ↓
Decision-Support Visualization

This is a simulation for prototype decision support.

It is not an insurance contract and does not represent an actual insurance payout.

🔎 Data Provenance & Safety

ARAN AI follows a source-aware approach.

The system is designed to:

Prefer authoritative sources
Preserve source meaning
Identify information sources
Display relevant timestamps
Explain technical terminology
Separate verified information from general AI explanations

The platform does not claim to replace official disaster-management systems.

Users should verify emergency decisions, evacuation orders and official warnings with the appropriate authorities.

🌏 India & Coastal Scale

ARAN AI is designed with coastal India as an important deployment context.

The architecture can be extended to vulnerable coastal regions across:

Tamil Nadu
Andhra Pradesh
Odisha
West Bengal
Kerala
Karnataka
Maharashtra
Gujarat
Other coastal regions

With appropriate datasets and authority integrations, the architecture can be extended to broader Asia-Pacific coastal regions.

🚀 Future Improvements
1. Advanced Hazard Modelling

Future versions can integrate:

Storm-surge modelling
Flood propagation modelling
Multi-hazard forecasting
Higher-resolution rainfall analysis
2. Infrastructure Intelligence

Future versions can integrate verified datasets for:

Power grids
Roads
Hospitals
Emergency facilities
Critical public infrastructure
3. Official Emergency Workflow

Future versions can support secure integrations with authorized disaster-management workflows.

4. AI & Automation

Future improvements include:

Continuous disaster monitoring
Automated event detection
Situation reports
Intelligent alert prioritization
Automated notification workflows
5. Community Accessibility

Future versions can support:

More Indian languages
Mobile-first access
Low-bandwidth environments
Voice-first disaster information
6. National Scale

The platform architecture can be extended to support disaster intelligence across vulnerable coastal regions in India.

🎯 Project Impact

ARAN AI aims to support a shift from:

Reactive Disaster Response
          ↓
Anticipatory Disaster Intelligence

The platform focuses on helping stakeholders:

Understand risk earlier
Connect information faster
Visualize geographic exposure
Interpret complex disaster information
Support preparedness decisions
🧪 Current Prototype Status

ARAN AI is a working prototype demonstrating:

Firebase authentication
Gemini AI assistant
Google Earth Engine integration
Rainfall visualization
Cyclone information
Disaster alerts
Infrastructure awareness
Shelter awareness
Weather information
Parametric risk simulation
Reports
Multilingual interaction

Some infrastructure and shelter information is prototype/reference data and should be replaced with verified official datasets for production deployment.

🏆 Hackathon Context

ARAN AI was developed for a Google Cloud / AI-focused hackathon challenge around:

Cyclone Impact & Infrastructure Vulnerability Forecasting

The challenge focuses on using AI, satellite data, meteorological information and geospatial intelligence to support:

Cyclone preparedness
Storm-surge analysis
Rainfall risk
Infrastructure vulnerability
Early-warning decision support

ARAN AI addresses these goals through an integrated disaster-intelligence workflow.

🔮 Vision

The long-term vision of ARAN AI is to create a scalable coastal disaster intelligence layer that connects:

Earth Observation
       +
Weather Intelligence
       +
Official Disaster Information
       +
Artificial Intelligence
       +
Geospatial Risk Analysis
       =
Better Disaster Preparedness
👩‍💻 Author

Ms. Afreena Abdul Jabbar

B.Tech Information Technology

Sir Isaac Newton College of Engineering and Technology

Tamil Nadu, India

📌 Disclaimer

ARAN AI is a prototype research and technology demonstration platform.

It is intended for information, visualization and decision-support purposes.

It does not replace official warnings, evacuation instructions, emergency services, disaster-management authorities, meteorological agencies or government communications.

Always verify critical emergency information with official authorities.
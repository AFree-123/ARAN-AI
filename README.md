# 🌊 ARAN AI

## AI-Powered Coastal Disaster Resiliency & Grounded Early-Warning Platform

> **From Information → Intelligence → Action**

ARAN AI is an AI-powered coastal disaster intelligence platform designed to support anticipatory disaster preparedness by combining geospatial intelligence, meteorological information, official disaster updates, infrastructure exposure analysis, and Gemini-powered reasoning.

The platform brings cyclone, rainfall, flood, storm-surge, coastal weather and infrastructure-risk information into a unified decision-support interface.

---

# 🚨 Problem

Coastal communities are exposed to multiple interconnected hazards:

- 🌪️ Cyclones
- 🌧️ Heavy rainfall
- 🌊 Flooding
- 🌊 Storm surge
- 🌦️ Coastal weather events
- 🏗️ Infrastructure disruption

Disaster-related information is often distributed across different sources.

This makes it difficult to quickly understand:

- What is happening?
- Where is it happening?
- How severe is the situation?
- Which infrastructure may be exposed?
- What information should stakeholders pay attention to?

ARAN AI addresses this challenge by bringing relevant disaster intelligence into one platform.

---

# 💡 Our Solution

ARAN AI follows a simple intelligence workflow:

```text
INFORMATION
     ↓
INTELLIGENCE
     ↓
ACTION

The platform retrieves relevant disaster information, processes it through disaster-intelligence services, applies geospatial analysis, and provides grounded explanations through an easy-to-understand interface.

ARAN AI is designed as a:

Decision-Support & Disaster Information-Intelligence Platform

It does not replace official emergency-warning systems or disaster-management authorities.

🎯 Who Is ARAN AI For?
🏛️ Authorities & Response Stakeholders

Designed to support:

Disaster-management stakeholders
Municipal authorities
Emergency-response teams
Infrastructure planners
Local administrative stakeholders
Key Capabilities
Disaster information awareness
Risk visualization
Rainfall intelligence
Cyclone context
Infrastructure exposure awareness
Grounded AI explanations
Decision-support information
👥 Communities & Public Users

Designed to support:

Coastal residents
Communities
Volunteers
Community organizations
Students
Researchers
Key Capabilities
Simple disaster explanations
Weather context
Alert awareness
Risk-map visualization
Preparedness information
AI-assisted disaster questions
🌪️ Core Platform Features
🔐 1. Secure Authentication

ARAN AI provides secure authentication using Firebase Authentication.

Users can access the platform using:

Email and password
Google Sign-In
Firebase Authentication
Login Page

📝 2. User Registration

New users can create an ARAN AI account by providing:

Full name
Email address
Password
Password confirmation

The registration flow is integrated with Firebase Authentication.

Register Page

Note: Add aran-register.png to docs/screenshots/ before pushing the README.

📊 3. Disaster Intelligence Dashboard

The dashboard provides a centralized interface for accessing ARAN AI's major disaster-intelligence modules.

It brings together important information and provides navigation to:

Live Alerts
Risk Map
Infrastructure
Shelters
Weather
AI Assistant
Reports
Parametric Risk Simulation
Dashboard Preview

🚨 4. Live Disaster Alerts

The Live Alerts module presents relevant disaster and weather information.

Each alert can provide:

📍 Location
🕐 Timestamp
⚠️ Hazard type
🔴 Severity
📡 Source
🤖 AI explanation

The platform prioritizes authoritative meteorological and disaster-management information whenever available.

Live Alerts Preview

🌀 5. Cyclone Intelligence

ARAN AI provides cyclone and weather-system context through its disaster intelligence layer.

Users can understand:

Current cyclone/disturbance status
System type
Relevant location
Severity context
Source information
Official information context

Cyclone information is designed to remain source-aware and should be verified with official authorities for emergency decisions.

🌧️ 6. Rainfall Intelligence

ARAN AI integrates meteorological and geospatial rainfall information.

The rainfall intelligence layer supports:

Rainfall visualization
Geographic analysis
Risk interpretation
Disaster-preparedness awareness

Google Earth Engine is used as part of the geospatial intelligence workflow.

🗺️ 7. Geospatial Risk Map

The Risk Map provides a geographic visualization of rainfall and disaster-risk information.

It is designed to help users understand:

Geographic conditions
Rainfall-related risk
Coastal areas of interest
Relevant map layers
Infrastructure exposure context
Risk Map Preview

🏗️ 8. Infrastructure Exposure

The Infrastructure module provides awareness of potentially exposed critical assets.

The module covers categories such as:

🛣️ Roads
⚡ Power infrastructure
🏥 Medical facilities
🚑 Emergency assets
Infrastructure Preview

Prototype Note: Where verified official infrastructure datasets are not yet integrated, the current prototype uses reference/demo inventory.

🏥 9. Shelter Awareness

The Shelter module provides a disaster-preparedness interface for shelter awareness.

It is designed to help users understand available shelter-related information within the platform.

Prototype Note: Current shelter information should be treated as reference/demo information and not as an official emergency shelter registry.

🌦️ 10. Weather Intelligence

The Weather module provides meteorological information to support disaster awareness and preparedness.

It can be used alongside:

Cyclone information
Rainfall intelligence
Live alerts
Risk-map information

This allows users to interpret weather conditions in the broader disaster context.

🤖 11. Gemini AI Assistant

ARAN AI includes a Gemini-powered disaster intelligence assistant.

Users can ask questions related to:

Cyclones
Floods
Heavy rainfall
Storm surge
Coastal weather
Disaster preparedness
Infrastructure exposure
Emergency preparedness
AI Assistant Preview

Grounded Response Approach

The assistant is designed to avoid inventing:

❌ Fake evacuation orders
❌ Fake government instructions
❌ Fake cyclone coordinates
❌ Fake rainfall measurements
❌ Fake road closures
❌ Fake official warnings

The goal is to preserve source meaning and provide understandable explanations.

Critical emergency information should always be verified with the appropriate authorities.

💰 12. Parametric Risk Simulation

ARAN AI includes a prototype parametric risk decision-support module.

The workflow is:

Rainfall Measurement
        ↓
Threshold Comparison
        ↓
Risk Status
        ↓
Decision-Support Visualization
Parametric Risk Preview

⚠️ This is a prototype decision-support simulation.

It is not an insurance contract and does not represent an actual insurance payout.

📄 13. Reports

The Reports module is designed to organize disaster-related information and provide a structured view of relevant intelligence.

It can support future expansion toward:

Situation reports
Disaster summaries
Risk reports
Preparedness information
Decision-support documentation
🧠 ARAN AI Intelligence Workflow

ARAN AI follows a source-aware disaster-intelligence pipeline:

┌─────────────────────────────┐
│     INFORMATION SOURCES     │
│                             │
│ IMD • Weather • Satellite   │
└──────────────┬──────────────┘
               ↓
        ┌─────────────┐
        │   RETRIEVE  │
        └──────┬──────┘
               ↓
        ┌─────────────┐
        │    VERIFY   │
        └──────┬──────┘
               ↓
        ┌─────────────┐
        │    GROUND   │
        └──────┬──────┘
               ↓
        ┌─────────────┐
        │   ANALYZE   │
        └──────┬──────┘
               ↓
        ┌─────────────┐
        │   EXPLAIN   │
        └──────┬──────┘
               ↓
        ┌─────────────┐
        │   LOCALIZE  │
        └──────┬──────┘
               ↓
        ┌──────────────────┐
        │ ALERT / DECISION │
        │ SUPPORT          │
        └──────────────────┘

The purpose is to transform complex disaster information into understandable decision-support context while preserving source meaning.

☁️ Google Technology Integration
🤖 Google Gemini

Gemini is used for:

AI-powered reasoning
Disaster explanations
Natural-language interaction
Multilingual assistance
Disaster-preparedness guidance
🛰️ Google Earth Engine

Google Earth Engine is used for:

Satellite-derived geospatial intelligence
Rainfall visualization
Geographic analysis
Earth-observation data workflows
🔐 Firebase

Firebase is used for:

Authentication
Google Sign-In
Application data infrastructure
Firestore integration
☁️ Google Cloud

The architecture is designed to support scalable cloud deployment and future integration with additional Google Cloud services.

🏗️ System Architecture
          Official Disaster Information
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
          ┌──────────┴──────────┐
          ▼                     ▼
      Gemini AI            Risk Analysis
          │                     │
          └──────────┬──────────┘
                     ▼
                ARAN AI UI
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
     Alerts       Risk Map      Weather
       │             │             │
       └─────────────┼─────────────┘
                     ▼
          Infrastructure / Shelters
                     │
                     ▼
             AI Assistant / Reports
🖥️ Platform Modules
Module	Purpose
📊 Dashboard	Central disaster intelligence overview
🚨 Live Alerts	Disaster and weather alerts
🗺️ Risk Map	Geospatial rainfall/risk visualization
🏗️ Infrastructure	Infrastructure exposure awareness
🏥 Shelters	Shelter-awareness interface
🌦️ Weather	Weather and rainfall information
📰 News & Updates	Disaster-related information
🤖 AI Assistant	Gemini-powered disaster assistance
💰 Parametric Risk Simulation	Rainfall threshold decision-support prototype
📄 Reports	Disaster information reporting
⚙️ Settings	Application settings
🔐 Authentication	Firebase authentication
🔎 Data Provenance & Safety

ARAN AI follows a source-aware approach.

The system is designed to:

Prefer authoritative sources
Preserve source meaning
Identify information sources
Display relevant timestamps
Explain technical terminology
Separate verified information from general AI explanations

ARAN AI does not claim to replace official disaster-management systems.

Users should verify critical emergency decisions, evacuation orders and official warnings with the appropriate authorities.

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
Gemini reasoning architecture
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
│       ├── aran-register.png
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
⚙️ Installation & Local Setup
1. Clone the Repository
git clone https://github.com/AFree-123/ARAN-AI.git
cd ARAN-AI
2. Create Virtual Environment
python -m venv venv
Windows
venv\Scripts\activate
3. Install Dependencies
pip install -r requirements.txt
4. Configure Environment Variables

Create a .env file using .env.example as a reference.

Do not commit private credentials, service-account files, or other secrets.

5. Run the Application
python app.py

The local application runs on:

http://127.0.0.1:5000
🌐 Deployment

ARAN AI is deployed as a Flask web application using Render.

Live Application

https://aran-ai.onrender.com

The deployment connects the application repository with the cloud-hosted Flask service.

🌏 Coastal India Focus

ARAN AI is designed with coastal India as an important deployment context.

The architecture can be extended to vulnerable coastal regions including:

Tamil Nadu
Andhra Pradesh
Odisha
West Bengal
Kerala
Karnataka
Maharashtra
Gujarat

With appropriate datasets and authorized integrations, the architecture can be extended to broader Asia-Pacific coastal regions.

🚀 Future Scope
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
3. Official Emergency Workflows

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

The architecture can be extended to support disaster intelligence across vulnerable coastal regions of India.

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

ARAN AI currently demonstrates:

✅ Firebase Authentication
✅ Google Sign-In
✅ Gemini AI Assistant
✅ Google Earth Engine integration
✅ Rainfall visualization
✅ Cyclone information
✅ Disaster alerts
✅ Infrastructure awareness
✅ Shelter awareness
✅ Weather information
✅ Parametric risk simulation
✅ Reports
✅ Multilingual interaction
✅ Cloud deployment

Some infrastructure and shelter information is prototype/reference data and should be replaced with verified official datasets for production deployment.

🏆 Hackathon Context

ARAN AI was developed for a Google Cloud / AI-focused hackathon challenge around:

Cyclone Impact & Infrastructure Vulnerability Forecasting

The challenge focuses on applying:

Artificial Intelligence
Satellite data
Meteorological information
Geospatial intelligence

to support:

Cyclone preparedness
Storm-surge analysis
Rainfall risk
Infrastructure vulnerability
Early-warning decision support

ARAN AI addresses these goals through an integrated disaster-intelligence workflow.

🔮 Vision

The long-term vision of ARAN AI is to create a scalable coastal disaster intelligence layer connecting:

Earth Observation
       +
Weather Intelligence
       +
Official Disaster Information
       +
Artificial Intelligence
       +
Geospatial Risk Analysis
       ↓
Better Disaster Preparedness
👩‍💻 Author

Ms. Afreena Abdul Jabbar

B.Tech Information Technology
Sir Isaac Newton College of Engineering and Technology
Tamil Nadu, India

⚠️ Disclaimer

ARAN AI is a prototype research and technology demonstration platform.

It is intended for:

Information
Visualization
Decision-support

It does not replace:

Official warnings
Evacuation instructions
Emergency services
Disaster-management authorities
Meteorological agencies
Government communications

Always verify critical emergency information with official authorities.
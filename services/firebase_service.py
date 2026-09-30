from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore


# ==========================================
# PROJECT ROOT
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ==========================================
# FIREBASE SERVICE ACCOUNT
# ==========================================

SERVICE_ACCOUNT = BASE_DIR / "service-account.json"


# ==========================================
# INITIALIZE FIREBASE ONLY ONCE
# ==========================================

if not firebase_admin._apps:

    cred = credentials.Certificate(
        str(SERVICE_ACCOUNT)
    )

    firebase_admin.initialize_app(cred)


# ==========================================
# FIRESTORE DATABASE
# ==========================================

db = firestore.client()


# ==========================================
# GET ALERTS
# ==========================================

def get_alerts():

    """Read and normalize disaster alerts from Firestore."""

    alerts = []

    try:

        docs = db.collection("alerts").stream()

        for doc in docs:

            data = doc.to_dict() or {}

            # ----------------------------------
            # DOCUMENT ID
            # ----------------------------------

            alert_id = doc.id


            # ----------------------------------
            # BASIC FIELDS
            # ----------------------------------

            hazard = data.get(
                "hazard",
                "Disaster Alert"
            )

            severity = data.get(
                "severity",
                "LOW"
            )

            title = data.get(
                "title",
                hazard
            )

            summary = data.get(
                "summary",
                "No additional information available."
            )

            source = data.get(
                "source",
                "Unknown source"
            )

            status = data.get(
                "status",
                "ACTIVE"
            )

            timestamp = data.get(
                "timestamp",
                ""
            )


            # ----------------------------------
            # LOCATION
            # ----------------------------------

            location = data.get("location", "")

            # If location is an object/map
            if isinstance(location, dict):

                location = (
                    location.get("name")
                    or location.get("city")
                    or location.get("district")
                    or location.get("place")
                    or location.get("location")
                    or ""
                )


            # Convert location safely to string
            if location is None:

                location = ""

            else:

                location = str(location).strip()


            # ----------------------------------
            # FALLBACK LOCATION FIELDS
            # ----------------------------------

            if not location:

                location = str(
                    data.get("display_location", "")
                ).strip()


            if not location:

                location = str(
                    data.get("city", "")
                ).strip()


            if not location:

                location = str(
                    data.get("district", "")
                ).strip()


            if not location:

                location = str(
                    data.get("place", "")
                ).strip()


            # ----------------------------------
            # FINAL FALLBACK
            # ----------------------------------

            if not location:

                location = "Location unavailable"


            # ----------------------------------
            # NORMALIZED ALERT
            # ----------------------------------

            alert = {

                "id": alert_id,

                "hazard": str(hazard),

                "severity": str(severity).upper(),

                "title": str(title),

                "summary": str(summary),

                "source": str(source),

                "status": str(status).upper(),

                "timestamp": str(timestamp),

                "location": location,

                # Explicit frontend field
                "display_location": location
            }


            # Debug terminal output
            print(
                f"[ARAN AI] Alert: {alert_id}"
            )

            print(
                f"[ARAN AI] Location: {location}"
            )


            alerts.append(alert)


        return alerts


    except Exception as e:

        print(
            "\n========== FIRESTORE ERROR =========="
        )

        print(str(e))

        print(
            "=====================================\n"
        )

        raise
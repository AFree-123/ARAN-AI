import re
import requests
from bs4 import BeautifulSoup

IMD_TAMILNADU_WARNING_URL = (
    "https://mausam.imd.gov.in/imd_latest/contents/"
    "subdivisionwise-warning_mc.php?id=24"
)

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()


def get_severity(text):
    text = text.lower()

    if "extremely heavy rain" in text or "very heavy rain" in text:
        return "HIGH"

    if (
        "heavy rain" in text
        or "thunderstorm" in text
        or "lightning" in text
        or "squall" in text
    ):
        return "MEDIUM"

    return "LOW"


def get_hazard(text):
    text = text.lower()

    if "heavy rain" in text and (
        "thunderstorm" in text or "lightning" in text
    ):
        return "Heavy Rain / Thunderstorm"

    if "heavy rain" in text:
        return "Heavy Rain"

    if "thunderstorm" in text or "lightning" in text:
        return "Thunderstorm / Lightning"

    if "squall" in text:
        return "Squall / Gusty Weather"

    return "Weather Warning"


def get_imd_alerts():

    try:
        response = requests.get(
            IMD_TAMILNADU_WARNING_URL,
            headers=HEADERS,
            timeout=20
        )

        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # Get visible page text
        page_text = soup.get_text(" ", strip=True)
        page_text = clean_text(page_text)

        # -----------------------------------------
        # ISSUE DATE
        # -----------------------------------------

        issue_match = re.search(
            r"Date\s*of\s*Issue\s*:?\s*"
            r"([A-Za-z]+\s+\d{1,2},\s+\d{4})",
            page_text,
            re.IGNORECASE
        )

        issue_date = (
            issue_match.group(1)
            if issue_match
            else None
        )

        # -----------------------------------------
        # FIND ALL DAY SECTIONS
        # -----------------------------------------

        day_pattern = re.compile(
            r"Day\s*(\d+)\s*:\s*"
            r"([A-Za-z]+\s+\d{1,2},\s+\d{4})"
            r"\s*\|?\s*"
            r"(.*?)(?=\s*Day\s*\d+\s*:|$)",
            re.IGNORECASE
        )

        matches = list(day_pattern.finditer(page_text))

        alerts = []

        for match in matches:

            day_number = int(match.group(1))
            warning_date = match.group(2)
            warning_text = clean_text(match.group(3))

            # Remove accidental trailing text
            warning_text = re.sub(
                r"\s*Warnings for.*$",
                "",
                warning_text,
                flags=re.IGNORECASE
            ).strip()

            # Ignore empty warnings
            if not warning_text:
                continue

            # Ignore "No warning"
            if warning_text.lower().startswith("no warning"):
                continue

            severity = get_severity(warning_text)
            hazard = get_hazard(warning_text)

            status = (
                "ACTIVE"
                if day_number == 1
                else "UPCOMING"
            )

            alerts.append({
                "id": f"imd-tn-day-{day_number}",
                "hazard": hazard,
                "severity": severity,
                "title": f"IMD Tamil Nadu Warning - Day {day_number}",
                "summary": warning_text,
                "source": "India Meteorological Department",
                "status": status,
                "timestamp": warning_date,
                "location": "Tamil Nadu & Puducherry",
                "display_location": "Tamil Nadu & Puducherry",
                "issue_date": issue_date,
                "source_url": IMD_TAMILNADU_WARNING_URL,
                "verified": True
            })

        return {
            "status": "CONNECTED",
            "source": "India Meteorological Department",
            "source_url": IMD_TAMILNADU_WARNING_URL,
            "issue_date": issue_date,
            "alerts": alerts,
            "message": "Official IMD Tamil Nadu warning information retrieved."
        }

    except Exception as e:

        print("\n========== IMD ALERT ERROR ==========")
        print(str(e))
        print("=====================================\n")

        return {
            "status": "ERROR",
            "source": "India Meteorological Department",
            "source_url": IMD_TAMILNADU_WARNING_URL,
            "issue_date": None,
            "alerts": [],
            "message": "Unable to retrieve official IMD warning information.",
            "error": str(e)
        }


# -----------------------------------------
# DIRECT TEST
# -----------------------------------------

if __name__ == "__main__":

    result = get_imd_alerts()

    print("\n========== IMD RESULT ==========\n")

    print("Status:", result["status"])
    print("Issue Date:", result.get("issue_date"))
    print("Alerts:", len(result.get("alerts", [])))

    for alert in result.get("alerts", []):

        print("\n-----------------------------")
        print("ID:", alert["id"])
        print("Hazard:", alert["hazard"])
        print("Severity:", alert["severity"])
        print("Title:", alert["title"])
        print("Summary:", alert["summary"])
        print("Status:", alert["status"])
        print("Date:", alert["timestamp"])

    print("\n================================\n")
import re
import requests
from bs4 import BeautifulSoup


# ============================================================
# OFFICIAL IMD SOURCES
# ============================================================

IMD_COASTAL_BULLETIN_URL = (
    "https://mausam.imd.gov.in/Forecast/coastal_bulletin_new.php?id=6"
)

IMD_CYCLONE_URL = (
    "https://mausam.imd.gov.in/responsive/cycloneinformation.php"
)

IMD_ARCHIVE_URL = (
    "https://mausam.imd.gov.in/responsive/cyclone_bulletin_archive.php?id=1"
)

IMD_INTERACTIVE_TRACK_URL = (
    "https://dss.imd.gov.in/"
)

IMD_SOURCE_NAME = "India Meteorological Department"


# ============================================================
# HTTP HEADERS
# ============================================================

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 "
        "(KHTML, like Gecko) "
        "Chrome/154.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,"
        "application/xml;q=0.9,*/*;q=0.8"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


# ============================================================
# CLEAN TEXT
# ============================================================

def clean_text(text):

    if not text:
        return ""

    replacements = {
        "Â°": "°",
        "â°": "°",
        "º": "°",
        "Â": "",
        "â": "-",
        "â": "-",
        "â": "'",
        "â": "'",
        "â": '"',
        "â": '"',
        "â¦": "...",
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# ============================================================
# FETCH OFFICIAL IMD PAGE
# ============================================================

def fetch_imd_page(url):

    response = requests.get(
        url,
        headers=HEADERS,
        timeout=20
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.content,
        "html.parser"
    )

    for tag in soup.find_all(
        ["script", "style", "noscript"]
    ):
        tag.decompose()

    return soup


# ============================================================
# GET ALL PAGE TEXT
# ============================================================

def get_page_text(soup):

    if not soup:
        return ""

    return clean_text(
        soup.get_text(
            " ",
            strip=True
        )
    )


# ============================================================
# EXTRACT SYNOPTIC SITUATION
# ============================================================

def get_synoptic_situation(text):

    if not text:
        return None

    match = re.search(
        r"Synoptic\s+Situation\s*\|\s*(.*?)(?=\s+North\s+Tamilnadu\s+coast)",
        text,
        re.IGNORECASE
    )

    if match:
        return clean_text(
            match.group(1)
        )

    return None


# ============================================================
# EXTRACT ISSUE TIME
# ============================================================

def extract_issue_time(text):

    if not text:
        return None

    match = re.search(
        r"Time\s+of\s+Issue\s*\|\s*(.*)$",
        text,
        re.IGNORECASE
    )

    if match:
        return clean_text(
            match.group(1)
        )

    return None


# ============================================================
# EXTRACT NORTH TAMILNADU SECTION
# ============================================================

def extract_north_tamilnadu_section(text):

    if not text:
        return ""

    match = re.search(
        r"North\s+Tamilnadu\s+coast"
        r"(.*?)"
        r"(?=\s+South\s+Tamilnadu\s+coast)",
        text,
        re.IGNORECASE
    )

    if match:
        return clean_text(
            match.group(1)
        )

    return ""


# ============================================================
# EXTRACT FIELD BETWEEN TWO LABELS
# ============================================================

def extract_between(
    text,
    start_label,
    end_label
):

    if not text:
        return None

    pattern = (
        re.escape(start_label)
        + r"\s*\|\s*(.*?)"
        + r"(?=\s+"
        + re.escape(end_label)
        + r"\s*\|)"
    )

    match = re.search(
        pattern,
        text,
        re.IGNORECASE
    )

    if match:
        return clean_text(
            match.group(1)
        )

    return None


# ============================================================
# NORTH TAMILNADU DATA
# ============================================================

def extract_north_tamilnadu_data(text):

    result = {
        "wind": None,
        "weather": None,
        "visibility": None,
        "sea_condition": None,
        "port_signal": None,
        "storm_surge_warning": None,
    }

    section = extract_north_tamilnadu_section(
        text
    )

    if not section:
        return result

    # --------------------------------------------------------
    # WIND
    # --------------------------------------------------------

    result["wind"] = extract_between(
        section,
        "Wind",
        "Weather"
    )

    # --------------------------------------------------------
    # WEATHER
    # --------------------------------------------------------

    result["weather"] = extract_between(
        section,
        "Weather",
        "Visibility"
    )

    # --------------------------------------------------------
    # VISIBILITY
    # --------------------------------------------------------

    result["visibility"] = extract_between(
        section,
        "Visibility",
        "Sea Condition"
    )

    # --------------------------------------------------------
    # SEA CONDITION
    # --------------------------------------------------------

    result["sea_condition"] = extract_between(
        section,
        "Sea Condition",
        "Port Signal"
    )

    # --------------------------------------------------------
    # PORT SIGNAL
    # --------------------------------------------------------

    result["port_signal"] = extract_between(
        section,
        "Port Signal",
        "Storm Surge/Tidal Warning"
    )

    # --------------------------------------------------------
    # STORM SURGE / TIDAL WARNING
    # --------------------------------------------------------

    match = re.search(
        r"Storm\s+Surge/Tidal\s+Warning\s*\|\s*(.*)",
        section,
        re.IGNORECASE
    )

    if match:
        result["storm_surge_warning"] = clean_text(
            match.group(1)
        )

    return result


# ============================================================
# DETECT WEATHER SYSTEM
# ============================================================

def detect_system(text):

    if not text:
        return None

    upper = text.upper()

    if "SUPER CYCLONIC STORM" in upper:
        return "SUPER CYCLONIC STORM"

    if "EXTREMELY SEVERE CYCLONIC STORM" in upper:
        return "EXTREMELY SEVERE CYCLONIC STORM"

    if "VERY SEVERE CYCLONIC STORM" in upper:
        return "VERY SEVERE CYCLONIC STORM"

    if "SEVERE CYCLONIC STORM" in upper:
        return "SEVERE CYCLONIC STORM"

    if "CYCLONIC STORM" in upper:
        return "CYCLONIC STORM"

    if "DEEP DEPRESSION" in upper:
        return "DEEP DEPRESSION"

    if re.search(
        r"\bDEPRESSION\b",
        upper
    ):
        return "DEPRESSION"

    if "WELL-MARKED LOW PRESSURE AREA" in upper:
        return "WELL-MARKED LOW PRESSURE AREA"

    if "LOW PRESSURE AREA" in upper:
        return "LOW PRESSURE AREA"

    return None


# ============================================================
# EXTRACT SYSTEM NAME
# ============================================================

def extract_system_name(text):

    if not text:
        return None

    patterns = [
        r"\bCYCLONIC STORM\s+([A-Z][A-Z0-9\-]+)",
        r"\bSEVERE CYCLONIC STORM\s+([A-Z][A-Z0-9\-]+)",
        r"\bVERY SEVERE CYCLONIC STORM\s+([A-Z][A-Z0-9\-]+)",
        r"\bEXTREMELY SEVERE CYCLONIC STORM\s+([A-Z][A-Z0-9\-]+)",
    ]

    invalid_names = {
        "OVER",
        "THE",
        "AND",
        "OF",
        "HAS",
        "IS",
        "WAS",
        "MOVED",
        "NEAR",
        "ADJOINING",
        "INFORMATION",
    }

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if not match:
            continue

        name = match.group(1).strip()

        if name.upper() in invalid_names:
            continue

        return name.title()

    return None


# ============================================================
# EXTRACT COORDINATES
# ============================================================

def extract_coordinates(text):

    if not text:
        return None

    text = clean_text(text)

    patterns = [

        # latitude 20.2°N ... longitude 95.2°E

        r"""
        latitude
        \s+
        (\d{1,2}(?:\.\d+)?)
        \s*
        [°º]?
        \s*
        ([NS])
        .*?
        longitude
        \s+
        (\d{1,3}(?:\.\d+)?)
        \s*
        [°º]?
        \s*
        ([EW])
        """,

        # 20.2°N ... 95.2°E

        r"""
        (\d{1,2}(?:\.\d+)?)
        \s*
        [°º]?
        \s*
        ([NS])
        .*?
        (\d{1,3}(?:\.\d+)?)
        \s*
        [°º]?
        \s*
        ([EW])
        """
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE | re.VERBOSE
        )

        if not match:
            continue

        latitude = float(
            match.group(1)
        )

        lat_direction = (
            match.group(2).upper()
        )

        longitude = float(
            match.group(3)
        )

        lon_direction = (
            match.group(4).upper()
        )

        if lat_direction == "S":
            latitude = -latitude

        if lon_direction == "W":
            longitude = -longitude

        return {
            "latitude": latitude,
            "longitude": longitude
        }

    return None


# ============================================================
# EXTRACT MOVEMENT
# ============================================================

def extract_movement(text):

    if not text:
        return None

    directions = (
        "westnorthwestwards|"
        "westnorthwestward|"
        "northnorthwestwards|"
        "northnorthwestward|"
        "northwestwards|"
        "northwestward|"
        "northeastwards|"
        "northeastward|"
        "southwestwards|"
        "southwestward|"
        "southeastwards|"
        "southeastward|"
        "northwards|"
        "northward|"
        "southwards|"
        "southward|"
        "eastwards|"
        "eastward|"
        "westwards|"
        "westward"
    )

    patterns = [
        rf"\bmoved\s+({directions})",
        rf"\bmove\s+({directions})",
        rf"\bmoving\s+({directions})",
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            return (
                match.group(1)
                .strip()
                .title()
            )

    return None


# ============================================================
# EXTRACT SPEED
# ============================================================

def extract_speed(text):

    if not text:
        return None

    patterns = [
        r"(\d+(?:\.\d+)?)\s*KMPH",
        r"(\d+(?:\.\d+)?)\s*KM/H",
        r"(\d+(?:\.\d+)?)\s*KNOTS?",
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if not match:
            continue

        value = float(
            match.group(1)
        )

        if "KNOT" in pattern.upper():

            value = round(
                value * 1.852,
                2
            )

        return value

    return None


# ============================================================
# MAIN FUNCTION
# ============================================================

def get_cyclone_status():

    try:

        # ----------------------------------------------------
        # Fetch official IMD page
        # ----------------------------------------------------

        soup = fetch_imd_page(
            IMD_COASTAL_BULLETIN_URL
        )

        # ----------------------------------------------------
        # Convert complete page to text
        # ----------------------------------------------------

        page_text = get_page_text(
            soup
        )

        # ----------------------------------------------------
        # Synoptic situation
        # ----------------------------------------------------

        synoptic = get_synoptic_situation(
            page_text
        )

        # ----------------------------------------------------
        # Issue time
        # ----------------------------------------------------

        issue_time = extract_issue_time(
            page_text
        )

        # ----------------------------------------------------
        # North Tamil Nadu
        # ----------------------------------------------------

        north_tamilnadu = (
            extract_north_tamilnadu_data(
                page_text
            )
        )

        # ----------------------------------------------------
        # If NIL
        # ----------------------------------------------------

        if (
            not synoptic
            or synoptic.strip().upper()
            in {
                "NIL",
                "NIL.",
                "NONE"
            }
        ):

            return {

                "status": "CONNECTED",

                "source": IMD_SOURCE_NAME,

                "source_url": IMD_COASTAL_BULLETIN_URL,

                "bulletin_url": IMD_COASTAL_BULLETIN_URL,

                "archive_url": IMD_ARCHIVE_URL,

                "interactive_track_url": (
                    IMD_INTERACTIVE_TRACK_URL
                ),

                "active_cyclone": False,

                "active_disturbance": False,

                "system_type": None,

                "name": None,

                "latitude": None,

                "longitude": None,

                "coordinates_verified": False,

                "movement": None,

                "speed_kmph": None,

                "issue_time": issue_time,

                "synoptic_situation": "NIL",

                "north_tamilnadu": north_tamilnadu,

                "message": (
                    "Current official IMD bulletin "
                    "reports no synoptic disturbance."
                )
            }

        # ----------------------------------------------------
        # System exists
        # ----------------------------------------------------

        system_type = detect_system(
            synoptic
        )

        coordinates = extract_coordinates(
            synoptic
        )

        movement = extract_movement(
            synoptic
        )

        speed = extract_speed(
            synoptic
        )

        name = extract_system_name(
            synoptic
        )

        cyclone_types = {
            "CYCLONIC STORM",
            "SEVERE CYCLONIC STORM",
            "VERY SEVERE CYCLONIC STORM",
            "EXTREMELY SEVERE CYCLONIC STORM",
            "SUPER CYCLONIC STORM",
        }

        active_cyclone = (
            system_type in cyclone_types
        )

        active_disturbance = (
            system_type is not None
        )

        # ----------------------------------------------------
        # Return
        # ----------------------------------------------------

        return {

            "status": "CONNECTED",

            "source": IMD_SOURCE_NAME,

            "source_url": IMD_COASTAL_BULLETIN_URL,

            "bulletin_url": IMD_COASTAL_BULLETIN_URL,

            "archive_url": IMD_ARCHIVE_URL,

            "interactive_track_url": (
                IMD_INTERACTIVE_TRACK_URL
            ),

            "active_cyclone": active_cyclone,

            "active_disturbance": active_disturbance,

            "system_type": system_type,

            "name": name,

            "latitude": (
                coordinates["latitude"]
                if coordinates
                else None
            ),

            "longitude": (
                coordinates["longitude"]
                if coordinates
                else None
            ),

            "coordinates_verified": (
                coordinates is not None
            ),

            "movement": movement,

            "speed_kmph": speed,

            "issue_time": issue_time,

            "synoptic_situation": synoptic,

            "north_tamilnadu": north_tamilnadu,

            "message": (
                "Official IMD information "
                "retrieved successfully."
            )
        }

    except requests.exceptions.RequestException as error:

        return {

            "status": "UNAVAILABLE",

            "source": IMD_SOURCE_NAME,

            "source_url": IMD_COASTAL_BULLETIN_URL,

            "active_cyclone": False,

            "active_disturbance": False,

            "system_type": None,

            "name": None,

            "latitude": None,

            "longitude": None,

            "coordinates_verified": False,

            "movement": None,

            "speed_kmph": None,

            "issue_time": None,

            "north_tamilnadu": {},

            "message": (
                "Unable to reach official IMD source."
            ),

            "error": str(error)
        }

    except Exception as error:

        return {

            "status": "ERROR",

            "source": IMD_SOURCE_NAME,

            "source_url": IMD_COASTAL_BULLETIN_URL,

            "active_cyclone": False,

            "active_disturbance": False,

            "system_type": None,

            "name": None,

            "latitude": None,

            "longitude": None,

            "coordinates_verified": False,

            "movement": None,

            "speed_kmph": None,

            "issue_time": None,

            "north_tamilnadu": {},

            "message": (
                "Official IMD information "
                "could not be processed."
            ),

            "error": str(error)
        }


# ============================================================
# DIRECT TEST
# ============================================================

if __name__ == "__main__":

    import json

    result = get_cyclone_status()

    print(
        json.dumps(
            result,
            indent=2,
            ensure_ascii=False
        )
    )
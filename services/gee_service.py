import os
import json
from datetime import datetime, timedelta, timezone

import ee


# =========================================================
# GOOGLE EARTH ENGINE CONFIGURATION
# =========================================================

EE_PROJECT = "a2znexus-final"

# Render Secret File
RENDER_SERVICE_ACCOUNT_FILE = "/etc/secrets/service-account.json"

# Local development fallback
LOCAL_SERVICE_ACCOUNT_FILE = "service-account.json"

_ee_initialized = False


# =========================================================
# GOOGLE EARTH ENGINE INITIALIZATION
# =========================================================

def initialize_earth_engine():
    """
    Initialize Google Earth Engine.

    Priority:
    1. Render Secret File
    2. Local service-account.json
    3. Existing local Earth Engine credentials
    """

    global _ee_initialized

    if _ee_initialized:
        return True

    try:
        # -------------------------------------------------
        # RENDER / SERVER ENVIRONMENT
        # -------------------------------------------------
        if os.path.exists(RENDER_SERVICE_ACCOUNT_FILE):

            with open(
                RENDER_SERVICE_ACCOUNT_FILE,
                "r",
                encoding="utf-8"
            ) as f:
                service_account_info = json.load(f)

            service_account_email = service_account_info["client_email"]

            credentials = ee.ServiceAccountCredentials(
                service_account_email,
                RENDER_SERVICE_ACCOUNT_FILE
            )

            ee.Initialize(
                credentials=credentials,
                project=EE_PROJECT
            )

            _ee_initialized = True

            print(
                "EARTH ENGINE CONNECTED "
                "USING RENDER SERVICE ACCOUNT"
            )

            return True

        # -------------------------------------------------
        # LOCAL SERVICE ACCOUNT FALLBACK
        # -------------------------------------------------
        if os.path.exists(LOCAL_SERVICE_ACCOUNT_FILE):

            with open(
                LOCAL_SERVICE_ACCOUNT_FILE,
                "r",
                encoding="utf-8"
            ) as f:
                service_account_info = json.load(f)

            service_account_email = service_account_info["client_email"]

            credentials = ee.ServiceAccountCredentials(
                service_account_email,
                LOCAL_SERVICE_ACCOUNT_FILE
            )

            ee.Initialize(
                credentials=credentials,
                project=EE_PROJECT
            )

            _ee_initialized = True

            print(
                "EARTH ENGINE CONNECTED "
                "USING LOCAL SERVICE ACCOUNT"
            )

            return True

        # -------------------------------------------------
        # LOCAL USER AUTHENTICATION FALLBACK
        # -------------------------------------------------
        ee.Initialize(
            project=EE_PROJECT
        )

        _ee_initialized = True

        print(
            "EARTH ENGINE CONNECTED "
            "USING LOCAL AUTHENTICATION"
        )

        return True

    except Exception as e:

        print(
            "\n========== EARTH ENGINE ERROR =========="
        )

        print(str(e))

        print(
            "========================================\n"
        )

        return False


# =========================================================
# RISK MAP — LIVE GEE RAINFALL TILE
# =========================================================

def get_rainfall_layer():

    if not initialize_earth_engine():

        return {
            "status": "ERROR",
            "error": "Google Earth Engine authentication failed.",
            "dataset": "NASA GPM IMERG V07",
            "layer": "GEE Near-Real-Time Rainfall"
        }

    collection = (
        ee.ImageCollection(
            "NASA/GPM_L3/IMERG_V07"
        )
        .filterBounds(
            ee.Geometry.Rectangle([
                68,
                6,
                98,
                37
            ])
        )
        .sort(
            "system:time_start",
            False
        )
    )

    image = (
        collection
        .first()
        .select(
            "precipitation"
        )
    )

    vis_params = {

        "min": 0,

        "max": 15,

        "palette": [
            "000096",
            "0064ff",
            "00b4ff",
            "33db80",
            "9beb4a",
            "ffeb00",
            "ffb300",
            "ff6400",
            "eb1e00",
            "af0000"
        ]

    }

    map_id = image.getMapId(
        vis_params
    )

    return {

        "status": "CONNECTED",

        "tile_url":
            map_id[
                "tile_fetcher"
            ].url_format,

        "dataset":
            "NASA GPM IMERG V07",

        "layer":
            "GEE Near-Real-Time Rainfall"

    }


# =========================================================
# INSURANCE — LIVE 24-HOUR RAINFALL
# =========================================================

def get_live_insurance_rainfall(
    latitude=10.7672,
    longitude=79.8449,
    hours=24
):

    """
    Retrieve recent rainfall observations from
    NASA GPM IMERG V07 through Google Earth Engine.

    Prototype decision-support data only.
    Not an insurance contract measurement.
    """

    if not initialize_earth_engine():

        return {

            "status":
                "ERROR",

            "rainfall_mm":
                None,

            "image_count":
                0,

            "hours":
                hours,

            "latitude":
                latitude,

            "longitude":
                longitude,

            "source":
                "NASA GPM IMERG V07",

            "updated_at":
                datetime.now(
                    timezone.utc
                ).isoformat(),

            "error":
                "Google Earth Engine authentication failed."

        }

    end_time = datetime.now(
        timezone.utc
    )

    start_time = (
        end_time -
        timedelta(
            hours=hours
        )
    )

    point = ee.Geometry.Point([
        longitude,
        latitude
    ])

    collection = (

        ee.ImageCollection(
            "NASA/GPM_L3/IMERG_V07"
        )

        .filterDate(
            start_time.isoformat(),
            end_time.isoformat()
        )

        .filterBounds(
            point
        )

        .select(
            "precipitation"
        )

    )

    image_count = (
        collection
        .size()
        .getInfo()
    )

    if image_count == 0:

        return {

            "status":
                "NO_DATA",

            "rainfall_mm":
                None,

            "image_count":
                0,

            "hours":
                hours,

            "latitude":
                latitude,

            "longitude":
                longitude,

            "source":
                "NASA GPM IMERG V07",

            "updated_at":
                end_time.isoformat()

        }

    rainfall_rate_sum = (
        collection.sum()
    )

    rainfall_result = (

        rainfall_rate_sum

        .multiply(
            0.5
        )

        .reduceRegion(

            reducer=
                ee.Reducer.mean(),

            geometry=
                point,

            scale=
                10000,

            bestEffort=
                True

        )

        .get(
            "precipitation"
        )

        .getInfo()

    )

    if rainfall_result is None:

        return {

            "status":
                "NO_DATA",

            "rainfall_mm":
                None,

            "image_count":
                image_count,

            "hours":
                hours,

            "latitude":
                latitude,

            "longitude":
                longitude,

            "source":
                "NASA GPM IMERG V07",

            "updated_at":
                end_time.isoformat()

        }

    rainfall_mm = round(
        float(
            rainfall_result
        ),
        2
    )

    return {

        "status":
            "CONNECTED",

        "rainfall_mm":
            rainfall_mm,

        "image_count":
            image_count,

        "hours":
            hours,

        "latitude":
            latitude,

        "longitude":
            longitude,

        "source":
            "NASA GPM IMERG V07",

        "updated_at":
            end_time.isoformat()

    }
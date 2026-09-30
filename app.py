import os

from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv

from services.gee_service import get_rainfall_layer
from services.weather_service import get_live_rainfall

from services.cyclone_service import get_cyclone_status
from services.imd_alert_service import get_imd_alerts


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)


DATA_FILE = os.path.join(
    "data",
    "alerts.json"
)


# =========================================================
# PAGE ROUTES
# =========================================================

@app.route("/")
def login():
    return render_template(
        "login.html"
    )


@app.route("/dashboard")
def dashboard():
    return render_template(
        "dashboard.html"
    )


@app.route("/live-alerts")
def live_alerts():
    return render_template(
        "live-alerts.html"
    )


@app.route("/risk-map")
def risk_map():
    return render_template(
        "risk-map.html"
    )


@app.route("/infrastructure")
def infrastructure():
    return render_template(
        "infrastructure.html"
    )


@app.route("/shelters")
def shelters():
    return render_template(
        "shelters.html"
    )


@app.route("/weather")
def weather():
    return render_template(
        "weather.html"
    )


@app.route("/news")
def news():
    return render_template(
        "news.html"
    )


@app.route("/assistant")
def assistant():
    return render_template(
        "assistant.html"
    )


@app.route("/insurance")
def insurance():
    return render_template(
        "insurance.html"
    )


@app.route("/reports")
def reports():
    return render_template(
        "reports.html"
    )


@app.route("/settings")
def settings():
    return render_template(
        "settings.html"
    )


# =========================================================
# OFFICIAL IMD LIVE ALERT API
# =========================================================

@app.get("/api/alerts")
def api_alerts():

    try:

        # -------------------------------------------------
        # GET OFFICIAL IMD WEATHER WARNINGS
        # -------------------------------------------------

        imd_result = get_imd_alerts()

        alerts = list(
            imd_result.get(
                "alerts",
                []
            )
        )


        # -------------------------------------------------
        # GET OFFICIAL IMD CYCLONE INFORMATION
        # -------------------------------------------------

        cyclone = get_cyclone_status()


        # -------------------------------------------------
        # ADD ACTIVE CYCLONE / DISTURBANCE
        # -------------------------------------------------

        if (
            cyclone.get("status") == "CONNECTED"
            and cyclone.get("active_disturbance")
            and cyclone.get("system_type")
        ):

            system_type = str(
                cyclone.get(
                    "system_type"
                )
            )

            system_upper = system_type.upper()


            # -------------------------------------------------
            # DETERMINE SEVERITY
            # -------------------------------------------------

            if (
                "SUPER CYCLONIC" in system_upper
                or "EXTREMELY SEVERE" in system_upper
                or "VERY SEVERE" in system_upper
                or "SEVERE CYCLONIC" in system_upper
                or system_upper == "CYCLONIC STORM"
            ):

                severity = "HIGH"

            elif (
                "DEEP DEPRESSION" in system_upper
                or system_upper == "DEPRESSION"
            ):

                severity = "MEDIUM"

            else:

                severity = "LOW"


            # -------------------------------------------------
            # COORDINATES
            # -------------------------------------------------

            latitude = cyclone.get(
                "latitude"
            )

            longitude = cyclone.get(
                "longitude"
            )


            if (
                latitude is not None
                and longitude is not None
            ):

                location = (
                    f"{latitude}°N, "
                    f"{longitude}°E"
                )

            else:

                location = (
                    "Location not available"
                )


            # -------------------------------------------------
            # CYCLONE NAME
            # -------------------------------------------------

            cyclone_name = cyclone.get(
                "name"
            )


            if cyclone_name:

                title = (
                    f"{system_type} "
                    f"{cyclone_name}"
                )

            else:

                title = system_type


            # -------------------------------------------------
            # SYNOPTIC INFORMATION
            # -------------------------------------------------

            synoptic = cyclone.get(
                "synoptic_situation"
            )


            if not synoptic:

                synoptic = (
                    "Official IMD bulletin "
                    "contains a current weather system."
                )


            # -------------------------------------------------
            # INSERT CYCLONE ALERT FIRST
            # -------------------------------------------------

            alerts.insert(
                0,
                {
                    "id":
                        "imd-current-system",

                    "hazard":
                        "Cyclone / Weather System",

                    "severity":
                        severity,

                    "title":
                        title,

                    "summary":
                        synoptic,

                    "source":
                        "India Meteorological Department",

                    "status":
                        "ACTIVE",

                    "timestamp":
                        (
                            cyclone.get(
                                "issue_time"
                            )
                            or
                            "Official IMD bulletin time unavailable"
                        ),

                    "location":
                        location,

                    "display_location":
                        location,

                    "source_url":
                        cyclone.get(
                            "source_url"
                        ),

                    "verified":
                        True
                }
            )


        # =================================================
        # REMOVE DUPLICATE ALERTS
        # =================================================

        unique_alerts = []

        seen_ids = set()


        for alert in alerts:

            alert_id = str(
                alert.get(
                    "id",
                    ""
                )
            )


            if alert_id in seen_ids:

                continue


            seen_ids.add(
                alert_id
            )


            unique_alerts.append(
                alert
            )


        # =================================================
        # FINAL RESPONSE
        # =================================================

        return jsonify({

            "alerts":
                unique_alerts,

            "source":
                "India Meteorological Department",

            "status":
                "CONNECTED",

            "active_disturbance":
                cyclone.get(
                    "active_disturbance",
                    False
                ),

            "message":
                (
                    "Official IMD weather warnings "
                    "and cyclone information retrieved."
                )

        })


    except Exception as e:

        app.logger.exception(
            "Official IMD alert error"
        )


        return jsonify({

            "alerts":
                [],

            "source":
                "India Meteorological Department",

            "status":
                "ERROR",

            "message":
                (
                    "Unable to process official "
                    "IMD live alerts."
                ),

            "error":
                str(e)

        }), 500


# =========================================================
# GEE RAINFALL API
# =========================================================

@app.get("/api/risk-map/rainfall")
def risk_map_rainfall():

    try:

        rainfall_data = (
            get_rainfall_layer()
        )


        return jsonify(
            rainfall_data
        )


    except Exception as e:

        app.logger.exception(
            "GEE rainfall error"
        )


        return jsonify({

            "error":
                "Unable to load GEE rainfall layer",

            "details":
                str(e)

        }), 500


# =========================================================
# LIVE PARAMETRIC INSURANCE / RAINFALL API
# =========================================================

@app.get("/api/insurance")
def api_insurance():

    try:

        # -------------------------------------------------
        # MONITORED LOCATION
        # -------------------------------------------------

        latitude = 10.7672
        longitude = 79.8449

        location_name = "Nagapattinam"


        # -------------------------------------------------
        # GET LIVE METEOROLOGICAL RAINFALL
        # -------------------------------------------------

        result = get_live_rainfall(

            latitude=latitude,

            longitude=longitude,

            hours=24
        )


        # -------------------------------------------------
        # PARAMETRIC SIMULATION THRESHOLD
        # -------------------------------------------------

        threshold_mm = 250.0


        rainfall = result.get(
            "rainfall_mm"
        )


        # -------------------------------------------------
        # DETERMINE TRIGGER STATUS
        # -------------------------------------------------

        if rainfall is None:

            status = "NO DATA"

        elif rainfall >= threshold_mm:

            status = "TRIGGER CONDITION"

        elif rainfall >= (
            threshold_mm * 0.75
        ):

            status = "WATCH"

        else:

            status = "BELOW THRESHOLD"


        # -------------------------------------------------
        # ADD DECISION INFORMATION
        # -------------------------------------------------

        result["threshold_mm"] = (
            threshold_mm
        )

        result["status"] = (
            status
        )

        result["location_name"] = (
            location_name
        )

        result["latitude"] = (
            latitude
        )

        result["longitude"] = (
            longitude
        )

        result["measurement_type"] = (
            "24-hour precipitation"
        )

        result["prototype_notice"] = (
            "This is a parametric risk "
            "decision-support simulation, "
            "not an insurance contract or payout."
        )


        return jsonify(
            result
        )


    except Exception as e:

        app.logger.exception(
            "Insurance rainfall API error"
        )


        return jsonify({

            "status":
                "ERROR",

            "message":
                "Live rainfall data unavailable.",

            "source":
                "Open-Meteo",

            "error":
                str(e)

        }), 500


# =========================================================
# CYCLONE / IMD API
# =========================================================

@app.get("/api/cyclone")
def api_cyclone():

    try:

        cyclone_data = (
            get_cyclone_status()
        )


        return jsonify(
            cyclone_data
        )


    except Exception as e:

        app.logger.exception(
            "Cyclone service error"
        )


        return jsonify({

            "status":
                "UNAVAILABLE",

            "source":
                "India Meteorological Department",

            "active_cyclone":
                False,

            "active_disturbance":
                False,

            "system_type":
                None,

            "name":
                None,

            "latitude":
                None,

            "longitude":
                None,

            "coordinates_verified":
                False,

            "movement":
                None,

            "speed_kmph":
                None,

            "issue_time":
                None,

            "synoptic_situation":
                None,

            "north_tamilnadu":
                {},

            "error":
                str(e)

        }), 500


# =========================================================
# AI ASSISTANT API
# =========================================================

@app.route(
    "/api/ask",
    methods=["POST"]
)
def ask():

    from services.disaster_ai import ask_aran


    payload = (
        request.get_json(
            silent=True
        ) or {}
    )


    question = (
        payload
        .get(
            "question",
            ""
        )
        .strip()
    )


    if not question:

        return jsonify({

            "answer":
                "Please enter a question."

        }), 400


    try:

        answer = ask_aran(
            question
        )


        return jsonify({

            "answer":
                answer

        })


    except Exception as e:

        app.logger.exception(
            "Gemini error"
        )


        return jsonify({

            "answer":
                "ARAN AI could not complete the request.",

            "error":
                str(e)

        }), 500


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/api/health")
def health():

    return jsonify({

        "status":
            "ok",

        "service":
            "ARAN AI"

    })


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(

        debug=True,

        host="127.0.0.1",

        port=5000

    )
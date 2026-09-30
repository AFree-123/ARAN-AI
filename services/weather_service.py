import requests

from datetime import datetime, timezone


OPEN_METEO_URL = (
    "https://api.open-meteo.com/v1/forecast"
)


def get_live_rainfall(
    latitude=10.7672,
    longitude=79.8449,
    hours=24
):
    """
    Live meteorological precipitation data
    for ARAN AI parametric-risk simulation.

    This is prototype decision-support data.
    It is not an insurer-grade contractual measurement.
    """

    try:

        params = {

            "latitude":
                latitude,

            "longitude":
                longitude,

            "hourly":
                "precipitation",

            "past_days":
                1,

            "forecast_days":
                1,

            "timezone":
                "Asia/Kolkata"
        }


        response = requests.get(

            OPEN_METEO_URL,

            params=params,

            timeout=20
        )


        response.raise_for_status()


        data = response.json()


        hourly = data.get(
            "hourly",
            {}
        )


        times = hourly.get(
            "time",
            []
        )


        precipitation = hourly.get(
            "precipitation",
            []
        )


        if not times or not precipitation:

            return {

                "status":
                    "NO DATA",

                "rainfall_mm":
                    None,

                "hours":
                    0,

                "source":
                    "Open-Meteo",

                "source_url":
                    OPEN_METEO_URL,

                "updated_at":
                    datetime.now(
                        timezone.utc
                    ).isoformat(),

                "message":
                    "No precipitation data returned."
            }


        # -------------------------------------------------
        # BUILD VALID TIME/VALUE PAIRS
        # -------------------------------------------------

        pairs = []


        for time_value, rain_value in zip(
            times,
            precipitation
        ):

            if rain_value is None:
                continue


            try:

                rain_value = float(
                    rain_value
                )

            except (
                TypeError,
                ValueError
            ):

                continue


            pairs.append(
                (
                    time_value,
                    rain_value
                )
            )


        if not pairs:

            return {

                "status":
                    "NO DATA",

                "rainfall_mm":
                    None,

                "hours":
                    0,

                "source":
                    "Open-Meteo",

                "source_url":
                    OPEN_METEO_URL,

                "updated_at":
                    datetime.now(
                        timezone.utc
                    ).isoformat(),

                "message":
                    "No valid precipitation values returned."
            }


        # -------------------------------------------------
        # LAST 24 HOURLY VALUES
        # -------------------------------------------------

        latest_pairs = pairs[-hours:]


        rainfall_mm = sum(

            value

            for _, value
            in latest_pairs
        )


        latest_observation = (
            latest_pairs[-1][0]
        )


        # -------------------------------------------------
        # RETURN LIVE DATA
        # -------------------------------------------------

        return {

            "status":
                "CONNECTED",

            "rainfall_mm":
                round(
                    rainfall_mm,
                    1
                ),

            "hours":
                len(
                    latest_pairs
                ),

            "latitude":
                latitude,

            "longitude":
                longitude,

            "source":
                "Open-Meteo",

            "source_url":
                OPEN_METEO_URL,

            "measurement_type":
                "24-hour precipitation",

            "latest_observation":
                latest_observation,

            "updated_at":
                datetime.now(
                    timezone.utc
                ).isoformat(),

            "data_note":
                (
                    "Meteorological model data "
                    "for prototype decision support. "
                    "Not an insurer-grade contractual "
                    "measurement."
                )
        }


    except requests.RequestException as e:

        print(
            "\n========== WEATHER API ERROR =========="
        )

        print(str(e))

        print(
            "=======================================\n"
        )


        return {

            "status":
                "ERROR",

            "rainfall_mm":
                None,

            "source":
                "Open-Meteo",

            "source_url":
                OPEN_METEO_URL,

            "updated_at":
                datetime.now(
                    timezone.utc
                ).isoformat(),

            "message":
                "Unable to retrieve live meteorological data.",

            "error":
                str(e)
        }


    except Exception as e:

        print(
            "\n========== WEATHER SERVICE ERROR =========="
        )

        print(str(e))

        print(
            "===========================================\n"
        )


        return {

            "status":
                "ERROR",

            "rainfall_mm":
                None,

            "source":
                "Open-Meteo",

            "source_url":
                OPEN_METEO_URL,

            "updated_at":
                datetime.now(
                    timezone.utc
                ).isoformat(),

            "message":
                "Unexpected weather service error.",

            "error":
                str(e)
        }


# =========================================================
# DIRECT TEST
# =========================================================

if __name__ == "__main__":

    result = get_live_rainfall()


    print(
        "\n========== LIVE RAINFALL ==========\n"
    )


    for key, value in result.items():

        print(
            f"{key}: {value}"
        )


    print(
        "\n===================================\n"
    )
import ee
from datetime import datetime, timedelta, timezone


# =========================================================
# GOOGLE EARTH ENGINE INITIALIZATION
# =========================================================

ee.Initialize(project="a2znexus-final")


# =========================================================
# RISK MAP — LIVE GEE RAINFALL TILE
# =========================================================

def get_rainfall_layer():

    collection = (
        ee.ImageCollection("NASA/GPM_L3/IMERG_V07")
        .filterBounds(
            ee.Geometry.Rectangle([
                68, 6, 98, 37
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
        .select("precipitation")
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

    This is decision-support / prototype data.
    It is NOT an insurance contract measurement.
    """


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


    # IMERG precipitation band is
    # represented as a rate.
    #
    # IMERG V07 provides approximately
    # 30-minute observations.
    #
    # Therefore:
    #
    # rate × 0.5 hour
    #
    # gives approximate rainfall depth
    # contribution for each image.


    rainfall_rate_sum = (
        collection.sum()
    )


    rainfall_result = (

        rainfall_rate_sum

        .multiply(0.5)

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
        float(rainfall_result),
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
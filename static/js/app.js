/* =========================================================
   ARAN AI — DASHBOARD APP.JS
   Live Alerts + Gemini + Real Interactive Map
========================================================= */


/* =========================================================
   GLOBAL MAP VARIABLES
========================================================= */

let aranMap = null;

let satelliteLayer = null;
let streetLayer = null;
let rainfallLayer = null;

let alertMarkers = [];
let cycloneMarkers = [];

let mapInitialized = false;


/* =========================================================
   SAFE HTML ESCAPE
========================================================= */

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   LOAD LEAFLET
========================================================= */

function loadLeaflet() {

  return new Promise((resolve, reject) => {

    /* Already loaded */
    if (window.L) {
      resolve();
      return;
    }


    /* Leaflet CSS */

    if (!document.getElementById("aran-leaflet-css")) {

      const css =
        document.createElement("link");

      css.id =
        "aran-leaflet-css";

      css.rel =
        "stylesheet";

      css.href =
        "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

      document.head.appendChild(css);
    }


    /* Leaflet JS */

    const existing =
      document.getElementById(
        "aran-leaflet-js"
      );


    if (existing) {

      existing.addEventListener(
        "load",
        () => resolve()
      );

      existing.addEventListener(
        "error",
        () => reject(
          new Error(
            "Leaflet failed to load"
          )
        )
      );

      return;
    }


    const script =
      document.createElement("script");

    script.id =
      "aran-leaflet-js";

    script.src =
      "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

    script.onload =
      () => resolve();

    script.onerror =
      () => reject(
        new Error(
          "Unable to load Leaflet"
        )
      );

    document.head.appendChild(
      script
    );

  });

}


/* =========================================================
   CREATE MAP
========================================================= */

async function initializeAranMap() {

  const container =
    document.getElementById(
      "risk"
    );


  if (!container) {
    return;
  }


  try {

    await loadLeaflet();

  }

  catch (error) {

    console.error(
      "Leaflet error:",
      error
    );

    return;
  }


  if (mapInitialized) {
    return;
  }


  mapInitialized = true;


  /* -------------------------------------------------------
     Replace old demo map content
  ------------------------------------------------------- */

  container.innerHTML = `

    <div
      id="aran-live-map"
      style="
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        min-height:500px;
        z-index:1;
      "
    ></div>


    <div
      class="map-tools"
      style="
        position:absolute;
        z-index:1000;
        top:14px;
        left:14px;
      "
    >

      <button
        id="mapSatelliteBtn"
        type="button"
      >
        ◉ Satellite
      </button>

      <button
        id="mapRainfallBtn"
        type="button"
      >
        ☁ Rainfall
      </button>

      <button
        id="mapStreetBtn"
        type="button"
      >
        ▧ Street
      </button>

    </div>


    <div
      id="mapLiveStatus"
      style="
        position:absolute;
        z-index:1000;
        right:14px;
        top:14px;
        padding:8px 12px;
        border-radius:10px;
        background:rgba(4,20,35,.88);
        border:1px solid rgba(100,200,255,.2);
        color:#8ddfff;
        font-size:11px;
        backdrop-filter:blur(8px);
      "
    >
      ● LIVE MAP
    </div>


    <div
      id="mapLegend"
      style="
        position:absolute;
        z-index:1000;
        left:14px;
        bottom:14px;
        padding:10px 13px;
        border-radius:10px;
        background:rgba(4,20,35,.9);
        border:1px solid rgba(100,200,255,.2);
        color:white;
        font-size:11px;
        backdrop-filter:blur(8px);
      "
    >

      <div>
        <span
          style="
            display:inline-block;
            width:8px;
            height:8px;
            border-radius:50%;
            background:#ff4d67;
            margin-right:5px;
          "
        ></span>

        IMD Alert
      </div>

      <div style="margin-top:5px">

        <span
          style="
            display:inline-block;
            width:8px;
            height:8px;
            border-radius:50%;
            background:#ffc04d;
            margin-right:5px;
          "
        ></span>

        Monitoring location

      </div>

    </div>

  `;


  /* -------------------------------------------------------
     Create Leaflet map
  ------------------------------------------------------- */

  aranMap =
    L.map(
      "aran-live-map",
      {
        center: [
          11.1271,
          79.7799
        ],

        zoom: 7,

        zoomControl: true,

        attributionControl: true
      }
    );


  /* -------------------------------------------------------
     Street map
  ------------------------------------------------------- */

  streetLayer =
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,

        attribution:
          '&copy; OpenStreetMap contributors'
      }
    );


  /* -------------------------------------------------------
     Satellite map
  ------------------------------------------------------- */

  satelliteLayer =
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,

        attribution:
          "Esri World Imagery"
      }
    );


  /* Start with satellite */

  satelliteLayer.addTo(
    aranMap
  );


  /* -------------------------------------------------------
     Monitoring locations
  ------------------------------------------------------- */

  addMonitoringLocations();


  /* -------------------------------------------------------
     Map controls
  ------------------------------------------------------- */

  const satelliteBtn =
    document.getElementById(
      "mapSatelliteBtn"
    );


  const streetBtn =
    document.getElementById(
      "mapStreetBtn"
    );


  const rainfallBtn =
    document.getElementById(
      "mapRainfallBtn"
    );


  if (satelliteBtn) {

    satelliteBtn.onclick =
      function() {

        if (
          !aranMap.hasLayer(
            satelliteLayer
          )
        ) {

          aranMap.addLayer(
            satelliteLayer
          );

        }


        if (
          aranMap.hasLayer(
            streetLayer
          )
        ) {

          aranMap.removeLayer(
            streetLayer
          );

        }

      };

  }


  if (streetBtn) {

    streetBtn.onclick =
      function() {

        if (
          !aranMap.hasLayer(
            streetLayer
          )
        ) {

          aranMap.addLayer(
            streetLayer
          );

        }


        if (
          aranMap.hasLayer(
            satelliteLayer
          )
        ) {

          aranMap.removeLayer(
            satelliteLayer
          );

        }

      };

  }


  if (rainfallBtn) {

    rainfallBtn.onclick =
      async function() {

        await loadDashboardRainfallLayer();

      };

  }


  /* -------------------------------------------------------
     Load rainfall automatically
  ------------------------------------------------------- */

  await loadDashboardRainfallLayer();


  /* -------------------------------------------------------
     Load current alerts on map
  ------------------------------------------------------- */

  await updateMapAlerts();


  /* -------------------------------------------------------
     Load cyclone
  ------------------------------------------------------- */

  await updateMapCyclone();


  setTimeout(
    function() {

      aranMap.invalidateSize();

    },
    500
  );

}


/* =========================================================
   MONITORING LOCATIONS
========================================================= */

function addMonitoringLocations() {

  if (!aranMap) {
    return;
  }


  const locations = [

    {
      name:
        "Chennai",

      lat:
        13.0827,

      lng:
        80.2707,

      type:
        "Monitoring location"
    },


    {
      name:
        "Cuddalore",

      lat:
        11.7480,

      lng:
        79.7714,

      type:
        "Monitoring location"
    },


    {
      name:
        "Nagapattinam",

      lat:
        10.7672,

      lng:
        79.8449,

      type:
        "Monitoring location"
    }

  ];


  locations.forEach(
    location => {

      const marker =
        L.circleMarker(
          [
            location.lat,
            location.lng
          ],
          {
            radius: 7,

            color:
              "#ffd166",

            weight: 2,

            fillColor:
              "#ffb703",

            fillOpacity:
              0.9
          }
        );


      marker.bindPopup(`

        <strong>
          ${escapeHtml(
            location.name
          )}
        </strong>

        <br>

        ARAN AI monitoring location

        <br>

        <small>
          ${location.lat.toFixed(4)},
          ${location.lng.toFixed(4)}
        </small>

      `);


      marker.addTo(
        aranMap
      );

    }
  );

}


/* =========================================================
   LOAD GEE RAINFALL
========================================================= */

async function loadDashboardRainfallLayer() {

  if (!aranMap) {
    return;
  }


  const status =
    document.getElementById(
      "mapLiveStatus"
    );


  try {

    if (status) {

      status.textContent =
        "● Loading GEE rainfall";

    }


    const response =
      await fetch(
        "/api/risk-map/rainfall?fresh=" +
        Date.now(),
        {
          cache:
            "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        "Rainfall API HTTP " +
        response.status
      );

    }


    const data =
      await response.json();


    /*
      Support common response formats.
    */

    const tileUrl =
      data.tile_url ||
      data.tileUrl ||
      data.url ||
      data.map_url ||
      data.mapUrl;


    if (!tileUrl) {

      console.warn(
        "GEE rainfall response:",
        data
      );


      if (status) {

        status.textContent =
          "● GEE rainfall unavailable";

      }

      return;

    }


    /* Remove previous rainfall layer */

    if (rainfallLayer) {

      aranMap.removeLayer(
        rainfallLayer
      );

    }


    rainfallLayer =
      L.tileLayer(
        tileUrl,
        {
          opacity:
            0.55,

          attribution:
            "NASA GPM IMERG V07 / Google Earth Engine",

          maxZoom:
            12
        }
      );


    rainfallLayer.addTo(
      aranMap
    );


    if (status) {

      status.textContent =
        "● GEE rainfall layer";

    }


  }

  catch (error) {

    console.error(
      "GEE rainfall map error:",
      error
    );


    if (status) {

      status.textContent =
        "● Base map connected";

    }

  }

}


/* =========================================================
   LOAD ALERTS
========================================================= */

async function loadAlerts() {

  const el =
    document.getElementById(
      "feed"
    );


  if (!el) {
    return;
  }


  try {

    const response =
      await fetch(
        "/api/alerts?fresh=" +
        Date.now(),
        {
          cache:
            "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        "Failed to fetch alerts"
      );

    }


    const data =
      await response.json();


    const alerts =
      data.alerts || [];


    if (alerts.length === 0) {

      el.innerHTML = `

        <p class="small">

          No current IMD warnings returned.

        </p>

      `;

      return;

    }


    el.innerHTML =
      alerts
        .map(
          a => {

            const severity =
              String(
                a.severity ||
                "LOW"
              ).toUpperCase();


            const hazard =
              a.hazard ||
              "Weather Alert";


            const title =
              a.title ||
              hazard;


            const summary =
              a.summary ||
              "No additional information available.";


            const location =
              a.display_location ||
              a.location ||
              "Location unavailable";


            const timestamp =
              a.timestamp ||
              "Time unavailable";


            const source =
              a.source ||
              "India Meteorological Department";


            const status =
              a.status ||
              "ACTIVE";


            return `

              <article
                class="feed-card ${severity.toLowerCase()}"
              >

                <div class="feed-top">

                  <span>

                    ${escapeHtml(
                      hazard
                    )}

                    •

                    ${escapeHtml(
                      severity
                    )}

                  </span>


                  <span>

                    ${escapeHtml(
                      timestamp
                    )}

                  </span>

                </div>


                <h4>

                  ${escapeHtml(
                    title
                  )}

                </h4>


                <p>

                  ${escapeHtml(
                    summary
                  )}

                </p>


                <div class="source">

                  ${escapeHtml(
                    source
                  )}

                  •

                  ${escapeHtml(
                    location
                  )}

                  •

                  ${escapeHtml(
                    status
                  )}

                  •

                  ✓ Verified IMD feed

                </div>

              </article>

            `;

          }
        )
        .join("");


  }

  catch (error) {

    console.error(
      "ARAN AI alert loading error:",
      error
    );


    el.innerHTML = `

      <p class="small">

        Unable to load official IMD alert feed.

      </p>

    `;

  }

}


/* =========================================================
   MAP ALERT MARKERS
========================================================= */

async function updateMapAlerts() {

  if (!aranMap) {
    return;
  }


  try {

    const response =
      await fetch(
        "/api/alerts?fresh=" +
        Date.now(),
        {
          cache:
            "no-store"
        }
      );


    if (!response.ok) {
      return;
    }


    const data =
      await response.json();


    const alerts =
      data.alerts || [];


    /* Remove old markers */

    alertMarkers.forEach(
      marker => {

        aranMap.removeLayer(
          marker
        );

      }
    );


    alertMarkers = [];


    /*
      Since the current IMD warning endpoint is
      Tamil Nadu / Puducherry subdivision-wide,
      we place a warning marker at the monitoring
      region rather than inventing a precise alert
      coordinate.
    */

    if (alerts.length > 0) {

      const strongest =
        alerts.find(
          a =>
            String(
              a.severity ||
              ""
            ).toUpperCase()
            === "HIGH"
        )
        ||
        alerts.find(
          a =>
            String(
              a.severity ||
              ""
            ).toUpperCase()
            === "MEDIUM"
        )
        ||
        alerts[0];


      const marker =
        L.circleMarker(
          [
            11.7480,
            79.7714
          ],
          {

            radius:
              11,

            color:
              "#ff4d67",

            weight:
              3,

            fillColor:
              "#ff4d67",

            fillOpacity:
              0.7

          }
        );


      marker.bindPopup(`

        <strong>
          IMD Warning
        </strong>

        <br><br>

        ${escapeHtml(
          strongest.hazard ||
          "Weather warning"
        )}

        <br>

        Severity:
        ${escapeHtml(
          strongest.severity ||
          "MEDIUM"
        )}

        <br>

        Tamil Nadu & Puducherry

        <br><br>

        <small>
          Verified source:
          India Meteorological Department
        </small>

      `);


      marker.addTo(
        aranMap
      );


      alertMarkers.push(
        marker
      );

    }

  }

  catch (error) {

    console.error(
      "Map alert error:",
      error
    );

  }

}


/* =========================================================
   CYCLONE MAP DATA
========================================================= */

async function updateMapCyclone() {

  if (!aranMap) {
    return;
  }


  try {

    const response =
      await fetch(
        "/api/cyclone?fresh=" +
        Date.now(),
        {
          cache:
            "no-store"
        }
      );


    if (!response.ok) {
      return;
    }


    const data =
      await response.json();


    /*
      Remove previous cyclone markers.
    */

    cycloneMarkers.forEach(
      marker => {

        aranMap.removeLayer(
          marker
        );

      }
    );


    cycloneMarkers = [];


    /*
      IMPORTANT:
      Do not invent cyclone coordinates.

      Only create a marker when the backend
      actually provides verified coordinates.
    */

    const latitude =
      Number(
        data.latitude ??
        data.lat
      );


    const longitude =
      Number(
        data.longitude ??
        data.lon ??
        data.lng
      );


    if (
      Number.isFinite(
        latitude
      )
      &&
      Number.isFinite(
        longitude
      )
    ) {


      const cycloneMarker =
        L.circleMarker(
          [
            latitude,
            longitude
          ],
          {

            radius:
              10,

            color:
              "#ff4d67",

            weight:
              3,

            fillColor:
              "#ff4d67",

            fillOpacity:
              0.75

          }
        );


      cycloneMarker.bindPopup(`

        <strong>
          Official IMD System
        </strong>

        <br><br>

        ${escapeHtml(
          data.name ||
          data.system_type ||
          "Weather system"
        )}

        <br>

        Source:
        India Meteorological Department

      `);


      cycloneMarker.addTo(
        aranMap
      );


      cycloneMarkers.push(
        cycloneMarker
      );

    }

  }

  catch (error) {

    console.error(
      "Cyclone map error:",
      error
    );

  }

}


/* =========================================================
   GEMINI ASSISTANT
========================================================= */

async function ask() {

  const input =
    document.getElementById(
      "question"
    );


  const output =
    document.getElementById(
      "answer"
    );


  if (
    !input ||
    !output
  ) {

    return;

  }


  const question =
    input.value.trim();


  if (!question) {
    return;
  }


  output.textContent =
    "ARAN AI is processing...";


  try {

    const response =
      await fetch(
        "/api/ask",
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({
              question:
                question
            })

        }
      );


    if (!response.ok) {

      throw new Error(
        "Assistant API failed"
      );

    }


    const data =
      await response.json();


    output.textContent =
      data.answer ||
      "No response received.";


  }

  catch (error) {

    console.error(
      "ARAN AI assistant error:",
      error
    );


    output.textContent =
      "Unable to connect to ARAN AI.";

  }

}


/* =========================================================
   ENTER KEY
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const input =
      document.getElementById(
        "question"
      );


    if (!input) {
      return;
    }


    input.addEventListener(
      "keydown",
      function(event) {

        if (
          event.key === "Enter"
        ) {

          event.preventDefault();

          ask();

        }

      }
    );

  }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async function() {

    /*
      Load alerts immediately.
    */

    await loadAlerts();


    /*
      Build real interactive map.
    */

    await initializeAranMap();

  }
);


/* =========================================================
   AUTO REFRESH
========================================================= */

setInterval(
  loadAlerts,
  60000
);


setInterval(
  updateMapAlerts,
  60000
);


setInterval(
  updateMapCyclone,
  60000
);
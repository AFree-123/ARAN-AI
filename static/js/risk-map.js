document.addEventListener("DOMContentLoaded", function () {

    console.log("ARAN AI Risk Map started");


    // =====================================================
    // 1. CREATE MAP
    // =====================================================

    const map = L.map("riskMap", {
        center: [11.1271, 79.7799],
        zoom: 7,
        zoomControl: true
    });


    // =====================================================
    // 2. SATELLITE BASE MAP
    // =====================================================

    const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            maxZoom: 19,
            attribution: "Tiles © Esri"
        }
    );

    satelliteLayer.addTo(map);


    // =====================================================
    // 3. STREET BASE MAP
    // =====================================================

    const streetLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors"
        }
    );


    // =====================================================
    // 4. GEE RAINFALL VARIABLE
    // =====================================================

    let rainfallLayer = null;
    let rainfallLoading = true;


    // =====================================================
    // 5. LOCATION DATA
    // =====================================================

    const locations = [

        {
            name: "Chennai",
            lat: 13.0827,
            lon: 80.2707
        },

        {
            name: "Cuddalore",
            lat: 11.7480,
            lon: 79.7714
        },

        {
            name: "Nagapattinam",
            lat: 10.7672,
            lon: 79.8449
        }

    ];


    // =====================================================
    // 6. LOCATION MARKERS
    // =====================================================

    const locationLayer = L.layerGroup();

    locations.forEach(function (location) {

        const marker = L.marker([
            location.lat,
            location.lon
        ]);

        marker.bindPopup(`
            <div style="font-family:Arial,sans-serif;">
                <strong style="font-size:14px;">
                    ${location.name}
                </strong>
                <br>
                <span style="font-size:12px;">
                    Coastal reference location
                </span>
            </div>
        `);

        locationLayer.addLayer(marker);

    });

    locationLayer.addTo(map);


    // =====================================================
    // 7. INFRASTRUCTURE REFERENCE LAYER
    // =====================================================

    const infrastructureLayer =
        L.layerGroup();

    locations.forEach(function (location) {

        const circle = L.circleMarker(
            [
                location.lat,
                location.lon
            ],
            {
                radius: 8,
                color: "#ffb020",
                weight: 2,
                fillColor: "#ff7a00",
                fillOpacity: 0.8
            }
        );

        circle.bindPopup(`
            <div style="font-family:Arial,sans-serif;">
                <strong>
                    ${location.name}
                </strong>
                <br>
                Coastal infrastructure reference zone
                <br><br>
                <small>
                    Prototype reference location.
                    Official infrastructure vulnerability
                    data is not connected yet.
                </small>
            </div>
        `);

        infrastructureLayer.addLayer(circle);

    });


    // =====================================================
    // 8. EMPTY CYCLONE TRACK LAYER
    // =====================================================

    const cycloneLayer =
        L.layerGroup();


    // =====================================================
    // 9. EMPTY SHELTER LAYER
    // =====================================================

    const shelterLayer =
        L.layerGroup();


    // =====================================================
    // 10. LOAD GEE RAINFALL
    // =====================================================

    async function loadRainfall() {

        console.log(
            "Connecting to Google Earth Engine..."
        );

        updateMapStatus(
            "Connecting to Google Earth Engine..."
        );


        try {

            const response = await fetch(
                "/api/risk-map/rainfall",
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "GEE API HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            console.log(
                "GEE rainfall response:",
                data
            );


            if (!data.tile_url) {

                throw new Error(
                    "GEE tile URL was not returned."
                );

            }


            // =================================================
            // CREATE GEE TILE LAYER
            // =================================================

            rainfallLayer = L.tileLayer(
                data.tile_url,
                {
                    opacity: 0.62,
                    maxZoom: 12,
                    attribution:
                        "Google Earth Engine • NASA GPM IMERG V07"
                }
            );


            // =================================================
            // ADD RAINFALL TO MAP
            // =================================================

            rainfallLayer.addTo(map);


            // =================================================
            // UPDATE STATUS
            // =================================================

            updateMapStatus(
                "GEE rainfall layer active • NASA GPM IMERG V07"
            );


            console.log(
                "GEE rainfall loaded successfully."
            );


            // Make checkbox ON

            const rainfallCheckbox =
                document.getElementById(
                    "rainfallLayer"
                );

            if (rainfallCheckbox) {
                rainfallCheckbox.checked = true;
            }


            // GEE loading completed

            rainfallLoading = false;


            // Enable rainfall button

            if (rainfallButton) {

                rainfallButton.disabled = false;

                rainfallButton.classList.add(
                    "active"
                );

            }


        } catch (error) {

            console.error(
                "GEE rainfall error:",
                error
            );


            updateMapStatus(
                "GEE rainfall layer unavailable"
            );


            const rainfallCheckbox =
                document.getElementById(
                    "rainfallLayer"
                );

            if (rainfallCheckbox) {
                rainfallCheckbox.checked = false;
            }


            rainfallLoading = false;


            // Enable button again so user can retry

            if (rainfallButton) {

                rainfallButton.disabled = false;

                rainfallButton.classList.remove(
                    "active"
                );

            }

        }

    }


    // =====================================================
    // 11. MAP STATUS
    // =====================================================

    function updateMapStatus(message) {

        const status =
            document.getElementById(
                "mapStatus"
            );

        if (status) {
            status.textContent = message;
        }

    }


    // =====================================================
    // 12. BASE MAP LAYER CONTROL
    // =====================================================

    const baseMaps = {

        "Satellite": satelliteLayer,

        "Street Map": streetLayer

    };


    L.control.layers(
        baseMaps,
        {},
        {
            collapsed: false
        }
    ).addTo(map);


    // =====================================================
    // 13. SCALE CONTROL
    // =====================================================

    L.control.scale({
        imperial: false
    }).addTo(map);


    // =====================================================
    // 14. RAINFALL CHECKBOX
    // =====================================================

    const rainfallCheckbox =
        document.getElementById(
            "rainfallLayer"
        );


    if (rainfallCheckbox) {

        rainfallCheckbox.addEventListener(
            "change",
            function () {

                // Do not allow interaction while loading

                if (
                    rainfallLoading ||
                    !rainfallLayer
                ) {

                    this.checked = false;

                    updateMapStatus(
                        "GEE rainfall layer is still loading..."
                    );

                    return;

                }


                if (this.checked) {

                    rainfallLayer.addTo(
                        map
                    );

                } else {

                    map.removeLayer(
                        rainfallLayer
                    );

                }

            }
        );

    }


    // =====================================================
    // 15. RAINFALL BUTTON
    // =====================================================

    const rainfallButton =
        document.getElementById(
            "rainfallBtn"
        );


    if (rainfallButton) {

        // Disable until GEE finishes loading

        rainfallButton.disabled = true;


        rainfallButton.addEventListener(
            "click",
            function () {

                if (
                    rainfallLoading ||
                    !rainfallLayer
                ) {

                    updateMapStatus(
                        "GEE rainfall layer is still loading..."
                    );

                    return;

                }


                if (
                    map.hasLayer(
                        rainfallLayer
                    )
                ) {

                    map.removeLayer(
                        rainfallLayer
                    );


                    if (rainfallCheckbox) {

                        rainfallCheckbox.checked =
                            false;

                    }


                    rainfallButton.classList.remove(
                        "active"
                    );

                } else {

                    rainfallLayer.addTo(
                        map
                    );


                    if (rainfallCheckbox) {

                        rainfallCheckbox.checked =
                            true;

                    }


                    rainfallButton.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    // =====================================================
    // 16. INFRASTRUCTURE CHECKBOX
    // =====================================================

    const infrastructureCheckbox =
        document.getElementById(
            "infrastructureLayer"
        );


    if (infrastructureCheckbox) {

        infrastructureCheckbox.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    infrastructureLayer.addTo(
                        map
                    );

                } else {

                    map.removeLayer(
                        infrastructureLayer
                    );

                }

            }
        );

    }


    // =====================================================
    // 17. INFRASTRUCTURE BUTTON
    // =====================================================

    const infrastructureButton =
        document.getElementById(
            "infraBtn"
        );


    if (infrastructureButton) {

        infrastructureButton.addEventListener(
            "click",
            function () {

                if (
                    map.hasLayer(
                        infrastructureLayer
                    )
                ) {

                    map.removeLayer(
                        infrastructureLayer
                    );


                    if (infrastructureCheckbox) {

                        infrastructureCheckbox.checked =
                            false;

                    }

                } else {

                    infrastructureLayer.addTo(
                        map
                    );


                    if (infrastructureCheckbox) {

                        infrastructureCheckbox.checked =
                            true;

                    }

                }

            }
        );

    }


    // =====================================================
    // 18. CYCLONE TRACK CHECKBOX
    // =====================================================

    const cycloneCheckbox =
        document.getElementById(
            "cycloneLayer"
        );


    if (cycloneCheckbox) {

        cycloneCheckbox.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    if (
                        cycloneLayer
                        .getLayers()
                        .length === 0
                    ) {

                        alert(
                            "Official cyclone track data is not connected yet."
                        );

                        this.checked = false;

                        return;

                    }


                    cycloneLayer.addTo(
                        map
                    );

                } else {

                    map.removeLayer(
                        cycloneLayer
                    );

                }

            }
        );

    }


    // =====================================================
    // 19. SHELTER CHECKBOX
    // =====================================================

    const shelterCheckbox =
        document.getElementById(
            "shelterLayer"
        );


    if (shelterCheckbox) {

        shelterCheckbox.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    if (
                        shelterLayer
                        .getLayers()
                        .length === 0
                    ) {

                        alert(
                            "Official evacuation shelter data is not connected yet."
                        );

                        this.checked = false;

                        return;

                    }


                    shelterLayer.addTo(
                        map
                    );

                } else {

                    map.removeLayer(
                        shelterLayer
                    );

                }

            }
        );

    }


    // =====================================================
    // 20. WIND BUTTON
    // =====================================================

    const windButton =
        document.getElementById(
            "windBtn"
        );


    if (windButton) {

        windButton.addEventListener(
            "click",
            function () {

                alert(
                    "Live wind data will be connected to the meteorological data source."
                );

            }
        );

    }


    // =====================================================
    // 21. STORM SURGE BUTTON
    // =====================================================

    const surgeButton =
        document.getElementById(
            "surgeBtn"
        );


    if (surgeButton) {

        surgeButton.addEventListener(
            "click",
            function () {

                alert(
                    "Storm surge simulation is not connected yet."
                );

            }
        );

    }


    // =====================================================
    // 22. STORM SURGE CHECKBOX
    // =====================================================

    const stormSurgeCheckbox =
        document.getElementById(
            "stormSurgeLayer"
        );


    if (stormSurgeCheckbox) {

        stormSurgeCheckbox.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    alert(
                        "Storm surge simulation is not connected yet."
                    );

                    this.checked = false;

                }

            }
        );

    }


    // =====================================================
    // 23. ELEVATION CHECKBOX
    // =====================================================

    const elevationCheckbox =
        document.getElementById(
            "elevationLayer"
        );


    if (elevationCheckbox) {

        elevationCheckbox.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    alert(
                        "Elevation layer is not connected yet."
                    );

                    this.checked = false;

                }

            }
        );

    }


    // =====================================================
    // 24. SATELLITE BUTTON
    // =====================================================

    const satelliteButton =
        document.getElementById(
            "satelliteBtn"
        );


    if (satelliteButton) {

        satelliteButton.addEventListener(
            "click",
            function () {

                if (
                    !map.hasLayer(
                        satelliteLayer
                    )
                ) {

                    map.addLayer(
                        satelliteLayer
                    );

                }


                if (
                    map.hasLayer(
                        streetLayer
                    )
                ) {

                    map.removeLayer(
                        streetLayer
                    );

                }


                satelliteButton.classList.add(
                    "active"
                );

            }
        );

    }


    // =====================================================
    // 25. REMOVE LOADING SCREEN IMMEDIATELY
    // =====================================================

    const loading =
        document.getElementById(
            "mapLoading"
        );


    if (loading) {

        /*
         * Do NOT wait for GEE.
         *
         * Map is already usable.
         * GEE rainfall loads separately.
         */

        loading.classList.add(
            "hidden"
        );

    }


    // =====================================================
    // 26. START GEE LOADING IN BACKGROUND
    // =====================================================

    loadRainfall();


    // =====================================================
    // 27. FINAL MAP RESIZE
    // =====================================================

    setTimeout(function () {

        map.invalidateSize();

    }, 500);


    console.log(
        "ARAN AI Risk Map ready."
    );

});
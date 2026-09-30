/* =========================================================
   ARAN AI — GLOBAL LANGUAGE SYSTEM
   English ↔ Tamil

   This file controls the common UI language across
   the complete ARAN AI application.

   Selected language is stored in localStorage so that
   changing pages does not reset the language.
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       LANGUAGE STATE
       ===================================================== */

    const STORAGE_KEY = "aranLanguage";

    let currentLanguage =
        localStorage.getItem(STORAGE_KEY) || "en";


    /* =====================================================
       TRANSLATION DICTIONARY
       ===================================================== */

    const translations = {

        en: {

            /* ---------- COMMON ---------- */

            dashboard: "Dashboard",
            liveAlerts: "Live Alerts",
            riskMap: "Risk Map",
            infrastructure: "Infrastructure",
            shelters: "Evacuation & Shelters",
            weather: "Weather & Forecast",
            news: "News Intelligence",
            assistant: "AI Assistant",
            insurance: "Insurance (Demo)",
            reports: "Reports",
            settings: "Settings",

            backDashboard: "← Dashboard",
            back: "Back",
            save: "Save",
            cancel: "Cancel",
            close: "Close",
            refresh: "Refresh",
            search: "Search",
            loading: "Loading...",
            connected: "CONNECTED",
            connecting: "CONNECTING",
            online: "Online",
            offline: "Offline",

            systemsOperational:
                "Systems operational",

            hackathonPrototype:
                "ARAN AI v1.0 • Hackathon Prototype",


            /* ---------- DASHBOARD ---------- */

            disasterResilience:
                "COASTAL DISASTER RESILIENCE",

            operationalDashboard:
                "Operational Dashboard",

            dashboardDescription:
                "AI-powered coastal disaster intelligence and early-warning decision support.",

            twentyFourHourRainfall:
                "24H RAINFALL",

            currentAlertLevel:
                "CURRENT ALERT LEVEL",

            activeUpcomingAlerts:
                "ACTIVE / UPCOMING ALERTS",

            parametricRisk:
                "PARAMETRIC RISK",

            satellite:
                "Satellite",

            rainfall:
                "Rainfall",

            street:
                "Street",

            wind:
                "Wind",

            liveDisasterIntelligence:
                "Live Disaster Intelligence",

            latestOfficialInformation:
                "Latest verified information from connected official sources.",

            currentWeather:
                "Current Weather",

            temperature:
                "Temperature",

            precipitation:
                "Precipitation",

            windSpeed:
                "Wind Speed",

            pressure:
                "Pressure",

            humidity:
                "Humidity",

            dataSource:
                "Data Source",

            lastUpdated:
                "Last Updated",

            noActiveSystem:
                "NO ACTIVE SYSTEM",

            monitorLatestOfficial:
                "Monitor the latest official advisory.",


            /* ---------- ALERTS ---------- */

            disasterAlerts:
                "Disaster Alerts",

            latestAlerts:
                "Latest Alerts",

            alertLevel:
                "Alert Level",

            severity:
                "Severity",

            location:
                "Location",

            source:
                "Source",

            time:
                "Time",

            timestamp:
                "Timestamp",

            verified:
                "VERIFIED",

            unverified:
                "UNVERIFIED",

            noActiveAlerts:
                "No active alerts",

            officialInformation:
                "Official information",


            /* ---------- RISK MAP ---------- */

            riskVisualization:
                "RISK VISUALIZATION",

            riskMapTitle:
                "Risk Map",

            rainfallRisk:
                "Rainfall Risk",

            hazard:
                "Hazard",

            riskLevel:
                "Risk Level",

            high:
                "HIGH",

            medium:
                "MEDIUM",

            low:
                "LOW",

            mapLoading:
                "Loading map...",

            rainfallLayer:
                "Rainfall Layer",

            layerUnavailable:
                "Layer unavailable",


            /* ---------- INFRASTRUCTURE ---------- */

            infrastructureTitle:
                "Infrastructure",

            infrastructureVulnerability:
                "Infrastructure Vulnerability",

            powerInfrastructure:
                "Power Infrastructure",

            criticalRoads:
                "Critical Roads",

            medicalFacilities:
                "Medical Facilities",

            exposure:
                "Exposure",

            vulnerability:
                "Vulnerability",

            status:
                "Status",

            prototypeData:
                "Prototype / Reference Data",


            /* ---------- SHELTERS ---------- */

            evacuationShelters:
                "Evacuation & Shelters",

            shelterAwareness:
                "Shelter Awareness",

            shelterName:
                "Shelter Name",

            capacity:
                "Capacity",

            preparedness:
                "Preparedness",

            referenceInformation:
                "Reference Information",

            officialShelter:
                "Official shelter information should be verified with local authorities.",


            /* ---------- WEATHER ---------- */

            weatherForecast:
                "Weather & Forecast",

            currentConditions:
                "Current Conditions",

            forecast:
                "Forecast",

            rainfallAmount:
                "Rainfall",

            windDirection:
                "Wind Direction",

            windGust:
                "Wind Gust",

            weatherUnavailable:
                "Weather information unavailable.",


            /* ---------- NEWS ---------- */

            disasterNewsIntelligence:
                "DISASTER NEWS INTELLIGENCE",

            newsIntelligence:
                "News Intelligence",

            relevantDisasterInformation:
                "Relevant disaster information only — with source, time, location and a simple explanation.",

            liveRelevantUpdates:
                "Live Relevant Updates",

            sourceRules:
                "Source Rules",

            prioritySources:
                "Priority Sources",

            grounding:
                "Grounding",

            noInventedWarnings:
                "No Invented Warnings",

            unverifiedInformation:
                "Unverified Information",

            continueMonitoring:
                "Continue monitoring official sources.",


            /* ---------- AI ASSISTANT ---------- */

            aiAssistant:
                "AI Assistant",

            askAran:
                "Ask ARAN AI",

            typeMessage:
                "Type your message...",

            send:
                "Send",

            listen:
                "Listen",

            stopListening:
                "Stop Listening",

            voiceInput:
                "Voice Input",

            thinking:
                "ARAN AI is thinking...",

            assistantUnavailable:
                "ARAN AI is temporarily unavailable.",


            /* ---------- INSURANCE ---------- */

            insuranceDemo:
                "Insurance (Demo)",

            parametricRiskSimulation:
                "Parametric Risk Simulation",

            triggerRainfall:
                "Trigger Rainfall",

            threshold:
                "Threshold",

            current:
                "Current",

            belowThreshold:
                "BELOW THRESHOLD",

            aboveThreshold:
                "ABOVE THRESHOLD",

            prototypeNotice:
                "This is a parametric risk decision-support simulation, not an insurance contract or payout.",


            /* ---------- REPORTS ---------- */

            reportsTitle:
                "Reports",

            currentAlerts:
                "Current Alerts",

            hazardInformation:
                "Hazard Information",

            infrastructureExposure:
                "Infrastructure Exposure",

            riskSummary:
                "Risk Summary",

            preparednessInformation:
                "Preparedness Information",

            generateReport:
                "Generate Report",


            /* ---------- SETTINGS ---------- */

            settingsTitle:
                "Settings",

            preferences:
                "Preferences",

            language:
                "Language",

            english:
                "English",

            tamil:
                "Tamil",

            notifications:
                "Notifications",

            notificationMode:
                "Notification Mode",

            account:
                "Account",

            logout:
                "Logout",

            saveChanges:
                "Save Changes"


        },


        /* =================================================
           TAMIL
           ================================================= */

        ta: {

            /* ---------- COMMON ---------- */

            dashboard:
                "டாஷ்போர்டு",

            liveAlerts:
                "நேரடி எச்சரிக்கைகள்",

            riskMap:
                "ஆபத்து வரைபடம்",

            infrastructure:
                "உள்கட்டமைப்பு",

            shelters:
                "வெளியேற்றம் & தங்குமிடங்கள்",

            weather:
                "வானிலை & முன்னறிவிப்பு",

            news:
                "செய்தி நுண்ணறிவு",

            assistant:
                "AI உதவியாளர்",

            insurance:
                "காப்பீடு (டெமோ)",

            reports:
                "அறிக்கைகள்",

            settings:
                "அமைப்புகள்",

            backDashboard:
                "← டாஷ்போர்டு",

            back:
                "பின்செல்",

            save:
                "சேமி",

            cancel:
                "ரத்துசெய்",

            close:
                "மூடு",

            refresh:
                "புதுப்பி",

            search:
                "தேடு",

            loading:
                "ஏற்றப்படுகிறது...",

            connected:
                "இணைக்கப்பட்டுள்ளது",

            connecting:
                "இணைக்கப்படுகிறது",

            online:
                "ஆன்லைன்",

            offline:
                "ஆஃப்லைன்",

            systemsOperational:
                "அனைத்து அமைப்புகளும் செயல்பாட்டில் உள்ளன",

            hackathonPrototype:
                "ARAN AI v1.0 • ஹேக்கத்தான் முன்மாதிரி",


            /* ---------- DASHBOARD ---------- */

            disasterResilience:
                "கடலோர பேரிடர் மீள்திறன்",

            operationalDashboard:
                "செயல்பாட்டு டாஷ்போர்டு",

            dashboardDescription:
                "AI அடிப்படையிலான கடலோர பேரிடர் நுண்ணறிவு மற்றும் முன் எச்சரிக்கை முடிவு ஆதரவு.",

            twentyFourHourRainfall:
                "24 மணி நேர மழைப்பொழிவு",

            currentAlertLevel:
                "தற்போதைய எச்சரிக்கை நிலை",

            activeUpcomingAlerts:
                "செயலில் / வரவிருக்கும் எச்சரிக்கைகள்",

            parametricRisk:
                "அளவுரு ஆபத்து",

            satellite:
                "செயற்கைக்கோள்",

            rainfall:
                "மழைப்பொழிவு",

            street:
                "சாலை",

            wind:
                "காற்று",

            liveDisasterIntelligence:
                "நேரடி பேரிடர் நுண்ணறிவு",

            latestOfficialInformation:
                "இணைக்கப்பட்ட அதிகாரப்பூர்வ ஆதாரங்களிலிருந்து சமீபத்திய சரிபார்க்கப்பட்ட தகவல்கள்.",

            currentWeather:
                "தற்போதைய வானிலை",

            temperature:
                "வெப்பநிலை",

            precipitation:
                "மழைப்பொழிவு",

            windSpeed:
                "காற்றின் வேகம்",

            pressure:
                "காற்றழுத்தம்",

            humidity:
                "ஈரப்பதம்",

            dataSource:
                "தரவு ஆதாரம்",

            lastUpdated:
                "கடைசியாக புதுப்பிக்கப்பட்டது",

            noActiveSystem:
                "செயலில் உள்ள அமைப்பு இல்லை",

            monitorLatestOfficial:
                "சமீபத்திய அதிகாரப்பூர்வ அறிவுறுத்தலைக் கண்காணிக்கவும்.",


            /* ---------- ALERTS ---------- */

            disasterAlerts:
                "பேரிடர் எச்சரிக்கைகள்",

            latestAlerts:
                "சமீபத்திய எச்சரிக்கைகள்",

            alertLevel:
                "எச்சரிக்கை நிலை",

            severity:
                "தீவிரத்தன்மை",

            location:
                "இடம்",

            source:
                "ஆதாரம்",

            time:
                "நேரம்",

            timestamp:
                "நேர முத்திரை",

            verified:
                "சரிபார்க்கப்பட்டது",

            unverified:
                "சரிபார்க்கப்படவில்லை",

            noActiveAlerts:
                "செயலில் உள்ள எச்சரிக்கைகள் இல்லை",

            officialInformation:
                "அதிகாரப்பூர்வ தகவல்",


            /* ---------- RISK MAP ---------- */

            riskVisualization:
                "ஆபத்து காட்சிப்படுத்தல்",

            riskMapTitle:
                "ஆபத்து வரைபடம்",

            rainfallRisk:
                "மழைப்பொழிவு ஆபத்து",

            hazard:
                "அபாயம்",

            riskLevel:
                "ஆபத்து நிலை",

            high:
                "அதிகம்",

            medium:
                "மிதமான",

            low:
                "குறைவு",

            mapLoading:
                "வரைபடம் ஏற்றப்படுகிறது...",

            rainfallLayer:
                "மழைப்பொழிவு அடுக்கு",

            layerUnavailable:
                "அடுக்கு கிடைக்கவில்லை",


            /* ---------- INFRASTRUCTURE ---------- */

            infrastructureTitle:
                "உள்கட்டமைப்பு",

            infrastructureVulnerability:
                "உள்கட்டமைப்பு பாதிப்பு",

            powerInfrastructure:
                "மின்சார உள்கட்டமைப்பு",

            criticalRoads:
                "முக்கிய சாலைகள்",

            medicalFacilities:
                "மருத்துவ வசதிகள்",

            exposure:
                "வெளிப்பாடு",

            vulnerability:
                "பாதிப்பு",

            status:
                "நிலை",

            prototypeData:
                "முன்மாதிரி / குறிப்பு தரவு",


            /* ---------- SHELTERS ---------- */

            evacuationShelters:
                "வெளியேற்றம் & தங்குமிடங்கள்",

            shelterAwareness:
                "தங்குமிட விழிப்புணர்வு",

            shelterName:
                "தங்குமிடத்தின் பெயர்",

            capacity:
                "கொள்ளளவு",

            preparedness:
                "தயார்நிலை",

            referenceInformation:
                "குறிப்பு தகவல்",

            officialShelter:
                "அதிகாரப்பூர்வ தங்குமிடத் தகவலை உள்ளூர் அதிகாரிகளிடம் சரிபார்க்க வேண்டும்.",


            /* ---------- WEATHER ---------- */

            weatherForecast:
                "வானிலை & முன்னறிவிப்பு",

            currentConditions:
                "தற்போதைய நிலை",

            forecast:
                "முன்னறிவிப்பு",

            rainfallAmount:
                "மழைப்பொழிவு",

            windDirection:
                "காற்றின் திசை",

            windGust:
                "காற்றின் அதிகபட்ச வேகம்",

            weatherUnavailable:
                "வானிலை தகவல் கிடைக்கவில்லை.",


            /* ---------- NEWS ---------- */

            disasterNewsIntelligence:
                "பேரிடர் செய்தி நுண்ணறிவு",

            newsIntelligence:
                "செய்தி நுண்ணறிவு",

            relevantDisasterInformation:
                "ஆதாரம், நேரம், இடம் மற்றும் எளிய விளக்கத்துடன் தொடர்புடைய பேரிடர் தகவல்கள் மட்டும்.",

            liveRelevantUpdates:
                "நேரடி தொடர்புடைய தகவல்கள்",

            sourceRules:
                "ஆதார விதிமுறைகள்",

            prioritySources:
                "முக்கிய ஆதாரங்கள்",

            grounding:
                "தகவல் அடிப்படை",

            noInventedWarnings:
                "கற்பனை செய்யப்பட்ட எச்சரிக்கைகள் இல்லை",

            unverifiedInformation:
                "சரிபார்க்கப்படாத தகவல்",

            continueMonitoring:
                "அதிகாரப்பூர்வ ஆதாரங்களை தொடர்ந்து கண்காணிக்கவும்.",


            /* ---------- AI ASSISTANT ---------- */

            aiAssistant:
                "AI உதவியாளர்",

            askAran:
                "ARAN AI-யிடம் கேளுங்கள்",

            typeMessage:
                "உங்கள் செய்தியை உள்ளிடுங்கள்...",

            send:
                "அனுப்பு",

            listen:
                "கேள்",

            stopListening:
                "கேட்பதை நிறுத்து",

            voiceInput:
                "குரல் உள்ளீடு",

            thinking:
                "ARAN AI யோசிக்கிறது...",

            assistantUnavailable:
                "ARAN AI தற்போது கிடைக்கவில்லை.",


            /* ---------- INSURANCE ---------- */

            insuranceDemo:
                "காப்பீடு (டெமோ)",

            parametricRiskSimulation:
                "அளவுரு ஆபத்து உருவகப்படுத்தல்",

            triggerRainfall:
                "தூண்டுதல் மழைப்பொழிவு",

            threshold:
                "வரம்பு",

            current:
                "தற்போதைய",

            belowThreshold:
                "வரம்புக்குக் கீழ்",

            aboveThreshold:
                "வரம்புக்கு மேல்",

            prototypeNotice:
                "இது ஒரு அளவுரு ஆபத்து முடிவு-ஆதரவு உருவகப்படுத்தல் மட்டுமே; இது காப்பீட்டு ஒப்பந்தமோ பணம் செலுத்தும் தீர்மானமோ அல்ல.",


            /* ---------- REPORTS ---------- */

            reportsTitle:
                "அறிக்கைகள்",

            currentAlerts:
                "தற்போதைய எச்சரிக்கைகள்",

            hazardInformation:
                "அபாய தகவல்",

            infrastructureExposure:
                "உள்கட்டமைப்பு வெளிப்பாடு",

            riskSummary:
                "ஆபத்து சுருக்கம்",

            preparednessInformation:
                "தயார்நிலை தகவல்",

            generateReport:
                "அறிக்கையை உருவாக்கு",


            /* ---------- SETTINGS ---------- */

            settingsTitle:
                "அமைப்புகள்",

            preferences:
                "விருப்பங்கள்",

            language:
                "மொழி",

            english:
                "ஆங்கிலம்",

            tamil:
                "தமிழ்",

            notifications:
                "அறிவிப்புகள்",

            notificationMode:
                "அறிவிப்பு முறை",

            account:
                "கணக்கு",

            logout:
                "வெளியேறு",

            saveChanges:
                "மாற்றங்களைச் சேமி"

        }

    };


    /* =====================================================
       GET CURRENT LANGUAGE
       ===================================================== */

    window.aranGetLanguage = function () {

        return currentLanguage;

    };


    /* =====================================================
       SET LANGUAGE
       ===================================================== */

    window.aranSetLanguage = function (language) {

        if (
            language !== "en" &&
            language !== "ta"
        ) {

            language = "en";

        }


        currentLanguage =
            language;


        localStorage.setItem(
            STORAGE_KEY,
            language
        );


        applyTranslations();


        /*
         * Notify other page scripts.
         */

        window.dispatchEvent(
            new CustomEvent(
                "aran-language-changed",
                {
                    detail: {
                        language:
                            currentLanguage
                    }
                }
            )
        );

    };


    /* =====================================================
       TRANSLATE KEY
       ===================================================== */

    window.aranT = function (key) {

        return (
            translations[currentLanguage]?.[key] ??
            translations.en?.[key] ??
            key
        );

    };


    /* =====================================================
       APPLY [data-i18n]
       ===================================================== */

    function applyTranslations() {

        /*
         * Text content
         *
         * Example:
         *
         * <span data-i18n="dashboard">
         *     Dashboard
         * </span>
         */

        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach(
                element => {

                    const key =
                        element.dataset.i18n;


                    if (
                        translations[
                            currentLanguage
                        ] &&
                        translations[
                            currentLanguage
                        ][key]
                    ) {

                        element.textContent =
                            translations[
                                currentLanguage
                            ][key];

                    }

                }
            );


        /*
         * Placeholder translation
         */

        document
            .querySelectorAll(
                "[data-i18n-placeholder]"
            )
            .forEach(
                element => {

                    const key =
                        element.dataset
                            .i18nPlaceholder;


                    if (
                        translations[
                            currentLanguage
                        ] &&
                        translations[
                            currentLanguage
                        ][key]
                    ) {

                        element.placeholder =
                            translations[
                                currentLanguage
                            ][key];

                    }

                }
            );


        /*
         * Title / tooltip translation
         */

        document
            .querySelectorAll(
                "[data-i18n-title]"
            )
            .forEach(
                element => {

                    const key =
                        element.dataset
                            .i18nTitle;


                    if (
                        translations[
                            currentLanguage
                        ] &&
                        translations[
                            currentLanguage
                        ][key]
                    ) {

                        element.title =
                            translations[
                                currentLanguage
                            ][key];

                    }

                }
            );


        /*
         * Language buttons
         */

        document
            .querySelectorAll(
                "[data-language-toggle]"
            )
            .forEach(
                button => {

                    button.textContent =
                        currentLanguage === "en"
                            ? "EN / தமிழ்"
                            : "தமிழ் / EN";

                }
            );


        /*
         * Update HTML language
         */

        document.documentElement.lang =
            currentLanguage === "ta"
                ? "ta"
                : "en";

    }


    /* =====================================================
       GLOBAL LANGUAGE BUTTON
       ===================================================== */

    function setupLanguageButtons() {

        document
            .querySelectorAll(
                "[data-language-toggle]"
            )
            .forEach(
                button => {

                    /*
                     * Avoid duplicate listeners
                     */

                    if (
                        button.dataset
                            .aranLanguageReady === "true"
                    ) {

                        return;

                    }


                    button.dataset
                        .aranLanguageReady =
                        "true";


                    button.addEventListener(
                        "click",
                        function () {

                            const nextLanguage =
                                currentLanguage === "en"
                                    ? "ta"
                                    : "en";


                            window.aranSetLanguage(
                                nextLanguage
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       AUTO TRANSLATE COMMON SIDEBAR
       ===================================================== */

    function translateSidebar() {

        const sidebarLinks = {

            "/dashboard":
                "dashboard",

            "/live-alerts":
                "liveAlerts",

            "/risk-map":
                "riskMap",

            "/infrastructure":
                "infrastructure",

            "/shelters":
                "shelters",

            "/weather":
                "weather",

            "/news":
                "news",

            "/assistant":
                "assistant",

            "/insurance":
                "insurance",

            "/reports":
                "reports",

            "/settings":
                "settings"

        };


        document
            .querySelectorAll(
                ".sidebar .nav a"
            )
            .forEach(
                link => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    const key =
                        sidebarLinks[href];


                    if (!key) {

                        return;

                    }


                    /*
                     * Preserve icons/emoji already
                     * present before the text.
                     */

                    const icon =
                        link.querySelector(
                            "span"
                        );


                    if (icon) {

                        link.innerHTML =
                            icon.outerHTML +
                            " " +
                            window.aranT(
                                key
                            );

                    }

                    else {

                        /*
                         * Remove only common leading
                         * emoji/icon characters.
                         */

                        const text =
                            window.aranT(
                                key
                            );


                        const first =
                            link.textContent
                                .trim()
                                .charAt(0);


                        const hasEmoji =
                            /[^\u0000-\u007F]/.test(
                                first
                            );


                        link.textContent =
                            hasEmoji
                                ? first +
                                  " " +
                                  text
                                : text;

                    }

                }
            );

    }
    autoTranslateExistingText()
    setupExistingLanguageButtons()

    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

    applyTranslations();

    setupLanguageButtons();

    translateSidebar();

    autoTranslateExistingText();

    setupExistingLanguageButtons();

}


    /*
     * DOM ready
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    }

    else {

        initialize();

    }


    /*
     * Re-apply when dynamic UI is added.
     */

    window.addEventListener(
        "aran-language-changed",
        function () {

            applyTranslations();

            translateSidebar();

        }
    );


    /* =====================================================
       EXPOSE TRANSLATION DICTIONARY
       ===================================================== */

    window.ARAN_TRANSLATIONS =
        translations;

    /* =====================================================
       AUTO TRANSLATE EXISTING PAGE TEXT
       ===================================================== */

    function autoTranslateExistingText() {

        const active =
            translations[currentLanguage];

        const english =
            translations.en;

        const tamil =
            translations.ta;


        /*
         * Build English -> Tamil map
         */

        const englishToTamil = {};

        Object.keys(english).forEach(function (key) {

            if (
                english[key] &&
                tamil[key]
            ) {

                englishToTamil[
                    english[key]
                ] = tamil[key];

            }

        });


        /*
         * Build Tamil -> English map
         */

        const tamilToEnglish = {};

        Object.keys(tamil).forEach(function (key) {

            if (
                tamil[key] &&
                english[key]
            ) {

                tamilToEnglish[
                    tamil[key]
                ] = english[key];

            }

        });


        /*
         * Scan visible text nodes.
         */

        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {

                        /*
                         * Ignore script/style content.
                         */

                        const parent =
                            node.parentElement;

                        if (!parent) {

                            return NodeFilter.FILTER_REJECT;

                        }


                        const tag =
                            parent.tagName;

                        if (
                            tag === "SCRIPT" ||
                            tag === "STYLE" ||
                            tag === "NOSCRIPT"
                        ) {

                            return NodeFilter.FILTER_REJECT;

                        }


                        /*
                         * Ignore empty text.
                         */

                        if (
                            !node.nodeValue.trim()
                        ) {

                            return NodeFilter.FILTER_REJECT;

                        }


                        return NodeFilter.FILTER_ACCEPT;

                    }
                }
            );


        const nodes = [];

        let node;

        while (
            (node = walker.nextNode())
        ) {

            nodes.push(node);

        }


        nodes.forEach(function (textNode) {

            const original =
                textNode.nodeValue;

            const trimmed =
                original.trim();


            /*
             * Exact English -> Tamil
             */

            if (
                currentLanguage === "ta" &&
                englishToTamil[trimmed]
            ) {

                textNode.nodeValue =
                    original.replace(
                        trimmed,
                        englishToTamil[trimmed]
                    );

                return;

            }


            /*
             * Exact Tamil -> English
             */

            if (
                currentLanguage === "en" &&
                tamilToEnglish[trimmed]
            ) {

                textNode.nodeValue =
                    original.replace(
                        trimmed,
                        tamilToEnglish[trimmed]
                    );

            }

        });


        /*
         * Translate placeholders
         */

        document
            .querySelectorAll("input, textarea")
            .forEach(function (element) {

                const placeholder =
                    element.getAttribute(
                        "placeholder"
                    );

                if (!placeholder) {
                    return;
                }


                if (
                    currentLanguage === "ta" &&
                    englishToTamil[placeholder]
                ) {

                    element.placeholder =
                        englishToTamil[placeholder];

                }

                else if (
                    currentLanguage === "en" &&
                    tamilToEnglish[placeholder]
                ) {

                    element.placeholder =
                        tamilToEnglish[placeholder];

                }

            });

    }


    /* =====================================================
       AUTO-DETECT LANGUAGE BUTTON
       ===================================================== */

    function setupExistingLanguageButtons() {

        document
            .querySelectorAll("button, .pill, .module-btn")
            .forEach(function (element) {

                const text =
                    element.textContent.trim();


                if (
                    text === "EN / தமிழ்" ||
                    text === "தமிழ் / EN"
                ) {

                    if (
                        element.dataset
                            .aranLanguageReady === "true"
                    ) {

                        return;

                    }


                    element.dataset
                        .aranLanguageReady =
                        "true";


                    element.style.cursor =
                        "pointer";


                    element.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();


                            const next =
                                currentLanguage === "en"
                                    ? "ta"
                                    : "en";


                            window.aranSetLanguage(
                                next
                            );

                        }
                    );

                }

            });

    }


    /* =====================================================
       UPDATE INITIALIZATION
       ===================================================== */

    const originalInitialize =
        initialize;


    initialize = function () {

        originalInitialize();

        autoTranslateExistingText();

        setupExistingLanguageButtons();

    };


    /*
     * Re-translate when language changes.
     */

    window.addEventListener(
        "aran-language-changed",
        function () {

            setTimeout(
                function () {

                    autoTranslateExistingText();

                    setupExistingLanguageButtons();

                },
                50
            );

        }
    );       

}());
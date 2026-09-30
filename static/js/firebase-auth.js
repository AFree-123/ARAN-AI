import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAFTpC3tbJWfTMcS1_HwyXFuUG6hquNYlU",
    authDomain: "aran-ai-bac02.firebaseapp.com",
    projectId: "aran-ai-bac02",
    storageBucket: "aran-ai-bac02.appspot.com",
    messagingSenderId: "74612680755",
    appId: "1:74612680755:web:b007b03d292eb84645db46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

window.firebaseLogin = async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.href = "/dashboard";

    } catch (error) {

        console.error(error);

        if (error.code === "auth/invalid-credential") {
            alert("Invalid email or password.");
        } else {
            alert(error.message);
        }
    }
};


window.firebaseGoogleLogin = async function () {

    try {

        await signInWithPopup(
            auth,
            googleProvider
        );

        window.location.href = "/dashboard";

    } catch (error) {

        console.error(error);

        alert("Google login failed: " + error.message);
    }
};


window.firebaseSignup = async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Enter email and password.");
        return;
    }

    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Account created successfully!");

        window.location.href = "/dashboard";

    } catch (error) {

        console.error(error);

        alert(error.message);
    }
};
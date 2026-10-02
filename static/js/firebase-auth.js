// ============================================================
// ARAN AI - Firebase Authentication
// Firebase JS SDK v12.3.0
// ============================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyAFTpC3tbJWfTMcS1_HwyXFuUG6hquNYlU",
    authDomain: "aran-ai-bac02.firebaseapp.com",
    projectId: "aran-ai-bac02",
    storageBucket: "aran-ai-bac02.firebasestorage.app",
    messagingSenderId: "74612680755",
    appId: "1:74612680755:web:b007b03d292eb84645db46",
    measurementId: "G-D65KC6J69R"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// ============================================================
// MESSAGE DISPLAY
// ============================================================

function showMessage(message, type = "error") {

    const messageBox = document.getElementById("firebaseAuthMessage");

    if (!messageBox) {
        console.log(message);
        return;
    }

    messageBox.textContent = message;
    messageBox.style.display = "block";

    if (type === "success") {
        messageBox.style.color = "#4ade80";
        messageBox.style.background = "rgba(34,197,94,0.10)";
        messageBox.style.border = "1px solid rgba(34,197,94,0.25)";
    } else {
        messageBox.style.color = "#f87171";
        messageBox.style.background = "rgba(239,68,68,0.10)";
        messageBox.style.border = "1px solid rgba(239,68,68,0.25)";
    }
}


// ============================================================
// CLEAR MESSAGE
// ============================================================

function clearMessage() {

    const messageBox = document.getElementById("firebaseAuthMessage");

    if (!messageBox) return;

    messageBox.textContent = "";
    messageBox.style.display = "none";
}


// ============================================================
// FIREBASE ERROR HANDLER
// ============================================================

function getFirebaseErrorMessage(error) {

    console.error("Firebase Error:", error);

    switch (error.code) {

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/email-already-in-use":
            return "An account already exists with this email.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/password-does-not-meet-requirements":
            return "Please use a stronger password.";

        case "auth/popup-closed-by-user":
            return "Google sign-in was cancelled.";

        case "auth/popup-blocked":
            return "Popup was blocked by your browser. Please allow popups.";

        case "auth/cancelled-popup-request":
            return "Google sign-in request was cancelled.";

        case "auth/unauthorized-domain":
            return "This domain is not authorized in Firebase Authentication.";

        case "auth/api-key-not-valid":
            return "Firebase API key is invalid. Please check the Firebase Web App configuration.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        default:
            return error.message || "Authentication failed. Please try again.";
    }
}


// ============================================================
// LOGIN WITH EMAIL + PASSWORD
// ============================================================

window.firebaseLogin = async function () {

    clearMessage();

    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if (!emailElement || !passwordElement) {
        console.error("Login fields not found.");
        return;
    }

    const email = emailElement.value.trim();
    const password = passwordElement.value;

    if (!email) {
        showMessage("Please enter your email.");
        return;
    }

    if (!password) {
        showMessage("Please enter your password.");
        return;
    }

    try {

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Login successful:", result.user);

        showMessage(
            "Login successful. Redirecting...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 700);

    } catch (error) {

        showMessage(
            getFirebaseErrorMessage(error)
        );
    }
};


// ============================================================
// GOOGLE LOGIN
// ============================================================

window.firebaseGoogleLogin = async function () {

    clearMessage();

    try {

        const result = await signInWithPopup(
            auth,
            googleProvider
        );

        console.log(
            "Google login successful:",
            result.user
        );

        showMessage(
            "Google login successful. Redirecting...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 700);

    } catch (error) {

        showMessage(
            getFirebaseErrorMessage(error)
        );
    }
};


// ============================================================
// REGISTER
// ============================================================

window.firebaseRegister = async function () {

    clearMessage();

    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");
    const confirmPasswordElement =
        document.getElementById("confirmPassword");

    if (
        !nameElement ||
        !emailElement ||
        !passwordElement ||
        !confirmPasswordElement
    ) {
        console.error("Registration fields not found.");
        return;
    }

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value;
    const confirmPassword =
        confirmPasswordElement.value;


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!name) {
        showMessage("Please enter your full name.");
        return;
    }

    if (!email) {
        showMessage("Please enter your email.");
        return;
    }

    if (!password) {
        showMessage("Please enter a password.");
        return;
    }

    if (password.length < 6) {
        showMessage(
            "Password must be at least 6 characters."
        );
        return;
    }

    if (password !== confirmPassword) {
        showMessage(
            "Passwords do not match."
        );
        return;
    }


    // --------------------------------------------------------
    // CREATE FIREBASE ACCOUNT
    // --------------------------------------------------------

    try {

        const result =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        // ----------------------------------------------------
        // SAVE DISPLAY NAME
        // ----------------------------------------------------

        await updateProfile(
            result.user,
            {
                displayName: name
            }
        );


        console.log(
            "Registration successful:",
            result.user
        );


        showMessage(
            "Account created successfully. Redirecting...",
            "success"
        );


        // ----------------------------------------------------
        // REDIRECT
        // ----------------------------------------------------

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 800);


    } catch (error) {

        showMessage(
            getFirebaseErrorMessage(error)
        );
    }
};


// ============================================================
// SIGNUP ALIAS
// ============================================================

window.firebaseSignup =
    window.firebaseRegister;


// ============================================================
// FORGOT PASSWORD
// ============================================================

window.firebaseForgotPassword = async function () {

    clearMessage();

    const emailElement =
        document.getElementById("email");

    if (!emailElement) {
        showMessage(
            "Please enter your email address."
        );
        return;
    }

    const email =
        emailElement.value.trim();


    if (!email) {
        showMessage(
            "Enter your email first, then click Forgot Password."
        );
        return;
    }


    try {

        await sendPasswordResetEmail(
            auth,
            email
        );

        showMessage(
            "Password reset email sent. Please check your inbox.",
            "success"
        );

    } catch (error) {

        showMessage(
            getFirebaseErrorMessage(error)
        );
    }
};


// ============================================================
// LOGOUT
// ============================================================

window.firebaseLogout = async function () {

    try {

        await signOut(auth);

        console.log(
            "User logged out successfully."
        );

        window.location.href = "/";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
};


// ============================================================
// AUTH STATE LISTENER
// ============================================================

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "Authenticated user:",
                {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }
            );

        } else {

            console.log(
                "No authenticated user."
            );
        }
    }
);


// ============================================================
// OPTIONAL DASHBOARD PROTECTION
// ============================================================

window.requireFirebaseAuth = function () {

    return new Promise((resolve) => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                (user) => {

                    unsubscribe();

                    if (!user) {

                        window.location.href = "/";

                        resolve(false);

                        return;
                    }

                    resolve(user);
                }
            );
    });
};


// ============================================================
// EXPORT AUTH INSTANCE
// ============================================================

window.firebaseAuth = auth;

console.log(
    "ARAN AI Firebase Authentication initialized."
);
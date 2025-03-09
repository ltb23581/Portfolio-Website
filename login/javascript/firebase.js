import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

// Initialize Firebase with your Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "https://portfolio-1-2f172-default-rtdb.firebaseio.com/",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    if (loginButton) {
        loginButton.addEventListener("click", login); 
    }

    if (registerButton) {
        registerButton.addEventListener("click", register); 
    }
});

// Register user function
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validate_username(username) || !validate_password(password)) {
        alert('Username or password format is incorrect. Try again!');
        return;
    }

    const userData = { username: username, password: password };
    const database_ref = ref(database, 'users/' + username);
    set(database_ref, userData)
        .then(() => {
            alert('User Created!');
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login function
function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validate_username(username) || !validate_password(password)) {
        alert('Username or password format is incorrect. Try again!');
        return;
    }

    const database_ref = ref(database, 'users/' + username);
    get(database_ref).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password) {
                // Redirect to desktop folder's desktop.html
                window.location.href = "/login/loadingScreen.html";
            } else {
                alert('Incorrect password. Try again!');
            }
        } else {
            alert('User not found. Please register first!');
        }
    }).catch((error) => {
        alert(error.message);
    });
}


// Validation functions
function validate_username(username) {
    return username.length >= 3;
}

function validate_password(password) {
    return password.length >= 6;
}


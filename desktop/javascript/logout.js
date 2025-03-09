document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", logout); 
    }
});

// Logout function to redirect to logout.html
function logout() {
    window.location.href = './logout.html'; // Redirect to logout.html
}

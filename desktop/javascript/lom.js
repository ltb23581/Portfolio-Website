document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const lomPopupOverlay = document.querySelector(".lom-popup-overlay");
    const lomPlayGameButton = document.querySelector(".play-LOM");
    const lomClosePopupButton = document.querySelector(".lom-close-popup");
    const gameIframe = document.getElementById("lom-game-iframe");

    // Function to show the popup and start the game
    function showLomPopup() {
      if (lomPopupOverlay && gameIframe) {
        lomPopupOverlay.style.display = "flex"; // Display popup as a flex container
        gameIframe.src = "/desktop/LOM game/index.html"; // Set the game URL when popup is shown
      }
    }

    // Function to hide the popup and stop the game (by resetting the iframe src)
    function hideLomPopup() {
      if (lomPopupOverlay && gameIframe) {
        lomPopupOverlay.style.display = "none"; // Hide popup
        gameIframe.src = ""; // Reset the iframe src to stop the game
      }
    }

    // Event listener for Play Game button
    if (lomPlayGameButton) {
      lomPlayGameButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        showLomPopup(); // Show popup and start the game
      });
    }

    // Event listener for close button
    if (lomClosePopupButton) {
      lomClosePopupButton.addEventListener("click", hideLomPopup);
    }

    // Close popup if user clicks outside the popup content
    if (lomPopupOverlay) {
      lomPopupOverlay.addEventListener("click", (e) => {
        if (e.target === lomPopupOverlay) {
          hideLomPopup();
        }
      });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const lomPopupOverlay = document.querySelector(".lom-popup-overlay");
    const lomPlayGameButton = document.querySelector(".play-LOM");
    const lomClosePopupButton = document.querySelector(".lom-close-popup");
    const gameIframe = document.getElementById("lom-game-iframe");

    // Function to show the popup and start the game
    function showLomPopup() {
      if (lomPopupOverlay && gameIframe) {
        lomPopupOverlay.style.display = "flex"; 
        gameIframe.src = "/desktop/lom/index.html"; 
      }
    }

    // Function to hide the popup and stop the game
    function hideLomPopup() {
      if (lomPopupOverlay && gameIframe) {
        lomPopupOverlay.style.display = "none"; 
        gameIframe.src = ""; 
      }
    }

    // Event listener for Play Game button
    if (lomPlayGameButton) {
      lomPlayGameButton.addEventListener("click", (e) => {
        e.preventDefault(); 
        showLomPopup(); // Show popup and start the game
      });
    }

    if (lomClosePopupButton) {
      lomClosePopupButton.addEventListener("click", hideLomPopup);
    }

    if (lomPopupOverlay) {
      lomPopupOverlay.addEventListener("click", (e) => {
        if (e.target === lomPopupOverlay) {
          hideLomPopup();
        }
      });
    }
});

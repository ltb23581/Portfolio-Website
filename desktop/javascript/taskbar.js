document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  // Web popup
  const webIcon = document.querySelector(".web");
  const webPopup = document.getElementById("webPopup");
  const closeWebPopup = document.getElementById("closeWebPopup");

  // File popup
  const fileIcon = document.querySelector(".file");
  const filePopup = document.getElementById("filePopup");
  const closeFilePopup = document.getElementById("closeFilePopup");

  // Tunes popup
  const tunesIcon = document.querySelector(".music");
  const tunesPopup = document.getElementById("tunesPopup");
  const closeTunesPopup = document.getElementById("closeTunesPopup");

  // Open web popup when the web icon is clicked
  if (webIcon && webPopup) {
    webIcon.addEventListener("click", () => {
      webPopup.style.display = "flex";
      toggleHighlightTaskbarIcon(webIcon, webPopup);
      bringToFront(webPopup); // Bring webPopup to front
    });

    // Close web popup when close button is clicked
    if (closeWebPopup) {
      closeWebPopup.addEventListener("click", () => {
        webPopup.style.display = "none";
        toggleHighlightTaskbarIcon(webIcon, webPopup);
      });
    }
  }

  // Open file popup when the file icon is clicked
  if (fileIcon && filePopup) {
    fileIcon.addEventListener("click", () => {
      filePopup.style.display = "flex";
      toggleHighlightTaskbarIcon(fileIcon, filePopup);
      bringToFront(filePopup); // Bring filePopup to front
    });

    // Close file popup when close button is clicked
    if (closeFilePopup) {
      closeFilePopup.addEventListener("click", () => {
        filePopup.style.display = "none";
        toggleHighlightTaskbarIcon(fileIcon, filePopup);
      });
    }

    makeDraggable(filePopup);
  }

  // Open tunes popup when the tunes icon is clicked
  if (tunesIcon && tunesPopup) {
    tunesIcon.addEventListener("click", () => {
      tunesPopup.style.display = "flex";
      toggleHighlightTaskbarIcon(tunesIcon, tunesPopup);
      bringToFront(tunesPopup); // Bring webPopup to front
    });

    // Close tunes popup when close button is clicked
    if (closeTunesPopup) {
      closeTunesPopup.addEventListener("click", () => {
        tunesPopup.style.display = "none";
        toggleHighlightTaskbarIcon(tunesIcon, tunesPopup);
      });
    }
  }
});

// Function to highlight opened application(s)
function toggleHighlightTaskbarIcon(icon, popup) {
  if (popup.style.display === "flex") {
    icon.classList.add("highlighted");
  } else {
    icon.classList.remove("highlighted");
  }
}

// Function to bring a popup to the front
// TODO: FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function bringToFront(popup) {
  const allPopups = document.querySelectorAll(".popup");
  allPopups.forEach((p) => {
    p.style.zIndex = 1;
  });
  popup.style.zIndex = 10;
}

$(document).ready(function () {
  $("#filePopup .popup-content").draggable({
    handle: ".top",
    containment: "body",
  });
});

// Function to handle logout
function logout(event) {
  event.preventDefault();
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "/index.html";
}

// Function to make a popup draggable
function makeDraggable(popup) {
  const header = popup.querySelector(".top");

  if (header) {
    let isDragging = false;
    let offsetX, offsetY;

    // Mouse down event on the header to start dragging
    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - popup.getBoundingClientRect().left;
      offsetY = e.clientY - popup.getBoundingClientRect().top;
    });

    // Mouse move event to drag the popup
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
      }
    });

    // Mouse up event to stop dragging
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }
}

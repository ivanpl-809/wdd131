function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('active');
}

const yearSpan = document.getElementById("currentyear");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

function openLink() {
    window.open('https://www.youtube.com/@LavenderGlowBeats', '_blank');
}

function playVideo(videoId) {
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
}
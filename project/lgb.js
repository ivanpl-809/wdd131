const tracks = [
    {
        title: "Lonely Lane",
        description: "A gripping coastal thriller...",
        file: "music/Lonely Lane.mp3"
    },
    {
        title: "Midnight Raindrops",
        description: "A mind-bending psychological thriller...",
        file: "music/Midnight Raindrops.mp3"
    },
    {
        title: "Rainy Road",
        description: "A suspenseful noir-inspired thriller...",
        file: "music/Rain on the Road.mp3"
    },
    {
        title: "Snow Flakes",
        description: "An enthralling mystery under the sea...",
        file: "music/Snow Flakes.mp3"
    },
];

let currentTrackIndex = 0; 
const audio = new Audio(tracks[currentTrackIndex].file); 
const playPauseButton = document.querySelector('.play-pause'); 
const nextButton = document.querySelector('.next'); 
const prevButton = document.querySelector('.prev'); 
const progressBar = document.querySelector('.progress'); 
const trackCards = document.querySelectorAll('.track-card'); 
const carousel = document.querySelector('.carousel'); 


const updateTrackDisplay = () => {
    trackCards.forEach((card, index) => {
        card.classList.remove('active'); 
        if (index === currentTrackIndex) {
            card.classList.add('active'); 
            card.querySelector('h2').textContent = tracks[currentTrackIndex].title;
            card.querySelector('p').textContent = tracks[currentTrackIndex].description; 
        }
    });

    const offset = -currentTrackIndex * 100; 
    carousel.style.transform = `translateX(${offset}%)`; 
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; 
};

const updateProgress = () => {
    const progress = (audio.currentTime / audio.duration) * 100; 
    progressBar.value = progress; 
    document.querySelector('.progress-time').textContent = formatTime(audio.currentTime); 
};

const playTrack = () => {
    audio.src = tracks[currentTrackIndex].file; 
    audio.play(); 
    updateTrackDisplay(); 
    playPauseButton.textContent = '||'; 
};

audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; 
    playTrack(); 
});

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        playTrack(); 
    } else {
        audio.pause(); 
        playPauseButton.textContent = '▶'; 
    }
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; 
    playTrack(); 
});

prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; 
    playTrack(); 
});

audio.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration; 
    audio.currentTime = seekTime; 
});

progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect(); 
    const offsetX = event.clientX - rect.left; 
    const progressWidth = rect.width; 
    const clickPercent = offsetX / progressWidth; 
    const newTime = clickPercent * audio.duration; 
    audio.currentTime = newTime; 
});

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('active');
}

const yearSpan = document.getElementById("currentyear");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

window.onload = () => {
    playTrack();
};

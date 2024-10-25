function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('active');
}
// Track data
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

let currentTrackIndex = 0; // Track index
const audio = new Audio(tracks[currentTrackIndex].file); // Create audio object
const playPauseButton = document.querySelector('.play-pause'); // Play/Pause button
const nextButton = document.querySelector('.next'); // Next button
const prevButton = document.querySelector('.prev'); // Previous button
const progressBar = document.querySelector('.progress'); // Progress bar
const trackCards = document.querySelectorAll('.track-card'); // Track cards
const carousel = document.querySelector('.carousel'); // Carousel container

// Function to update the active track card
const updateTrackDisplay = () => {
    trackCards.forEach((card, index) => {
        card.classList.remove('active'); // Remove active class
        if (index === currentTrackIndex) {
            card.classList.add('active'); // Add active class to current track
            card.querySelector('h2').textContent = tracks[currentTrackIndex].title; // Update title
            card.querySelector('p').textContent = tracks[currentTrackIndex].description; // Update description
        }
    });

    // Move the carousel to show the active card
    const offset = -currentTrackIndex * 100; // Calculate offset for sliding effect
    carousel.style.transform = `translateX(${offset}%)`; // Move carousel
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format with leading zero for seconds
};

// Function to update progress bar and time display
const updateProgress = () => {
    const progress = (audio.currentTime / audio.duration) * 100; // Calculate progress percentage
    progressBar.value = progress; // Update progress bar value
    document.querySelector('.progress-time').textContent = formatTime(audio.currentTime); // Update displayed time
};


// Event listener for play/pause button
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '||'; // Change to pause icon
    } else {
        audio.pause();
        playPauseButton.textContent = '▶'; // Change to play icon
    }
});

// Event listener for next button
nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Move to next track
    audio.src = tracks[currentTrackIndex].file; // Update audio source
    audio.play(); // Play new track
    updateTrackDisplay(); // Update track display
    playPauseButton.textContent = '||'; // Set to pause icon
});

// Event listener for previous button
prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Move to previous track
    audio.src = tracks[currentTrackIndex].file; // Update audio source
    audio.play(); // Play new track
    updateTrackDisplay(); // Update track display
    playPauseButton.textContent = '||'; // Set to pause icon
});

// Event listener for audio time update to update progress bar
audio.addEventListener('timeupdate', updateProgress);

// Event listener for progress bar change to seek track
// Event listener for progress bar change to seek track
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration; // Calculate seek time
    audio.currentTime = seekTime; // Update current time of audio
});

// Event listener for mouse click on the progress bar to update playback time
progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect(); // Get the bounding rectangle of the progress bar
    const offsetX = event.clientX - rect.left; // Get the click position relative to the bar
    const progressWidth = rect.width; // Get the width of the progress bar
    const clickPercent = offsetX / progressWidth; // Calculate the percentage clicked
    const newTime = clickPercent * audio.duration; // Calculate the new time
    audio.currentTime = newTime; // Update the current time of audio
});


// Initialize track display on page load
updateTrackDisplay(); // Show the initial track

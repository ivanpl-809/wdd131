// Track data
const tracks = [
    {
        title: "Abyss of Deceptions",
        description: "A gripping coastal thriller...",
        file: "path/to/your/track1.mp3"
    },
    {
        title: "The Midnight Enigma",
        description: "A mind-bending psychological thriller...",
        file: "path/to/your/track2.mp3"
    },
    {
        title: "Shadows of Deceit",
        description: "A suspenseful noir-inspired thriller...",
        file: "path/to/your/track3.mp3"
    },
    {
        title: "Mystery of the Deep",
        description: "An enthralling mystery under the sea...",
        file: "path/to/your/track4.mp3"
    },
    {
        title: "Echoes of the Past",
        description: "A thrilling journey through forgotten history...",
        file: "path/to/your/track5.mp3"
    }
];

let currentTrackIndex = 0; // Track index
const audio = new Audio(tracks[currentTrackIndex].file); // Create audio object
const playPauseButton = document.querySelector('.play-pause'); // Play/Pause button
const nextButton = document.querySelector('.next'); // Next button
const prevButton = document.querySelector('.prev'); // Previous button
const progressBar = document.querySelector('.progress'); // Progress bar
const trackCards = document.querySelectorAll('.track-card'); // Track cards

// Function to update the active track card
const updateTrackDisplay = () => {
    trackCards.forEach((card, index) => {
        card.classList.remove('active'); // Remove active class from all
        if (index === currentTrackIndex) {
            card.classList.add('active'); // Add active class to the current track
            card.querySelector('h2').textContent = tracks[currentTrackIndex].title; // Update title
            card.querySelector('p').textContent = tracks[currentTrackIndex].description; // Update description
        }
    });
};

// Function to update progress bar
const updateProgress = () => {
    const progress = (audio.currentTime / audio.duration) * 100; // Calculate progress percentage
    progressBar.value = progress; // Update progress bar value
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
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration; // Calculate seek time
    audio.currentTime = seekTime; // Update current time of audio
});

// Event listener for audio end to move to next track automatically
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Move to next track
    audio.src = tracks[currentTrackIndex].file; // Update audio source
    audio.play(); // Play new track
    updateTrackDisplay(); // Update track display
    playPauseButton.textContent = '||'; // Set to pause icon
});

// Initialize track display on page load
updateTrackDisplay();

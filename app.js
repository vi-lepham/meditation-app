const playBtn = document.querySelector('.play');
const audio = document.querySelector('audio');
const video = document.querySelector('video');
const timer = document.querySelector('.timer');
let fakeDuration = 600;

// UI class
class UI {
    static changeAudioBg(theme) {
        video.style.display = 'block';
        audio.src = `${theme.dataset.sound}`;
        video.src = `${theme.dataset.video}`;
    }
    static checkPlaying(audio) {
        if (audio.paused) {
            audio.play();
            playBtn.src = './svg/pause.svg';
            video.play();
        } else {
            audio.pause();
            playBtn.src = './svg/play.svg';
            video.pause();
        }
    }
    static timeDisplay(option) {
        fakeDuration = option.dataset.time;
        const timer = document.querySelector('.timer');
        let minutes = Math.floor(fakeDuration / 60);
        let seconds = Math.floor(fakeDuration % 60);
        if (minutes < 10) {
            minutes = `0${Math.floor(fakeDuration / 60)}`
        }
        if (seconds < 10) {
            seconds = `0${Math.floor(fakeDuration % 60)}`
        }
        timer.textContent = `${minutes}:${seconds}`;
    }
    static audioTimeUpdate(option) {
        audio.ontimeupdate = () => {
            const outline = document.querySelector('.moving-outline circle');
            const outlineLength = outline.getTotalLength();

            // Set outline stroke dasharray
            outline.style.strokeDasharray = outlineLength;

            // Calculate time progress
            fakeDuration = option.dataset.time;
            let currentTime = audio.currentTime;
            let elapsed = fakeDuration - currentTime;
            let minutes = Math.floor(elapsed / 60);
            let seconds = Math.floor(elapsed % 60);
            if (minutes < 10) {
                minutes = `0${Math.floor(elapsed / 60)}`
            }
            if (seconds < 10) {
                seconds = `0${Math.floor(elapsed % 60)}`
            }
            timer.textContent = `${minutes}:${seconds}`;


            let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
            outline.style.strokeDasharray = progress;
            
        }
    } 
}

// Event listener for theme buttons
const themes = document.querySelectorAll('.theme button');
themes.forEach(theme => {
    theme.addEventListener('click', () => {
        // Change audio and BG
        UI.changeAudioBg(theme)
        console.log(theme.dataset.sound)
    })
})

// Event listener for play button
playBtn.addEventListener('click', () => {
    // Play audio and video 
    UI.checkPlaying(audio);
    
})

// Event listener for time buttons
const timeBtns = document.querySelectorAll ('.time')
timeBtns.forEach(option => {
    option.addEventListener('click', () => {
        // Display time
        let minutes = Math.floor(fakeDuration / 60);
        let seconds = Math.floor(fakeDuration % 60);
        if (minutes < 10) {
            minutes = `0${Math.floor(fakeDuration / 60)}`
        }
        if (seconds < 10) {
            seconds = `0${Math.floor(fakeDuration % 60)}`
        }
        timer.textContent = `${minutes}:${seconds}`;
        
        // Countdown
        UI.timeDisplay(option);
        // Animate circle progress bar
        UI.audioTimeUpdate(option);
    })
})

const content = document.querySelector('.content');
const sounds = document.querySelectorAll('.theme button');

const playBtn = document.querySelector('.play');
const audio = document.querySelector('audio');
const video = document.querySelector('video');
const outline = document.querySelector('.moving-outline circle');
const outlineLength = outline.getTotalLength();

const timeBtn = document.querySelectorAll('.time-btn button');
const timer = document.querySelector('.timer');
let fakeDuration = 600;

// Change bachground and audio theme
sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      audio.src = this.dataset.sound;
      video.src = this.dataset.video;
      checkPlaying(audio);
    });
  });

// Play pause button
playBtn.addEventListener('click', () => {
    checkPlaying(audio);
});

// Play pause audio function
const checkPlaying = (audio) => {
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

// Set timer

// Get outline length


outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
timer.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;


// Animate the outline
audio.ontimeupdate = function() {
    let currentTime = audio.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elasped / 60);
    timer.textContent = `${minutes}:${seconds}`;
    console.log(elapsed);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
};


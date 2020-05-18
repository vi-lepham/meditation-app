const app = () => {
    const content = document.querySelector('.content');
    const rainBtn = document.querySelector('.rain');
    const beachBtn = document.querySelector('.beach');
    const rainVid = document.querySelector('#rain-vid');
    const beachVid = document.querySelector('#beach-vid');
    const song = document.querySelector('.song');
    const sounds = document.querySelectorAll(".sound-picker button");
    const outline = document.querySelector(".moving-outline circle");
    const outlineLength = outline.getTotalLength();
    const timeBtn = document.querySelectorAll(".time-btn button");
    const timer = document.querySelector('.timer');

    // click theme buttons to change bg to video
    rainBtn.addEventListener('click', () => {
        content.style.background = 'rgba(250, 140, 127, 0.363)';
        rainVid.style.display = 'block';
        beachVid.style.display = 'none';
    });
    beachBtn.addEventListener('click', () => {
        content.style.background = 'rgba(250, 140, 127, 0.363)';
        beachVid.style.display = 'block';
        rainVid.style.display = 'none';
    });








    //click play to start interval + start audio 
};

app();
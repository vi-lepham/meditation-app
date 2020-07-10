const app = () => {
    const playBtn = document.querySelector('.play');
    const audio = document.querySelector('audio');
    const video = document.querySelector('video');
    const timer = document.querySelector('.timer');
    let duration;
    
    const outline = document.querySelector('.moving-outline circle');
    const outlineLength = outline.getTotalLength();
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

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
            // Set duration to be option's time attribute
            duration = option.dataset.time;

            // Calculate minutes and seconds
            let minutes = Math.floor(duration / 60);
            let seconds = Math.floor(duration % 60);

            // Add 0 if minute/second value is less than 10
            if (minutes < 10) {
                minutes = `0${Math.floor(duration / 60)}`
            }
            if (seconds < 10) {
                seconds = `0${Math.floor(duration % 60)}`
            }

            // Display time
            timer.textContent = `${minutes}:${seconds}`;
        }
        static selectedButton(option) {
            // Change button color to indicate clicked
            option.classList.add('active')
            // Remove class if another button is clicked
            const active = document.querySelectorAll('.active');
            const activeArray = Array.from(active);
            // Remove class from buttons that are not selected
            if (activeArray.length > 1) {
                let inactiveArray = activeArray.filter(activeBtn => activeBtn.innerHTML !== option.innerHTML);
                inactiveArray.map(button => button.classList.remove('active'));
            }
        }
        static audioTimeUpdate(option) {
            audio.ontimeupdate = () => {

                // Calculate elapsed time
                duration = option.dataset.time;
                let currentTime = audio.currentTime;
                let elapsed = duration - currentTime;
                let minutes = Math.floor(elapsed / 60);
                let seconds = Math.floor(elapsed % 60);

                // Add 0 if minute/second value is less than 10
                if (minutes < 10) {
                    minutes = `0${Math.floor(elapsed / 60)}`
                }
                if (seconds < 10) {
                    seconds = `0${Math.floor(elapsed % 60)}`
                }

                // Update time display
                timer.textContent = `${minutes}:${seconds}`;

                // Animate progress bar
                let progress = (elapsed / duration) * outlineLength;
                outline.style.strokeDashoffset = progress;
                
                // Stop audio and video when elapsed time end
                if (elapsed = 0) {
                    audio.pause();
                    video.pause();
                }
            }
        } 
        static addCustomTime(input) {
            const timeList = document.querySelector('.time-btn');
            
            // Create new time button
            const newTimeButton = document.createElement('button');
            newTimeButton.className = 'time';
            newTimeButton.innerHTML = `${input} Min`
            
            // Calculate duration attribute
            const duration = input * 60;
            newTimeButton.setAttribute('data-time', duration)
            
            // Append new button to list
            timeList.insertBefore(newTimeButton, document.querySelector('.custom-time'));
        }
    }

    // Event listener for theme buttons
    const themes = document.querySelectorAll('.theme button');
    themes.forEach(theme => {
        theme.addEventListener('click', () => {
            // Change audio and BG
            UI.changeAudioBg(theme)
        })
    })

    // Event listener for play button
    playBtn.addEventListener('click', () => {
        // Play audio and video 
        UI.checkPlaying(audio);
        
    })

    // Event listener for custom time button
    const customTime = document.querySelector('.custom-time')
    customTime.addEventListener('click', () => {
        customTime.classList.toggle('open');
        document.querySelector('.custom-time-modal').classList.toggle('open');
    })

    // Event listener for custom time form submission
    const customTimeForm = document.querySelector('form');
    const timeInput = document.getElementById('time');
    customTimeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!timeInput.value) {
            const errorMessage = document.querySelector('.error')
            errorMessage.innerHTML = 'Please input your custom time';
            setTimeout(() => {
                errorMessage.innerHTML = '';
            }, 3000)
        }

        // Add new custom time button
        UI.addCustomTime(timeInput.value);
        // Clear input field
        timeInput.value = '';
        // Close modal
        document.querySelector('.custom-time-modal').classList.remove('open');

    })

    // Handle time button click function
    const handleTimeButtons = (option) => {
        // Indicate selected button
        UI.selectedButton(option)
        // Display time
        UI.timeDisplay(option);
        // Animate progress bar & countdown
        UI.audioTimeUpdate(option);
    }

    // Event listener for time buttons
    const timeBtns = document.querySelectorAll('.time')
    timeBtns.forEach(option => {
        option.addEventListener('click', (e) => handleTimeButtons(e.target))
    })

    // Observe added nodes to timeBtns
    const observer = new MutationObserver(mutations => {
        mutations.forEach(record => {
            record.addedNodes.forEach(button => {
                button.addEventListener('click', (e) => handleTimeButtons(e.target))
            })
        })
    })
    const timeList = document.querySelector('.time-btn')
    observer.observe(timeList, {
        childList: true
    })
    
}

app();

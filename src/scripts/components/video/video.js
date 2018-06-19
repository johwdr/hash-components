'use strict';



export default class Video {
    constructor(el, pauseAll) {
        console.log()
        this.el = el;
        this.pauseAll = pauseAll;
        this.build(el);
    }
    pause() {
        this.video.pause();
        this.video.currentTime = 0;
        this.play.classList.remove('video-component-button-playing');

    }
    build(el) {
        this.video = document.createElement('video');
        const mp4Src = document.createElement('source');
        mp4Src.src = el.dataset.videoFile;
        mp4Src.type = "video/mp4";

        this.play = document.createElement('a');
        this.play.innerHTML = `
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 119 119" style="enable-background:new 0 0 119 119;" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:#5DCE38;}
                    .st1{fill:#FFFFFF;}
                </style>
                <g>
                    <circle class="st0" cx="59.3" cy="59.1" r="59.2"/>
                    <polygon class="st1" points="48.2,33.8 82,59.1 48.2,84.4 	"/>
                </g>
            </svg>`;
        this.play.href ="#";
        this.play.classList.add('video-component-button')
        this.play.addEventListener('click', (e) => {
            e.preventDefault();
            this.pauseAll();
            this.play.classList.add('video-component-button-playing');
            this.video.play();
        })
        this.video.addEventListener('ended', (e) => {
            this.play.classList.remove('video-component-button-playing');
        } )
        this.video.appendChild(mp4Src);
        el.appendChild(this.video);
        el.appendChild(this.play);
    }


}
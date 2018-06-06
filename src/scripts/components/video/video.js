'use strict';



export default class Video {
    constructor(el) {
        console.log()
        this.el = el;
        this.build(el);
    }

    build(el) {
        this.video = document.createElement('video');
        const mp4Src = document.createElement('source');
        console.log(el.dataset)
        mp4Src.src = el.dataset.videoFile;
        mp4Src.type = "video/mp4";

        this.play = document.createElement('a');
        this.play.href ="#";
        this.play.classList.add('video-component-button')
        this.play.addEventListener('click', (e) => {
            e.preventDefault();
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
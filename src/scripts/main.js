require('../styles/styles.scss');
require('intersection-observer');

import AnimatedTypography from './components/animated-typography/animated-typography';
import Video from './components/video/video';
import HashComponent from './components/hash-component/hash-component';
import IntersectionClass from './components/intersection-class/intersection-class';
import Parallax from './components/parallax/parallax';



class Weedipedia {

     constructor() {


        new AnimatedTypography('[data-hash-component] h2');



        this.els = document.querySelectorAll('[data-hash-component]');
        this.components = [];
        this.videos = [];


        for(let n=0; n<this.els.length; n++) {
            const component = new HashComponent(this.els[n]);
            this.components.push(component);

        }

        this.intersector = new IntersectionClass('[data-hash-component]');
        new  Parallax(this.intersector);


        this.videosEls = document.querySelectorAll('[data-hash-video]');
        for(let n=0; n<this.videosEls.length; n++) {

            const component = new Video(this.videosEls[n]);
            this.videos.push(component);

        }
    }

}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        new Weedipedia();
    });
} else {
    new Weedipedia();
}


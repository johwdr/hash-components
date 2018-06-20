require('../styles/nouislider.scss');
require('../styles/slider.scss');

require('../styles/styles.scss');

require('intersection-observer');

import AnimatedTypography from './components/animated-typography/animated-typography';
import Video from './components/video/video';
import HashComponent from './components/hash-component/hash-component';
import IntersectionClass from './components/intersection-class/intersection-class';
//import Parallax from './components/parallax/parallax';
import SurveySlider from './components/survey-slider/survey-slider';
import QuestionBool from './components/question-bool/question-bool';
import SimplePie from './components/simple-pie/simple-pie';



class Weedipedia {

     constructor() {


        new AnimatedTypography('[data-hash-component] h2');



        this.els = document.querySelectorAll('[data-hash-component]');
        this.components = [];
        this.videos = [];
        this.questionBools = [];


        for(let n=0; n<this.els.length; n++) {
            const component = new HashComponent(this.els[n]);
            this.components.push(component);

        }

        this.intersector = new IntersectionClass('[data-hash-component]');

        // Done this way to keep lexical this
        this.pauseAll = () => {
            for(let n=0; n<this.videos.length; n++) {
                this.videos[n].pause();
            }
        }

        this.videosEls = document.querySelectorAll('[data-hash-video]');
        for(let n=0; n<this.videosEls.length; n++) {

            const component = new Video(this.videosEls[n], this.pauseAll);
            this.videos.push(component);

        }

        const slider = new SurveySlider();

        this.boolEls = document.querySelectorAll('[data-question-bool]');
        for(let n=0; n<this.boolEls.length; n++) {

            const component = new QuestionBool(this.boolEls[n]);
            this.questionBools.push(component);

        }
        this.pies = [];
        this.pieEls = document.querySelectorAll('[data-hash-pie]');
        for(let n=0; n<this.pieEls.length; n++) {
            const settings = [
                { percent: 0.45, color: '#5dce38' },
                { percent: 0.55, color: '#488429' },
              ];
            const component = new SimplePie(this.pieEls[n], settings);
            this.pies.push(component);

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


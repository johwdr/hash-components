require('../styles/styles.scss');
require('intersection-observer');

import AnimatedTypography from './components/animated-typography/animated-typography';
import HashComponent from './components/hash-component/hash-component';
import IntersectionClass from './components/intersection-class/intersection-class';



class Weedipedia {

     constructor() {


        new AnimatedTypography('[data-hash-component] h2');



        this.els = document.querySelectorAll('[data-hash-component]');
        this.components = [];


        for(let n=0; n<this.els.length; n++) {
            const component = new HashComponent(this.els[n]);
            this.components.push(component);

        }

        new IntersectionClass('[data-hash-component]');
    }

}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        new Weedipedia();
    });
} else {
    new Weedipedia();
}


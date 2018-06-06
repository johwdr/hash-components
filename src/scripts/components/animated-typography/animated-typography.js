'use strict';



export default class AnimatedTypography {
    constructor(selector) {
        this.selector = selector;
        this.build(selector);
    }

    build(selector) {
        const els = document.querySelectorAll(selector);
        for(let n=0; n<els.length; n++) {
            const el = els[n];
            el.classList.add('text-animation');
            el.classList.add(`text-cycle-${n%3}`)

        }
    }


}
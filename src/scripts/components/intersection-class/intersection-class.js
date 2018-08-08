'use strict';

require('intersection-observer');



export default class IntersectionClass {
    constructor(selector) {

        this.els = document.querySelectorAll(selector + ' h2')
        this.intersectingEls = [];
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
          }
        var observer = new IntersectionObserver((entries, observer) => {
            this.intersectionCallback(entries, observer)
        }, options);


        for (let n = 0; n< this.els.length; n++) {
            observer.observe(this.els[n]);
        }
    }


    intersectionCallback(entries, observer) {

        for (let n=0; n < entries.length; n++) {
            const entry = entries[n];
            if (entry.isIntersecting) {
                entry.target.classList.add('intersecting')
                this.intersectingEls.push(entry.target)
            } else {
                entry.target.classList.remove('intersecting')
                const index = this.intersectingEls.indexOf(entry.target);
                if (index > -1) {
                    this.intersectingEls.splice(index, 1);
                }

            }
        }

    }


}
'use strict';





export default class IntersectionClass {
    constructor(selector) {

        this.els = document.querySelectorAll(selector + ' h2')

        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
          }
        var observer = new IntersectionObserver((entries, observer) => {
            this.intersectionCallback(entries, observer)
        }, options);



        this.els.forEach(element => {
            observer.observe(element);
        });
    }


    intersectionCallback(entries, observer) {

        for (let n=0; n < entries.length; n++) {
            const entry = entries[n];
            if (entry.isIntersecting) {
                entry.target.classList.add('intersecting')
            } else {
                entry.target.classList.remove('intersecting')
            }
        }

    }


}
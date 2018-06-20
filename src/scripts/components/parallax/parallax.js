'use strict';



export default class Parallax {
    constructor(intersections) {

        setInterval(() => {
            for (let n=0; n<intersections.intersectingEls.length;n++){
                const el = intersections.intersectingEls[n];
                const top = el.getBoundingClientRect().top;

                //const factor = Math.round(window.innerHeight/ top)
                const factor = (top * 0.005).toFixed(2);
                //console.log(factor);
                if (factor > 0) {
                    window.requestAnimationFrame(() => {
                        el.style.transform = 'translateY(' + factor +'vh)';
                    })
                }


            }
        }, 100)
    }



}
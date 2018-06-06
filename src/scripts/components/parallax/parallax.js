'use strict';



export default class Parallax {
    constructor(intersections) {

        setInterval(() => {
            for (let n=0; n<intersections.intersectingEls.length;n++){
                const el = intersections.intersectingEls[n];
                const top = el.getBoundingClientRect().top;

                //const factor = Math.round(window.innerHeight/ top)
                const factor = Math.round(top *0.12)
                if (factor > 0 && factor < 200) {
                    window.requestAnimationFrame(() => {
                        el.style.transform = 'translateY(' + factor +'px)';
                    })
                }


            }
        }, 100)
    }



}
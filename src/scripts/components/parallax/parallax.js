'use strict';



export default class Parallax {
    constructor(intersections) {

        setInterval(() => {
            for (let n=0; n<intersections.intersectingEls.length;n++){
                const el = intersections.intersectingEls[n];
                const top = el.getBoundingClientRect().top - (window.innerWidth * 0.05);;

                //const factor = Math.round(window.innerHeight/ top)
                const factor = Math.round((top *0.02));
                console.log(factor);
                if (factor > 0 && factor < 100) {
                    window.requestAnimationFrame(() => {
                        el.style.transform = 'translateY(' + factor +'vh)';
                    })
                }


            }
        }, 100)
    }



}
'use strict';



export default class SimplePie {
    constructor(el, settings) {
        this.el = el;
        this.settings = settings || JSON.parse(el.dataset.settings);
        this.cumulativePercent = 0;
        this.build();

    }

    build() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("viewBox","-1 -1 2 2");
        this.svg.style.transform="rotate(-90deg)";
        this.el.appendChild(this.svg);
        this.settings.forEach(slice => {
            // destructuring assignment sets the two variables at once
            const [startX, startY] = this.getCoordinatesForPercent(this.cumulativePercent);

            // each slice starts where the last slice ended, so keep a cumulative percent
            this.cumulativePercent += slice.percent;

            const [endX, endY] = this.getCoordinatesForPercent(this.cumulativePercent);

            // if the slice is more than 50%, take the large arc (the long way around)
            const largeArcFlag = slice.percent > .5 ? 1 : 0;

              // create an array and join it just for code readability
            const pathData = [
              `M ${startX} ${startY}`, // Move
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
              `L 0 0`, // Line
            ].join(' ');

            // create a <path> and append it to the <svg> element
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathData);
            pathEl.setAttribute('fill', slice.color);
            this.svg.appendChild(pathEl);
        });



    }
    getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }
}

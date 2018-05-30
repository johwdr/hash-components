'use strict';

import {create, select, fetchFile} from '../../utils/trix-utils';




export default class HashComponent {
    constructor(el) {

        console.log(el);

        this.config = el.dataset;
        this.componentEl = el;
        this.contents = el.innerHTML;
        el.innerHTML = '';

        this.build();
    }

    build() {
        this.outerWrapper = document.createElement('div');
        this.outerWrapper.classList.add('hash-component-outer-wrapper')
        this.outerWrapper.style.backgroundColor = this.config.outerBg || null;
        this.outerWrapper.style.backgroundImage = this.config.outerBgFile ? "url('" + this.config.outerBgFile + "')" : null;


        this.innerWrapper = document.createElement('div');
        this.innerWrapper.classList.add('hash-component-inner-wrapper')
        this.innerWrapper.style.backgroundColor = this.config.innerBg || null;
        this.innerWrapper.style.color = this.config.headerColor || null;

        this.componentEl.appendChild(this.outerWrapper);
        this.outerWrapper.appendChild(this.innerWrapper);

        this.innerWrapper.innerHTML = this.contents;

    }



}
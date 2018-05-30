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
            this.restructureElementDom(el);
        }
    }
    restructureElementDom(el) {
        let newContent = '';
        const initialText = el.innerText;

        for (let n = 0; n<initialText.length; n++) {
            newContent += `<span class="letter-animated letter-no-${n} letter-${(initialText[n]=== ' ') ? 'whitespace' : initialText[n] } letter-cycle-${n%5}">${initialText[n]}</span>`;
        }
        el.innerHTML = newContent;
    }


}
'use strict';


export default class QuestionBool{
    constructor(el){
        this.el = el;
        this.answers = JSON.parse(this.el.dataset.answers);
        this.wrapper = el.querySelector('[data-question-bool-question]');
        this.answerElement = el.querySelector('[data-question-bool-answer]');
        this.init(el);
    }
    init(el) {

        this.buildQuestion();
        console.log(el)

    }
    buildQuestion() {
        this.buttons = [];
        for (let n=0; n<this.answers.length; n++) {
            const button = document.createElement('button');
            button.classList.add('bool-question-button')
            button.dataset.answerID = n;
            button.innerText = this.answers[n];
            button.addEventListener('click', (event) => {
                this.pickAnswer(event);
            })
            this.buttons.push(button);
            this.wrapper.appendChild(button);
        }
    }
    pickAnswer(event) {
        console.log(event);
        this.answerElement.classList.add('shown');
        this.wrapper.classList.add('hidden');

    }
}
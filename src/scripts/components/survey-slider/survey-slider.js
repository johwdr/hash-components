'use strict';

import {select, selectAll, create, normalize} from '../../utils/trix-utils.js';
import nouislider from 'nouislider';
import 'gsap/TweenLite';
import 'gsap/CSSPlugin';

export default class SurveySlider{
    constructor(){
        this.init();
    }
    init() {
        // console.log('init', 0 - (-40));
        let wrappers = selectAll('[data-survey-slider]:not(.initialised)');

        for (var i = 0; i < wrappers.length; ++i) {
            //console.log('d', i);
            const wrapper = wrappers[i];

            wrapper.classList.add('initialised');

            const innercontainer = create('div', wrapper, 'dr-survey-inner-container');

            const question = wrapper.dataset.question;
            const precision = (wrapper.dataset.resultprecision === undefined) ? 0 : parseInt(wrapper.dataset.resultprecision);
            const feedback = wrapper.dataset.feedback;
            let imagewrapper;
            const min = parseFloat(wrapper.dataset.min);
            const max = parseFloat(wrapper.dataset.max);
            const unit = wrapper.dataset.unit;
            const step = (wrapper.dataset.step === null) ? 0 : parseFloat(wrapper.dataset.step);
            const defaultstart = min + ((max-min)/2);
            const start = (wrapper.dataset.start === null || wrapper.dataset.start === undefined || wrapper.dataset.start === '') ? defaultstart : parseFloat(wrapper.dataset.start);
            const answer = parseFloat(wrapper.dataset.answer);
            let valueShown = false;
            const isInt = wrapper.getAttribute('data-is-int') ? true : false;
            const source = (wrapper.dataset.source === null || wrapper.dataset.source === undefined) ? '' : wrapper.dataset.source;

            const color = (wrapper.dataset.color === null || wrapper.dataset.color === undefined) ? 'default' : wrapper.dataset.color;

            const refImage = (wrapper.dataset.referenceimage === null || wrapper.dataset.referenceimage === undefined) ? false : wrapper.dataset.referenceimage;

            // console.log('is int: ', isInt);
            let guess;

            const questionwrapper = create('div', innercontainer, 'dr-survey-question-container');
            questionwrapper.innerHTML = question;

            const valuewrapper = create('div', innercontainer, 'dr-survey-value-container');
            valuewrapper.classList.add('non-initialized');

            const resultanswer = create('div', valuewrapper, 'result-answer');
            const resultguess = create('div', valuewrapper, 'result-guess');
            const sliderwrapper = create('div', innercontainer, 'dr-survey-slider-container');

           //const answertrack = create('div', sliderwrapper, 'dr-survey-answer-track');

            const config = {
                behaviour: 'tap-drag',
                step: step,
                animate: true,
                animationDuration: 800,
                start: start,
                range: {
                    min: min,
                    max: max
                }
            }

            const minmark = create('div', sliderwrapper, 'dr-survey-slider-minmark');
            minmark.innerHTML = formatNumber(min, isInt, unit);
            const maxmark = create('div', sliderwrapper, 'dr-survey-slider-maxmark');
            maxmark.innerHTML = formatNumber(max, isInt, unit);

            const slider = nouislider.create(sliderwrapper, config);
            let sliderActive = true;

            sliderwrapper.noUiSlider.on('update', (values, handle) => {
                guess = !isInt ? parseFloat(values[handle]).toFixed(precision) : parseInt(values[handle]);
                if (sliderActive){
                    resultguess.innerHTML = formatNumber(guess, isInt, unit);
                    positionGuess(values[handle]);
                }
            });

            sliderwrapper.noUiSlider.on('slide', (values, handle) => {
                if (!valueShown) {
                    valueShown = true;
                    valuewrapper.classList.remove('non-initialized');
                    button.classList.add('fadable');
                    button.classList.remove('disabled');
                    button.enabled = true;
                    hideStartValues();
                }
            });
            const handle = select(".noUi-handle", sliderwrapper);

            const button = create('button', innercontainer, ['dr-survey-submit-button', 'disabled']);
            button.innerHTML = 'Gæt';
            //button.classList.add('fadable');
            const feedbackwrapper = create('div', innercontainer, 'dr-survey-feedback-wrapper');

            if(refImage){
                imagewrapper = create('div', feedbackwrapper, 'dr-survey-image-container');
                const image = create('img', imagewrapper);
                image.src = refImage;
            }

            const feedbackcontent = create('div', feedbackwrapper, 'dr-survey-slider-feedback');
            feedbackcontent.innerHTML = feedback;


            if (source) {
                const sourceelement = create('div', feedbackcontent, 'dr-survey-source-element');
                sourceelement.innerHTML = '<span class="source">Kilde:</span> ' + source;
            }

            button.onclick = function() {
                if(button.enabled){
                    sliderActive = false;
                    button.enabled = false;
                    const handlecontainer = select(".noUi-base", sliderwrapper);
                    const handle = select(".noUi-origin", sliderwrapper);
                    const answerhandle = handle.cloneNode(true);
                    handlecontainer.appendChild(answerhandle);
                    const guessCopy = guess;
                    let direction;

                    valuewrapper.classList.remove('non-initialized');

                    sliderwrapper.noUiSlider.set(answer);
                    positionAnswer(answer);
                    showAnswer();
                    //showAnswerValue();

                    resultanswer.innerHTML = 'Rigtigt svar: ' + formatNumber(guessCopy, isInt, unit);

                    answerhandle.classList.add('guess');

                    sliderwrapper.setAttribute('disabled', true);

                    let tweenNumber = {
                        start:Number(guessCopy),
                        end:answer,
                        element:resultanswer
                    }
                    TweenLite.to(tweenNumber, 0.8, {start:answer,onUpdateParams:['{self}'], onUpdate:(tween)=>{
                        let state = tween.target.start.toFixed(precision);
                        tweenNumber.element.innerHTML = 'Rigtigt svar: '+formatNumber(state, isInt, unit);
                    }});
                    hideButton();
                    showFeedback();
                }
            }
            function positionGuess(value){
                var normale = normalize(value, min, max);
                let percent = (normale * 100).toFixed(2) + '%';
                //let tranlatePercent = ((-normale * 70).toFixed(2) - 20) + '%';
                resultguess.style.left = percent;
                //resultguess.style.transform = 'translateX('+tranlatePercent+')';

            }
            function positionAnswer(value){
                let normal = normalize(value, min, max);
                let percent = (normal * 100).toFixed(2) + '%';
                let tranlatePercent = ((-normal * 70).toFixed(2) - 20) + '%';
                resultanswer.style.left = percent;
                resultanswer.style.transform = 'translateX('+tranlatePercent+')';
            }
            function showAnswer(){
                TweenLite.to([resultanswer], 0.4, {delay:0.4, opacity:1});

            }
            function hideStartValues(){
                TweenLite.to([minmark, maxmark], 0.4, {opacity:0});
                TweenLite.to([resultguess], 0.4, {opacity:1});
            }
            function hideButton(){
                TweenLite.to(button, 0.4, {opacity:0, onComplete:()=>{
                    button.style.visibility = 'hidden';
                }})
            }
            function showFeedback(){
                let h = feedbackcontent.getBoundingClientRect().height;
                if(refImage){
                   h += imagewrapper.getBoundingClientRect().height;
                }
                TweenLite.to(feedbackwrapper, 0.4, {delay:0.2, opacity:1, visibility:'visible', height:h});
            }

            if(color.substr(0, 1)==='#'){
                // console.log('it\'s a hex', color);
                //let button = select('.dr-survey-submit-button', wrapper);
                //button.style.background = color;
                let colorClass = 'c-'+color.split('#')[1];
                // console.log('colorClass', colorClass);
                let xStyle = create('style', document.head);
                xStyle.innerHTML = `
                    .${colorClass} .dr-survey-inner-container .dr-survey-submit-button{ background: ${color};border-color: ${color};}
                    .${colorClass} .noUi-origin .noUi-handle{ border-color: ${color}; background: ${color};}
                    .${colorClass} .noUi-origin.guess .noUi-handle {border-color: ${color} !important;background: ${color} !important;}
                    .${colorClass} .dr-survey-inner-container .dr-survey-value-container .result-guess {color: ${color};}
                `;
                // console.log(xStyle);
                wrapper.classList.add(colorClass);
            }else{
                wrapper.classList.add(color);
            }
        }
        function numberWithDots(x) {
            var parts = x.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return parts.join(',');
        }
        function formatNumber(number, isInt, unit) {
            if (isInt) {
                number = parseInt(number);
            }
            number = numberWithDots(number);
            return number + '&nbsp;' + unit;
        }

    }
}
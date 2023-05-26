import questions from './questions.js';
import updateQuestion from './updateQuestion.js';

export default function Quiz() {
    const questionsArr = questions;
    let topCard = document.querySelector('.card.top');
    let bottomCard = document.querySelector('.card.bottom');
    const button = document.querySelector('button');
    let topQuestion, bottomQuestion;
    let index;

    const checkHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    const wrongHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';

    const getChoices = cardElem => Array.from(cardElem.querySelectorAll('li'));

    const markCorrect = choice => {
        choice.classList.add('correct');
        choice.innerHTML += checkHTML;
    };

    const markWrong = choice => {
        choice.classList.add('wrong');
        choice.innerHTML += wrongHTML;
    };

    const isCorrect = choice =>
        getChoices(topCard).indexOf(choice) == topQuestion.correctIndex;

    const markChoices = clickedChoice => {
        if (isCorrect(clickedChoice)) markCorrect(clickedChoice);
        else {
            markWrong(clickedChoice);
            markCorrect(getChoices(topCard)[topQuestion.correctIndex]);
        }
    };

    const swapCards = () => {
        topCard.classList.remove('top', 'animate');
        topCard.classList.add('bottom');
        bottomCard.classList.add('top');
        bottomCard.classList.remove('bottom');
        [topCard, bottomCard] = [bottomCard, topCard];
        [topQuestion, bottomQuestion] = [bottomQuestion, topQuestion];
        updateBottomCard();
        topCard.addEventListener('click', choiceClick);
    };

    const updateBottomCard = () => {
        index++;
        if (index > questionsArr.length - 1) return;
        bottomQuestion = questionsArr[index];
        getChoices(bottomCard).forEach(e =>
            e.classList.remove('wrong', 'correct')
        );
        updateQuestion(bottomCard, questionsArr[index]);
    };

    const buttonClick = () => {
        topCard.classList.add('animate');
        button.classList.remove('move-down');
        setTimeout(swapCards, 500);
    };

    const choiceClick = ({ target }) => {
        if (target.tagName != 'LI') return;
        markChoices(target);
        button.classList.add('move-down');
        topCard.removeEventListener('click', choiceClick);
    };

    this.start = () => {
        topQuestion = questionsArr[0];
        bottomQuestion = questionsArr[1];
        index = 1;
        updateQuestion(topCard, topQuestion);
        updateQuestion(bottomCard, bottomQuestion);
        topCard.addEventListener('click', choiceClick);
        button.addEventListener('click', buttonClick);
    };
}

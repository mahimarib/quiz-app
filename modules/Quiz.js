import questions from './questions.js';

export default function Quiz() {
    const questionsArr = questions;
    let button = document.querySelector('button');
    let topCard = document.querySelector('.card.top');
    let bottomCard = document.querySelector('.card.bottom');
    let topQuestion, bottomQuestion;
    let index, score;

    const checkHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    const wrongHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';

    const getChoices = card => Array.from(card.querySelectorAll('li'));

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
        if (isCorrect(clickedChoice)) {
            markCorrect(clickedChoice);
            ++score;
        } else {
            markWrong(clickedChoice);
            markCorrect(getChoices(topCard)[topQuestion.correctIndex]);
        }
    };

    const updateCard = (card, questionObj) => {
        const { question, choices } = questionObj;
        card.querySelector('h1').innerHTML = question;
        card.querySelectorAll('ul li').forEach(
            (li, i) => (li.innerHTML = choices[i])
        );
    };

    const updateScore = () => {
        document.getElementById('percent');
        const arcLength = 2 * Math.PI * 45 * (score / questions.length);
        percent.style.strokeDasharray = `${arcLength} 600`;
        document.querySelector('svg text').textContent = `${(
            (score / questions.length) *
            100
        ).toFixed(0)}%`;
        bottomCard.querySelector(
            'p'
        ).textContent = `You got ${score} out of ${questions.length} correct.`;
    };

    const swapCards = () => {
        topCard.classList.remove('top', 'animate');
        topCard.classList.add('bottom');
        bottomCard.classList.add('top');
        bottomCard.classList.remove('bottom');
        if (bottomCard.classList.contains('result')) updateScore();
        [topCard, bottomCard] = [bottomCard, topCard];
        [topQuestion, bottomQuestion] = [bottomQuestion, topQuestion];
        updateBottomCard();
        topCard.addEventListener('click', choiceClick);
    };

    const updateBottomCard = () => {
        if (topCard.classList.contains('result')) return;
        index++;
        if (index > questionsArr.length - 1) {
            showScore();
            return;
        }
        bottomQuestion = questionsArr[index];
        getChoices(bottomCard).forEach(li =>
            li.classList.remove('wrong', 'correct')
        );
        updateCard(bottomCard, questionsArr[index]);
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

    const showScore = () => {
        bottomCard.classList.add('result');
        const percent = (score / questions.length) * 100;
        const html = `
        <h1 class="score">Your Score:</h1>
        <svg viewBox="0 0 100 100">
            <g transform="translate(50, 50)">
                <circle id="full" cx="0" cy="0" r="45" fill="none" stroke="currentColor" ></circle>
                <circle id="percent" cx="0" cy="0" r="45" fill="none" stroke="currentColor"></circle>
                <text text-anchor="middle" fill="currentColor" dominant-baseline="central">
                </text>
            </g>
        </svg>
        <p></p>
        `;
        bottomCard.querySelector('.container').innerHTML = html;
    };

    this.start = () => {
        topQuestion = questionsArr[0];
        bottomQuestion = questionsArr[1];
        index = 1;
        score = 0;
        updateCard(topCard, topQuestion);
        updateCard(bottomCard, bottomQuestion);
        button.addEventListener('click', buttonClick);
        topCard.addEventListener('click', choiceClick);
    };
}

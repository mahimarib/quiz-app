import questions from './questions.js';

export default function Quiz() {
    let button = document.querySelector('button');
    let topCard = document.querySelector('.card.top');
    let bottomCard = document.querySelector('.card.bottom');
    let topQuestion, bottomQuestion;
    let index, score;

    const checkIcon = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    const wrongIcon = '<i class="fa fa-times-circle" aria-hidden="true"></i>';

    const blankCard = `
    <div class="container">
        <h1 class="question"></h1>
        <ul class="choices">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>`;

    const getChoices = card => Array.from(card.querySelectorAll('li'));

    const markCorrect = choice => {
        choice.classList.add('correct');
        choice.innerHTML += checkIcon;
    };

    const markWrong = choice => {
        choice.classList.add('wrong');
        choice.innerHTML += wrongIcon;
    };

    const isCorrect = choice =>
        getChoices(topCard).indexOf(choice) == topQuestion.correctIndex;

    const resetChoices = card =>
        card.querySelectorAll('ul li').forEach((li, i) => {
            li.classList.remove('correct', 'wrong');
            li.innerHTML = '';
        });

    const markChoices = clickedChoice => {
        if (isCorrect(clickedChoice)) {
            markCorrect(clickedChoice);
            score++;
        } else {
            markWrong(clickedChoice);
            markCorrect(getChoices(topCard)[topQuestion.correctIndex]);
        }
    };

    const populateCard = (card, questionObj) => {
        resetChoices(card);
        const { question, choices } = questionObj;
        card.querySelector('h1').innerHTML = question;
        getChoices(card).forEach((li, i) => (li.textContent = choices[i]));
    };

    const swap = () => {
        topCard.classList.remove('top', 'animate');
        topCard.classList.add('bottom');
        bottomCard.classList.add('top');
        bottomCard.classList.remove('bottom');
        [topCard, bottomCard] = [bottomCard, topCard];
        [topQuestion, bottomQuestion] = [bottomQuestion, topQuestion];
    };

    const updateCards = () => {
        //swap
        swap();
        // after swap
        topCard.addEventListener('click', choiceClick);
        if (topCard.classList.contains('result')) updateScore();
        if (bottomCard.classList.contains('result')) {
            bottomCard.innerHTML = blankCard;
            bottomCard.classList.remove('result');
            button.innerText = 'next';
        }
        updateBottomCard();
    };

    const updateBottomCard = () => {
        if (topCard.classList.contains('result')) return;
        index++;
        if (index > questions.length - 1) {
            makeScoreCard();
            return;
        }
        bottomQuestion = questions[index];
        populateCard(bottomCard, bottomQuestion);
    };

    const makeScoreCard = () => {
        bottomCard.classList.add('result');
        const html = `
        <div class="container">
            <h1 class="score">Your Score:</h1>
            <svg viewBox="0 0 100 100">
                <g transform="translate(50, 50)">
                    <circle id="full" cx="0" cy="0" r="45" fill="none" stroke="currentColor" ></circle>
                    <circle id="percent" cx="0" cy="0" r="45" fill="none" stroke="currentColor"></circle>
                    <text text-anchor="middle" fill="currentColor" dominant-baseline="central"></text>
                </g>
            </svg>
            <p></p>
        </div>
        `;
        bottomCard.innerHTML = html;
    };

    const updateScore = () => {
        const arcLength = 2 * Math.PI * 45 * (score / questions.length);
        const percent = ((score / questions.length) * 100).toFixed(0);
        document.getElementById(
            'percent'
        ).style.strokeDasharray = `${arcLength} 600`;
        document.querySelector('svg text').textContent = `${percent}%`;
        const text = `You got ${score} out of ${questions.length} correct.`;
        topCard.querySelector('p').textContent = text;
        button.innerText = 'reset';
        button.classList.add('move-down');
    };

    const reset = () => {
        index = 0;
        score = 0;
        bottomCard.innerHTML = blankCard;
        bottomQuestion = questions[index];
        populateCard(bottomCard, bottomQuestion);
        button.classList.remove('move-down');
    };

    const buttonClick = () => {
        if (button.textContent === 'reset') reset();
        topCard.classList.add('animate');
        button.classList.remove('move-down');
        setTimeout(updateCards, 500);
    };

    const choiceClick = ({ target }) => {
        if (target.tagName != 'LI') return;
        markChoices(target);
        button.classList.add('move-down');
        topCard.removeEventListener('click', choiceClick);
    };

    this.start = () => {
        topQuestion = questions[0];
        bottomQuestion = questions[1];
        index = 1;
        score = 0;
        populateCard(topCard, topQuestion);
        populateCard(bottomCard, bottomQuestion);
        button.addEventListener('click', buttonClick);
        button.innerText = 'next';
        topCard.addEventListener('click', choiceClick);
    };
}

export default function updateQuestion(element, questionObj) {
    const { question, choices } = questionObj;

    const h1 = element.querySelector('h1');
    h1.innerHTML = question;

    const listItems = element.querySelectorAll('ul li');

    let index = 0;

    listItems.forEach(element => (element.innerHTML = choices[index++]));
}

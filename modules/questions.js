const questions = [
    {
        question: 'Who invented JavaScript?',
        choices: [
            'Douglas Crockford',
            'Guido van Rossum',
            'James Gosling',
            'Brendan Eich',
        ],
        correctIndex: 3,
    },
    {
        question: 'Which one of these is a JavaScript package manager?',
        choices: ['node.js', 'TypeScript', 'npm', 'cargo'],
        correctIndex: 2,
    },
    {
        question: 'Which of these tools ensure code quality?',
        choices: ['Angular', 'ESLint', 'React', 'jQuery'],
        correctIndex: 1,
    },
    {
        question:
            'Which of the following is a valid way to declare a variable in JavaScript?',
        choices: [
            '<code>variable x;</code>',
            '<code>let x;</code>',
            '<code>int x;</code>',
            '<code>const x;</code>',
        ],
        correctIndex: 1,
    },
    {
        question:
            'JavaScript was originally created as a scripting language for which web browser?',
        choices: ['Internet Explorer', 'Firefox', 'Safari', 'Chrome'],
        correctIndex: 0,
    },
    {
        question:
            'Which of the following is used to comment out a single line in JavaScript?',
        choices: [
            '<code>// This is a comment</code',
            '<code># This is a comment</code>',
            '<code>/* This is a comment /</code',
            '<code>/* This is a comment */</code',
        ],
        correctIndex: 0,
    },
    {
        question:
            'What does the <code>typeof</code> operator in JavaScript return?',
        choices: [
            'The data type of a variable.',
            'The value of a variable.',
            'The length of a string.',
            'The index of an array element.',
        ],
        correctIndex: 0,
    },
];

export default questions;

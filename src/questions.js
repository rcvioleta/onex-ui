let questionId = 10
let choiceId = 20

export default [
  {
    id: questionId++,
    description: 'What is 1 + 1?',
    choices: [
      { id: choiceId++, text: '1', correct: false },
      { id: choiceId++, text: '2', correct: true },
      { id: choiceId++, text: '3', correct: false },
      { id: choiceId++, text: '4', correct: false },
    ],
  },
  {
    id: questionId++,
    description: 'What is 5 x 5?',
    choices: [
      { id: choiceId++, text: '25', correct: true },
      { id: choiceId++, text: '30', correct: false },
      { id: choiceId++, text: '35', correct: false },
      { id: choiceId++, text: '40', correct: false },
    ],
  },
]

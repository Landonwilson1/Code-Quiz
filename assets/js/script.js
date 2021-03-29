


//JS FOR HIGHSCORES 
const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

//highScoresList.innerHTML = " "
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")
//END HIGH SCORES

//JS FOR QUIZ QUESTIONS
//CONST'S FOR QUESTIONS FUNCTION
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

//VARIABLES FOR QUESTIONS FUNCTION
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//QUESTIONS 
let questions = [
    {
        question: 'Arrays in JavaScript can be used to store ________.',
        choice1: 'Numbers and Strings',
        choice2: 'Other Arrays',
        choice3: 'Booleans',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question:
            "The Commonly used Data Types do NOT Include: ",
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts",
        choice4: "Numbers",
        answer: 3,
    },
    {
        question: "String values must be enclosed within ______ when assigned to variables",
        choice1: "Commas",
        choice2: "Curly Brackets",
        choice3: "Parenthesis",
        choice4: "Quotes",
        answer: 4,
    },
    {
        question: "A very useful tool used for developing and debugging for printing content to the to the debugger",
        choice1: "JavaScirpt",
        choice2: "Terminal/Bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: 4,
    }
]

//CONST FOR POINTS AND QUESTION
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


//ALLOWS QUESTIONS AND COUNTER TO START
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


//FUNCTION FOR TIMER 
var timeleft = 80;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
  if(acceptingAnswers!=true) {
    timeleft-=10
  }
}, 1000);


// ALLOWS END.HTML TO DISPLAY WHEN QUESTIONS ARE OVER
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    //PROGRESS BAR CODE
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    //RANDOMNESS FOR QUESTIONS
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    //CHOICE FOR QUESTION
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    //DETERMINES CORRECT OR INCORRECT QUESTIONS
    acceptingAnswers = true
}

//CODE FOR INCORRECT/CORRECT W/ TIMER AND SCORE
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
          downloadTimer -= 10
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()


            console.log(SCORE_POINTS)
        }, 1000)
    })
})

//ADDS POINTS UPDATES HTML
incrementScore = num => {
    score +=num
    scoreText.innerText = score
    
}

startGame()


///// CANT GET HIGHSCORES TO WORK WITH LOCAL STORAGE /////

//const highScoress = JSON.parse(localStorage.getItem('highScoress'))
/*
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = SCORE_POINTS('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

//const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

    
}
*/
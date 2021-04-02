// Section where is defined the DOM elements that I will use 
var timerDiv = document.querySelector("#timerDiv");
var timerCountSpan = document.querySelector("#timer_count");
var titleDiv = document.querySelector("#title");
var textP = document.querySelector("#text");
var sectionElements = document.querySelector("#sectionDinamicElements");
var viewScores = document.querySelector("#viewScores");
var elementList = document.querySelector("#elementList");
var verifyAnswer = document.querySelector("#verifyAnswer");

// Section where is defined the variables that I will use on the sysmte
var secondsLeft = 0;
var actualScore = 0;
var currentQuestion = 0;
var correctAnswer = "";
var historicalScores=[];
var currentQuiz;
var isLastQ = false;
var userData = {
        inits: "",
        userScore: ""
};
//Section where are the page and the quiz of the system
var pages = {
    'main': {
        'title': 'Coding Quiz Challange',
        'text': 'Try to answer the following questions from Javascript within the time limit. Keep in mind that incorrect answers will penalize your score / time by ten seconds',
        'elements':['button1'],
        'button1': {
            'properties': {
                'label': 'Start Quiz',
                'type': 'button',
                'class': 'greenButton',
                'function':'startquiz()'
            }    
        }
    },
    'highscores': {
        'title': 'Highscores',
        'text': '',
        'elements':['button1','button2'],
        'button1': {
            'properties': {
                'label': 'Go Back',
                'type': 'button',
                'class': 'purpleButton',
                'function':'cleanPage();setPage("main")'
            }    
        },
        'button2': {
            'properties': {
                'label': 'Delete Highscores',
                'type': 'button',
                'class': 'purpleButton',
                'function':'cleanScores()'
            }    
        },
    },
    'gameover': {
        'title': 'All done',
        'text': 'Your final score is',
        'elements':['input1','button1'],
        'button1': {
            'properties': {
                'label': 'Submit',
                'type': 'button',
                'class': 'greenButton',
                'function':'storeScores()'
            }    
        },
        'input1': {
            'properties': {
                'label': 'Enter Initials',
                'id': 'initialUser',
                'name': 'initialUser',
                'type': 'input',
                'class': 'inputClass',
            }    
        }
    },
    'startquiz': {
        'title': 'Javascript Quiz',
        'text': '',
        'elements':[],
    },
}
/*  ****************    Quiz Section **************** */
var quiz = [
    {
        title: "Arrays in Javascript can be used to store",
        choice: {
            a: "numbers and strings",
            b: "Other arrays",
            c: "booleans",
            d: "All of the above",
        },
        answer : "d"    
    },
    {
        title: "Commonly used data type DO NOT include",
        choice: {
            a: "strings",
            b: "booleans",
            c: "alerts",
            d: "numbers",
        },
        answer : "c"    
    },
    {
        title: "The condition in an if/else statements enclosed within _______",
        choice: {
            a: "quotes",
            b: "curly brackets",
            c: "parentheses",
            d: "square brackets",
        },
        answer : "c"    
    },
    {
        title: "String value must be enclosed within _____ when being assigned to variable",
        choice: {
            a: "quotes",
            b: "curly brackets",
            c: "parentheses",
            d: "square brackets",
        },
        answer : "a"    
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        choice: {
            a: "Javascript",
            b: "terminal/bash",
            c: "for loops",
            d: "console.log",
        },
        answer : "d"    
    },
    {
        title: "How does a WHILE loop start? ",
        choice: {
            a: "while(i<=10)",
            b: "while i = 1 to 10",
            c: "while (i>=10;i++",
        },
        answer : "a"    
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choice: {
            a: "<javascript>",
            b: "<js>",
            c: "<script>",
            d: "<scripting>",
        },
        answer : "c"    
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choice: {
            a: "The <head> section",
            b: "Both the <head> and the <body> section are correct ",
            c: "The <body> section",
        },
        answer : "b"    
    },
    {
        title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice: {
            a: "<script href='xxx.js' >",
            b: "<script name='xxx.js' >",
            c: "<script src='xxx.js' >",
        },
        answer : "c"    
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        choice: {
            a: "True",
            b: "False",
        },
        answer : "b"    
    },
]

/* ****************  Start  Section of the timers Functions           **************** */
 
// This function is the one that helps to set the timer and if reach the 0 it finish the game
function setTime() {

  // Sets interval in variable
  var timerInterval = setInterval(function() {
    timerCountSpan.textContent = secondsLeft ;

      if ((secondsLeft === 0 || secondsLeft < 0) && !isLastQ) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          timerCountSpan.textContent = " ";
          setPage('gameover');
      } else if ((secondsLeft === 0 || secondsLeft < 0) && isLastQ) {
          clearInterval(timerInterval);
          timerCountSpan.textContent = " ";
       } else if (isLastQ) {
          timerCountSpan.textContent = " ";
          clearInterval(timerInterval);
       }

    secondsLeft--;
  }, 1000);
}

// This function help to display if the answer was correct or incorrect
function displayResult(msg,classMsg) {
    verifyAnswer.textContent = msg;
    verifyAnswer.setAttribute("class", "answerResult "+classMsg);
    secondsToDisplay = 2;
    // Sets interval in variable
    var timerIntervalDisplay = setInterval(function() {

        if(secondsToDisplay=== 0 || secondsToDisplay < 0) {
        // Stops execution of action at set interval
        clearInterval(timerIntervalDisplay);
            verifyAnswer.textContent = "";
            verifyAnswer.setAttribute("class", "");
        }

        secondsToDisplay--;
    }, 1000);
}

/* ****************   End  Section of the timers Functions           **************** */


// Adding the listener to the view Score button
viewScores.addEventListener("click", function () {

    setPage('highscores');
    renderHighScores();
});

// This function helps me to clean all the elements in order to be used 
function cleanPage(deleteTitle = true) {
    if (deleteTitle) {
        titleDiv.textContent = '';    
    }    
    sectionElements.textContent = '';
    textP.textContent = '';
    elementList.textContent = '';
    elementList.setAttribute('class', '');
    sectionDinamicElements.textContent = "";
}

// This function helps to set the page navigation and bring the information from the array defined before "pages"
function setPage(page) {
    cleanPage();
    var currentPage = pages[page];
    titleDiv.textContent = currentPage['title'];
    textP.textContent = currentPage['text'];
    for (var [key, elementCreate] of Object.entries(currentPage['elements'])) {
        for (var [key, element] of Object.entries(currentPage[elementCreate])) {

            var newDiv = document.createElement(element['type']);
            if (element['type'] === 'button') {
                newDiv.setAttribute('class', element['class']);
                newDiv.textContent = element['label'];
                newDiv.setAttribute('onClick', element['function']);
            } else {
                newDiv.setAttribute('id', element['id']);
                newDiv.setAttribute('name', element['name']);
                newDiv.setAttribute('placeholder', element['label']);
                newDiv.setAttribute('class', element['class']);
            }
            sectionElements.append(newDiv);
        }
    }

    if (page === "gameover") {
        // I add the score to the text
        textP.textContent += " " +actualScore+"."
    }
    if (page === "main") {
        viewScores.setAttribute("style", "visibility:visible");
    } else {
        viewScores.setAttribute("style", "visibility:hidden");
    }
    
}

// This function will start the timer and it will display the quiz

function startquiz() {
    cleanPage();
    viewScores.setAttribute("style", "visibility:hidden");
    titleDiv.textContent = pages['startquiz']['title'];
    // this will create a random quiz everytime that starts
    currentQuiz = quiz.sort(function () { return 0.5 - Math.random() })
    // This will start the timer 
    setTime();
    currentQuestion = 0;
    correctAnswer = "";
    userAnswer = "";
    secondsLeft = 100;
    actualScore = 0;

    createQuiz(currentQuestion);
}
// This function helps me to crete the quiz 
function createQuiz(currentQuestion) {
    // I do some cleanup of the UL element in order to not have old questions or elements
    elementList.textContent = "";
    // I do a loop to check the answer that needs to display 
    for (var [keyQuestions, elementQuestions] of Object.entries(currentQuiz)) {
        if (currentQuestion == keyQuestions) {
            // I display the question and I save the correct answer that will help to verify later
            textP.textContent = elementQuestions['title'];
            correctAnswer = elementQuestions['answer'];
            // Here I create a loop to display the options 
            for (var [keyQuestion, elementQuestion] of Object.entries(elementQuestions['choice'])) {
                // I create a li element
                var li = document.createElement("li");
                // I create a button element that will contain the choice for the answer 
                var button = document.createElement("button");
                // I set an attribute to the button, and is to set a function on the click event , with this will help me to check the answer and to move to the next question
                button.setAttribute("onClick", "nextQuestion("+currentQuestion+",'"+keyQuestion+"')");
                // I add a class to the button
                button.setAttribute('class', 'questions');
                // I set the text
                button.textContent = elementQuestion;
                // I append the button to the li element
                li.append(button);
                // I append the li element to the UL 
                elementList.append(li);
            }
        }
    }
    // If I reach to the end of the question I set the main page to gameover view and I reset the time, also I cahnge a varaible that I use to check if is the last question
    if (currentQuestion == currentQuiz.length) {        
        isLastQ = true;
        setPage('gameover');
    }
}
function nextQuestion(questionIndex, userAnswer) {
    var msg = "Correct!";
    var msgClass = "good";
    // I compare the answer of the user with the correct answer 
    if (userAnswer === correctAnswer) {
        actualScore++;
    } else {
        //Change the text and the class
        msg = "Wrong!";
        msgClass = "wrong";
        // I penalize the user if they answer incorrectly
        secondsLeft -= 10;
    }

    // I move forward with the next question
    questionIndex++;
    if (questionIndex != currentQuiz.length) {               
        displayResult(msg, msgClass);
    }
    createQuiz(questionIndex)
}

// The following function renders scores on list as <li> elements
function renderHighScores() {
  // Get the Scores from the local storage
    var rankNumber = 1;
    var conditionPass = true;
    // Adding the class list-group
    elementList.setAttribute('class', 'list-group');
  // Render a new li for each scores that is inside of local storage
    if (historicalScores !== null) {
        if (historicalScores.length <= 0) {
            conditionPass = false;
        }
    } else {
        conditionPass = false;
    }
    if (conditionPass ) {
        for (var i = 0; i < historicalScores.length; i++) {
            var initial = historicalScores[i]["inits"];
            var score = historicalScores[i]["userScore"];
            // create the element li that will display the information 
            var li = document.createElement("li");
            li.textContent = rankNumber + ".  " + initial;
            // I create the span element to put the score on an badge t
            var span = document.createElement("span");
            span.setAttribute('class', 'badge');
            span.textContent = score;
            // I append the span into the element li
            li.append(span);
            // I append the li elemento into the UL to display the list of users with their scores
            elementList.append(li);
            // I use this variable to set a number cause on the li I deleted that to have a different look 
            rankNumber++;
        }
    } else {
        // I use this to display that the are no scores 
            var li = document.createElement("li");
            li.textContent = " No Data ";
            elementList.append(li);
    }
}
// Function that save the score of the person that resolve the quiz
function storeScores() {
    // I get what the user wrotes on the input that I created 
    userData.inits = document.getElementById('initialUser').value;
    // I set the score of the user
    userData.userScore = actualScore;
    historicalScores.push(userData);
    // I cleant the object that I use to insert into the historicalScores varaible
    userData = {
            inits: "",
            userScore: ""
    };
    // I save the information on the localstorage
    localStorage.setItem("scoresAll", JSON.stringify(historicalScores));
    // I do some cleaning 
    elementList.textContent = '';
    // Set the page to highscore in order to display the information of previous users 
    setPage('highscores');
    //I render the Scores 
    renderHighScores();
}
// This function helps to clear the Highscores
function cleanScores() {
    historicalScores = [];
    localStorage.setItem("scoresAll", '');
    elementList.textContent = '';
    renderHighScores();
}

    
// Init the Page to main
function init() {
    // I call the local Storage to bring all the scores 
    if (localStorage.getItem("scoresAll") !== null) {
        historicalScores=  JSON.parse(localStorage.getItem("scoresAll"));
    }
    setPage('main');
}
// I call the function to start on the main page
init();
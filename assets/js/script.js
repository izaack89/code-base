// Section where is defined the DOM elements that I will use 
var timerCountSpan = document.querySelector("#timer_count");
var titleDiv = document.querySelector("#title");
var textP = document.querySelector("#text");
var sectionElements = document.querySelector("#sectionDinamicElements");
var viewScores = document.querySelector("#viewScores");
var highScoresList = document.querySelector("#highScoresList");

// Section where is defined the variables that I will use on the sysmte
var secondsLeft = 100;
var actualScore = 0;
var historicalScores = [];
var userData = {
        inits: "",
        userScore: ""
};
//Section where are the page and the quiz of the system
var pages = {
    'main': {
        'title': 'Coding Quiz Challange',
        'text': 'Try to answer the following code -related questions within the time limit Keep in mind that incorrect answers will penalize your score / time by ten seconds',
        'elements':['button1'],
        'button1': {
            'properties': {
                'label': 'Start Quiz',
                'type': 'button',
                'class': 'greenButton',
                'function':'setTime()'
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
        'text': 'Your finael score is',
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
        'title': 'NFL Quiz',
        'text': '',
        'elements':[],
    },
}
var quiz = [
    {
        title: "How are the NFL conferences divided?",
        choice: {
            a: "AFC, NFC",
            b: "LFC, NFC",
            c: "AFC,UFC",
        },
        answer : "a"    
    },
    {
        title: "How many teams plays on the NFL:",
        choice: {
            a: "52",
            b: "40",
            c: "32",
        },
        answer : "c"    
    },
    {
        title: "What team never won a Superbowl?",
        choice: {
            a: "NE Patriots",
            b: "KC Chiefs",
            c: "Dallas Cowboys",
            d: "Minnesota Vikings",
        },
        answer : "d"    
    },
    {
        title: "What are the 4 NFL divisions?",
        choice: {
            a: "Up, Down, Left, and Right",
            b: "East, North, South, and West",
            c: "AFC 1,AFC 2,NFC 1,NFC 2",
        },
        answer : "b"    
    },
    {
        title: "What Super Bowl are we on 2020-2021? ",
        choice: {
            a: "LV",
            b: "LIX",
            c: "L",
        },
        answer : "a"    
    },
    {
        title: "How many Super Bowls are there in total?",
        choice: {
            a: "50",
            b: "44",
            c: "65",
            d: "55",
        },
        answer : "d"    
    },
    {
        title: "How many Super Bowls are there in total?",
        choice: {
            a: "50",
            b: "44",
            c: "65",
            d: "55",
        },
        answer : "d"    
    },
    {
        title: "How many Super Bowls are there in total?",
        choice: {
            a: "50",
            b: "44",
            c: "65",
            d: "55",
        },
        answer : "d"    
    },
    {
        title: "How many Super Bowls are there in total?",
        choice: {
            a: "50",
            b: "44",
            c: "65",
            d: "55",
        },
        answer : "d"    
    },
    {
        title: "Who wins the Super Bowl 2021?",
        choice: {
            a: "Tampa Bay",
            b: "Kansas City",
            c: "Dallas",
            d: "South Carolina",
        },
        answer : "a"    
    },
]


viewScores.addEventListener("click", function () {

    setPage('highscores');
    renderHighScores();
 });
function setTime() {

  // Sets interval in variable
  var timerInterval = setInterval(function() {
    timerCountSpan.textContent = secondsLeft ;

    if(secondsLeft === 0 || secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      console.log('End Game');
      timerCountSpan.textContent = " ";
    }

    secondsLeft--;
  }, 1000);
}
function cleanPage() {
    titleDiv.textContent = '';
    sectionElements.textContent = '';
    textP.textContent = '';
    highScoresList.textContent = '';
    highScoresList.setAttribute('class', '');

}
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
    if (page==="gameover") {        
        textP.textContent += " " +actualScore+"."
    }else if (page==="startquiz") {        
        startquiz();
    }

}

// This function will start the timer and it will display the quiz

function startquiz() {
    
}

// The following function renders scores on list as <li> elements
function renderHighScores() {
  // Get the Scores from the local storage
    var rankNumber = 1;
    // Adding the class list-group
    highScoresList.setAttribute('class', 'list-group');
  // Render a new li for each scores that is inside of local storage
    console.log(historicalScores.length);
    if (historicalScores.length > 0) {
        for (var i = 0; i < historicalScores.length; i++) {
            var initial = historicalScores[i]["inits"];
            var score = historicalScores[i]["userScore"];
            var li = document.createElement("li");
            li.textContent = rankNumber + ".  " + initial;
            li.setAttribute("data-index", i);
            var span = document.createElement("span");
            span.setAttribute('class', 'badge');
            span.textContent = score;
            li.append(span);
            highScoresList.append(li);
            rankNumber++;
        }
    } else {
        
            var li = document.createElement("li");
            li.textContent = " No Scores ";
            highScoresList.append(li);
    }
}
// Function that save the score of the person that resolve the quiz
function storeScores() {

    userData.inits = document.getElementById('initialUser').value;
    userData.userScore = actualScore;
    historicalScores.push(userData);
    localStorage.setItem("scoresAll", JSON.stringify(historicalScores));
    highScoresList.textContent = '';
    setPage('highscores');
    renderHighScores();
}
// This function helps to clear the Highscores
function cleanScores() {
    historicalScores = [];
    localStorage.setItem("scoresAll", '');
    highScoresList.textContent = '';
    renderHighScores();
}

    


// Init the Page to main
function init() {
    
    localStorage.setItem("scoresAll", JSON.stringify(historicalScores));
    historicalScores=  JSON.parse(localStorage.getItem("scoresAll"));
    setPage('startquiz');
}

init();
// Section where is defined the DOM elements that I will use 
var timerCountSpan = document.querySelector("#timer_count");
var titleDiv = document.querySelector("#title");
var textP = document.querySelector("#text");
var sectionElements = document.querySelector("#sectionDinamicElements");
var viewScores = document.querySelector("#viewScores");

// Section where is defined the variables that I will use on the sysmte
var secondsLeft = 100;
var historicalScores = [];
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
        'text': 'DSD',
        'elements':['button1','button2'],
        'button1': {
            'properties': {
                'label': 'Go Back',
                'type': 'button',
                'class': 'greenButton',
                'function':'cleanPage();setPage("main")'
            }    
        },
        'button2': {
            'properties': {
                'label': 'Delete Highscores',
                'type': 'button',
                'class': 'greenButton',
                'function':'setPage("main")'
            }    
        },
    },
}
var quiz = [
    {
        title: "How Many conference are on the NFL:",
        choices: ["1","2","3", "5"],
        answer : "2"    
    }
]



viewScores.addEventListener("click", function () {
    cleanPage();
    setPage('highscores');
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
}
function setPage(page) {
    
    var currentPage = pages[page];
    titleDiv.textContent = currentPage['title'];
    textP.textContent = currentPage['text'];
            console.log(currentPage['text'])
    for (var [key, elementCreate] of Object.entries(currentPage['elements'])) {
        console.log(currentPage[elementCreate],elementCreate)
        for (var [key, element] of Object.entries(currentPage[elementCreate])) {
            console.log(key, element);
            var newDiv = document.createElement(element['type']);
            newDiv.setAttribute('class', element['class']);
            newDiv.textContent = element['label'];
            newDiv.setAttribute('onClick', element['function']);
            sectionElements.append(newDiv);
        }
    }
        

}

setPage('main');

// DOing test on the localstorage
    var userData = {
        inits: "GR",
        userScore: "8"
    };
    historicalScores.push(userData);

    localStorage.setItem("scoresAll", JSON.stringify(historicalScores));
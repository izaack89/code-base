var timerCountDiv = document.querySelector("#timer_count");

function setTime() {

  // Sets interval in variable
  var timerInterval = setInterval(function() {
    timerCountDiv.textContent = secondsLeft + " seconds remaining.";

    if(secondsLeft === 0 || secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      console.log('End Game');
      timerCountDiv.textContent = " ";
      game_Plantilla.textContent = "Game Over";
    }

    secondsLeft--;
  }, 1000);
}
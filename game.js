var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;

/*********************************** START THE GAME********************************/

// 1. First click for beginning
$(document).keydown(function () {
  if (!gameOn) {
    $("h1").text("level 1");
    nextSequence();
    gameOn = true;
  }
});

// 2. Click on a button

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor); // adding chosen color in userClickedPattern

  playSound(userChosenColor);
  animatePress(userChosenColor);
  //3. Check  the result of game's and user's patterns
  checkAnswer(userClickedPattern.length - 1);
});

// 3. Check game's and user's patterns
function checkAnswer(currentLevel) {
  //3.1.check the last value of the pattern that was clicked and randomly generated
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //3.2. (while step 3.1. is true in every click) when  user's pattern length reach length of game's pattern start the next level
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game over, Press Any Key to Restart");
    startOver();
    playWrondSound();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
}

// 4. Beginning (at step 2) and continuing of the game (in case answers are true in the step 3)
function nextSequence() {
  userClickedPattern = []; // reset user's pattern to empty
  level++; // lvl up after successfull complete at step 3
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // generate random number from 0 to 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // from the beginning fill up the game pattern (array)

  $("#" + randomChosenColour) // visual effect of generated random number
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

// function that reset all saved information in the game to 0 lvl, so you should start from step 1
function startOver() {
  gameOn = false;
  gamePattern = [];
  level = 0;
}

/************************SOUND AND ANIMATION ******************8*/

//sound function for button
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//sound function for wrong answers
function playWrondSound() {
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
}
// animation for clicked button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

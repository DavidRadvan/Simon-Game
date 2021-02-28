let userClickedPattern = [];

let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let started = false;

let level = 0;

function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

$(document).on("keydown", function() {
  if (started === false) {
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() {
  let userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

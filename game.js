

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// Старт игры и номер уровня.
$(document).keypress(function() {
if (!started) {
$("#level-title").text("Level " + level);
nextSequence();
started = true;
}
});


// Эффекты при нажатии.
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

// Проверка ответа.
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  console.log("success");
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout (function() {
      nextSequence();
    }, 1000);
  }
} else { console.log("wrong");
playSound("Wrong");

$("body").addClass("game-over");
setTimeout(function () {
  $("body").removeClass("game-over");
}, 200);
$("#level-title").text("Game Over, Press Any Key to Restart");

startOver();
}
}
// Рандомная генерация цвета.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours [randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
// Звук на клик.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

// Анимация нажатия клавиши.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
   $("#" + currentColour).removeClass("pressed")
}, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

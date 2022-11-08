var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;


$(document).keypress(function(){
  if(started === 0){
  nextSequence();
  started = 1;
  console.log("in keypress");}
});


$(".btn").on("click", function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1500);
  }}
  else{
    playSound("wrong");
    setTimeout(function(){
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");
    startOver();
  }
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random())*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log("in nextSequence");
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}



function playSound(name){
  var makeSound = new Audio(name + ".mp3");
  makeSound.play();
}



function animatePress(currentColor){
  setTimeout(function(){
    $("." + currentColor).toggleClass("pressed")
  }, 100);
  $("." + currentColor).toggleClass("pressed");
}


function startOver(){
  started = 0;
  level = 0 ;
  gamePattern = [];
}

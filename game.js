var btncolors = ['red','yellow','blue','green'];
var gamepattern = [];
var userpattern = [];
var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});


function nextsequence(){
  userpattern=[];               //this container is used to empty the array and relode it with the new order of buttons clicked by user
  level++;
  $("#level-title").text("Level " + level);
  var randnum=Math.floor(Math.random()*4);
  var randcolor = btncolors[randnum];
  gamepattern.push(randcolor);
  console.log(gamepattern);                 //#unnec. for testing
  $("#"+randcolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randcolor);
}


$(".btn").click(function(){
  var userchosencolor = $(this).attr("id");
  userpattern.push(userchosencolor);
  console.log(userpattern);           //#unnec. for testing
  playsound(userchosencolor);
  animatepress(userchosencolor);
  checkans(userpattern.length-1);
})


function checkans(currentlevel){
  if (userpattern[currentlevel] === gamepattern[currentlevel]){
    if (userpattern.length === gamepattern.length){
      console.log("success");           //#unnec. for testing
      setTimeout(function(){
        nextsequence();
      }, 1000);
    }
  }else{
    console.log("fail");                //#unnec. for testing
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startover();
  }

}


function animatepress(currentcolor){
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function(){
    $(".btn").removeClass("pressed")
  }, 100)
}


function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function startover(){
  gamepattern=[];             //emptying the array
  level=0;
  started = false;
}

var colors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=true;
function randomSelector (){
    var randomNumber=Math.floor(Math.random()*4);
    return colors[randomNumber];
}

function changeColor(selectedButton){
    $("#"+selectedButton).addClass ("pressed");
    setTimeout (function (){$("#"+selectedButton).removeClass ("pressed");},100);
}

function soundPlay (selectedButton){
    var audio=new Audio ("./sounds/"+selectedButton+".mp3");
    audio.play();
}
function pauseSound (selectedButton){
    var audio=new Audio ("./sounds/"+selectedButton+".mp3");
    audio.pause();
}

function checkAnswer (currentSelected){
    if (userClickedPattern[currentSelected]===gamePattern[currentSelected]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout (function (){
                nextSequence();
                userClickedPattern=[];
            },1000)
        }
    }
    else {
        soundPlay("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){$("body").removeClass("game-over")},200);
        $("#level-title").text ("Game Over, Press Any Key to Restart");
        start=true;
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        $("body").keypress (function () {
            if (start){
            nextSequence();
            start=false;
            }
        });
    }
    
}
$("body").keypress (function () {
    if (start){
    nextSequence();
    start=false;
    }
});

$(".btn").click(
    function (){
        var userChoosenColor=$(this).attr("id");
        userClickedPattern.push(userChoosenColor);
        checkAnswer(userClickedPattern.length-1);
        soundPlay (userChoosenColor);
        changeColor (userChoosenColor);
    }
)
function nextSequence() {
    var randomlyselectedButton=randomSelector();
    gamePattern.push(randomlyselectedButton);
    changeColor(randomlyselectedButton);
   soundPlay(randomlyselectedButton);
     level++;
    var stringLevel=level.toString();
    $("#level-title").text ("LEVEL " +stringLevel);
  }






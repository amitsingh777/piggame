/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, activePlayer,roundScore,gameplay;
init();
function init(){

    scores=[0,0];
    activePlayer=0;
    roundScore=0;
    gameplay=true;
    
    document.querySelector(".dice").style.display="none";
    
    document.getElementById("score-0").textContent="0";
    document.getElementById("score-1").textContent="0";
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";
    document.querySelector("#name-0").textContent="PLAYER 1";
    document.querySelector("#name-1").textContent="PLAYER 2";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    
    document.querySelector(".player-0-panel").classList.add("active");
    


}


document.querySelector(".btn-roll").addEventListener("click",function(){
    if(gameplay){

        var dice,diceDom;
        dice=Math.floor(Math.random() *6) + 1;
        document.querySelector(".dice").style.display="block";
        diceDom=document.querySelector(".dice");
        diceDom.src="dice-"+dice+".png";
        if(dice !==1){
            roundScore +=dice;
            document.getElementById("current-"+activePlayer).textContent=roundScore;
           
        }
        else{
           nextPlayer();
        }
    }

});
function nextPlayer(){
    roundScore=0;
    document.getElementById("current-"+activePlayer).textContent="0";
    document.querySelector(".dice").style.display="none";
    document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("active");

    activePlayer === 0 ?activePlayer = 1: activePlayer = 0;
    document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("active");

}
document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gameplay){

    
    //round score should be added to global score
    scores[activePlayer] += roundScore;
    
    //update the ui
    document.querySelector("#score-"+activePlayer).textContent=scores[activePlayer];

    //check for the winner
    if(scores[activePlayer] >= 20){

        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        document.querySelector("#name-"+activePlayer).textContent="Winner !";
        gameplay=false;
    }
    else{
        nextPlayer();
    }
}
    
});
document.querySelector(".btn-new").addEventListener("click",init);
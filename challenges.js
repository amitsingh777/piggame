/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, activePlayer,roundScore,gameplay,diceInRow;
init();
function init(){

    scores=[0,0];
    activePlayer=0;
    roundScore=0;
    gameplay=true;
    
    document.querySelector("#dice-1").style.display="none";
    document.querySelector("#dice-2").style.display="none";
    
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

        var dice,dice2,diceDom;
        dice=Math.floor(Math.random() *6) + 1;  //dice-6 dice2=6 
        dice2=Math.floor(Math.random() *6) + 1;  //dice-6 dice2=6 
        
        document.querySelector("#dice-1").style.display="block";
        document.querySelector("#dice-2").style.display="block";
        diceDom=document.querySelector("#dice-1");
        diceDom2=document.querySelector("#dice-2");
        diceDom.src="dice-"+dice+".png";
        diceDom2.src="dice-"+dice2+".png";
        if(dice !==1 && dice2 !==1){
            roundScore +=(dice + dice2);
            document.getElementById("current-"+activePlayer).textContent=roundScore;
        }
        else if(dice ===1 || dice2 ===1){
          console.log(dice,dice2);
           nextPlayer();
        }
        // if (diceInRow === 6 && dice===6){
        //     scores[activePlayer]=0;
        //     roundScore=0;
        //     document.getElementById("current-"+activePlayer).textContent=roundScore;
        //     document.getElementById("score-"+activePlayer).textContent=scores[activePlayer];
            
        //     console.log(dice,diceInRow);
        // }
        // else if(dice !==1 ){
        //     roundScore +=dice;
        //     document.getElementById("current-"+activePlayer).textContent=roundScore;
        // }
        // else{
        //     nextPlayer();
        // }
        // diceInRow=dice;
    }

});
function nextPlayer(){
    roundScore=0;
    document.getElementById("current-"+activePlayer).textContent="0";
    document.querySelector("#dice-1").style.display="none";
    document.querySelector("#dice-2").style.display="none";
    document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("active");

    activePlayer === 0 ?activePlayer = 1: activePlayer = 0;
    document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("active");

}
document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gameplay){

    var winning;
    //round score should be added to global score
    scores[activePlayer] += roundScore;
    
    //update the ui
    document.querySelector("#score-"+activePlayer).textContent=scores[activePlayer];

    //check for the winner
    //input winning score
    winning=document.querySelector(".winning-score").value;
    if(scores[activePlayer] >= winning){

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
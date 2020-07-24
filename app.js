var scores, roundScore, activePlayer, activeStatus, prevDice, target

init();

//Click Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(activeStatus) {
    // Random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

    // Display the result
        var diceOneDOM = document.querySelector('.diceOne');
        diceOneDOM.style.display = 'block'; //Displays an element as a block element (like <p>)
        diceOneDOM.src = 'dice-' + diceOne + '.png';

        var diceTwoDOM = document.querySelector('.diceTwo');
        diceTwoDOM.style.display = 'block'; //Displays an element as a block element (like <p>)
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';

    // Update Round score if dice was not a 1 and did not roll two 6 in a row
        if (diceOne !== 1 && diceTwo !== 1 /*|| dice + prevDice !== 12*/) {
            roundScore += diceOne + diceTwo;
            //prevDice = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
     /*   else if (dice + prevDice == 12) {
            //If dice two 6 in a row, looses his entire score
            scores[activePlayer] = 0;
            //Update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } */
        else {
        
        //new Player
            nextPlayer();

        }
    }
} );

//Click Hold Button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(activeStatus) {
        //Add to Global score
        scores[activePlayer] += roundScore;
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if Player won the game
        if(scores[activePlayer] >= target) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.diceOne').style.display = 'none';
            document.querySelector('.diceTwo').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activeStatus = false;
            
        }
        else {
        //Next Player
        nextPlayer(); 
        }
    }

});

//Click new Game button
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    roundScore = 0;
  //  prevDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.diceOne').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';

};

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    activeStatus = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.diceOne').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    //Users can define the target score of the Game
    target = prompt("Up to wich score would you like to play?");
   // document.write(target);



};

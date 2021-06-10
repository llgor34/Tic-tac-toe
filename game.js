const turndiv = document.getElementById('turn');
const board = document.getElementById('board');
const boxes = document.querySelectorAll('.boxes');

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let claimedcells = new Array();
let xturn = true;
let gameinprogress = true;
let turnNumber = 0;

/* Those variables will have X and O combinations separetly */

let xcombination = new Array();
let ocombination = new Array();
let turn = xcombination;

/* Add event listeners to every cell */

boxes.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

/* Handles cell, at this stage is confirmed, that this cell has ben clicked for first time */

function handleCellPlayed(cell, value) {
    if(xturn) {
        cell.textContent = 'x';
        turndiv.innerHTML = "<h1>O's turn!</h1>";
        xcombination.push(value);
    }
    else {
        cell.textContent = 'o';
        turndiv.innerHTML = "<h1>X's turn!</h1>";
        ocombination.push(value);
    }
}

/* Handles click on any cell */

function handleCellClick() {

    let clickedcell = this.getAttribute('value');

    let freeCell = isCellFree(clickedcell);

    if(freeCell && gameinprogress) {

        handleCellPlayed(this, this.getAttribute('value'));
        
        claimedcells.push(clickedcell);

        /* variable which will store current player combination */

        if(xturn) {
            playercombination = xcombination;
        }
        else {
            playercombination = ocombination;
        }

        //If is a winner, end game with a winner

        if(isWinner(playercombination)) {

            let message = "";

            if(xturn) {
                message = 'Game Over! X won!';
            }
            else {
                message = 'Game Over! O won!';
            }

            turndiv.innerHTML = `<h1 class="gameover">${message}<br> <a href='#' onclick="restartGame()">Restart Game?</a></h1>`;
            
        }

        xturn = !xturn;

        turnNumber++;

        //If is a draw, end game with a draw
        isDraw();
        
    }

}

// Checks for draw

function isDraw() {

    if(turnNumber==9 && !(isWinner(playercombination))) {
        turndiv.innerHTML = `<h1 class="gameover">It's a draw<br> <a href='#' onclick="restartGame()">Restart Game?</a></h1>`;
        gameinprogress = false;
    }

}

/* Checks is Cell free */

function isCellFree(cell) {

    let freeCell = true;

    for(i=0; i<claimedcells.length; i++) {

        let claimedcell = claimedcells[i];

        if(cell == claimedcell) {
            freeCell = false;
        }

    }

    return freeCell;
}

/* Check if game has winner */

function isWinner(usercombination) {

    let winner = false;

    winningCombinations.forEach(combination => {

        let a = combination[0] + "";
        let b = combination[1] + "";
        let c = combination[2] + "";

        if(usercombination.includes(a) && usercombination.includes(b) && usercombination.includes(c)) {
            winner = true;
            gameinprogress = false;
        }

    });

    return winner;
}

/* This function resets game, simple by refreshing the page */

function restartGame() {
    location.reload();
}
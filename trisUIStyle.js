var origBoard;
const huPlayer = 'X'
const UIPlayer = 'O'
const Combo = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.box')
let statusPlayerTxt = document.getElementById('statusPlayer')
let restartBtn = document.getElementById('restartButton')
startgame()

function startgame(){
    origBoard = Array.from(Array(9).keys())
    /*console.log(origBoard)*/
    for(let i = 0; i<cells.length; i++){
        cells[i].innerText = ''
        cells[i].addEventListener('click', turnclick)
        statusPlayerTxt.innerHTML=''
    }
    
}

function turnclick(square){
    /*console.log(square.target.id)*/
    if(typeof origBoard[square.target.id] == 'number'){
        turn(square.target.id, huPlayer)
        if(!checkTie())
        {
            turn(bestSpot(), UIPlayer)
        }
    }
}

function turn(squareId, player){
    origBoard[squareId] = player
    document.getElementById(squareId).innerText = player
    checkWin(origBoard, player)
}

function checkWin(){
     for(let i = 0; i<Combo.length; i++)
    {
        let[a,b,c] = Combo[i]

        if (origBoard[a] === origBoard[b] && origBoard[b] === origBoard[c]) {
            if (origBoard[i] != UIPlayer) {
                statusPlayerTxt.innerHTML="HAI VINTO"
            }
            else{
                statusPlayerTxt.innerHTML="HAI PERSO"
            }

             for(let i = 0; i<cells.length; i++){
                cells[i].removeEventListener('click', turnclick)
            }

            return[a,b,c]
        }

        if (origBoard[b] === origBoard[a] && origBoard[a] === origBoard[c]) {
            if (origBoard[i] != UIPlayer) {
                statusPlayerTxt.innerHTML="HAI VINTO"
            } else{
                statusPlayerTxt.innerHTML="HAI PERSO"
            }

             for(let i = 0; i<cells.length; i++){
                cells[i].removeEventListener('click', turnclick)
            }

            return[a,b,c]
        }

        if (origBoard[c] === origBoard[b] && origBoard[b] === origBoard[a]) {
            if (origBoard[i] != UIPlayer) {
                statusPlayerTxt.innerHTML="HAI VINTO"
            } else{
                statusPlayerTxt.innerHTML="HAI PERSO"
            }

             for(let i = 0; i<cells.length; i++){
                cells[i].removeEventListener('click', turnclick)
            }

            return[a,b,c]
        }
    } 
    return false
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number')
}

function bestSpot(){
    return emptySquares()[0]
}

function checkTie(){
    if(emptySquares().length == 0){
        for(let i =0; i<cells.length; i++){
            cells[i].removeEventListener('click', turnclick)
        }
    }
}

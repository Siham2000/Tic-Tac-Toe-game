
const X_CLASS = "x"
const CIRCLE_CLASS = "o"
const WINNING_COMBANATION = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

]
const cellElement = document.querySelectorAll('[data-cell]')
const boardClass = document.getElementById('board')
const winningMessageTextElem=document.querySelector('[data-winning-message-text]')
const winningMessageElem=document.getElementById("winningMessage")
const resartButton = document.getElementById('restartButton')

let circleTurn ; 
startGame();


resartButton.addEventListener('click' , startGame)
function startGame(){

    circleTurn = false
    cellElement.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click' , handelClick)
        cell.addEventListener('click' , handelClick, {once :true} )
      })

      setBoardHoverClass();
      winningMessageElem.classList.remove('show')

      

}

function handelClick(e){

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
placeMark( cell , currentClass)
 if(checkWin(currentClass)){
endGame(false);
 } else if(isDraw()) {
endGame(true)
 } else {
    swapTurns();

    setBoardHoverClass();
 }

}

function endGame(draw){
if(draw){
    winningMessageTextElem.innerText = `Draw!`
} else{
    winningMessageTextElem.innerText = `${circleTurn ?"O's" :"X's"} Wins!`
}

winningMessageElem.classList.add('show')
}


function isDraw(){
    return [...cellElement].every(cell =>{
       return cell.classList.contains(CIRCLE_CLASS) ||
        cell.classList.contains(X_CLASS)
    })
}



function placeMark(cell , currentClass) {
cell.classList.add(currentClass)
}


function swapTurns(){
    circleTurn = !circleTurn
}

 function setBoardHoverClass(){
    boardClass.classList.remove(X_CLASS)
    boardClass.classList.remove(CIRCLE_CLASS)
     if(circleTurn){
        boardClass.classList.add(CIRCLE_CLASS)
     } else{
        boardClass.classList.add(X_CLASS)
     }
 }


 function checkWin(currentClass){
   return   WINNING_COMBANATION.some(combantion => {
       return combantion.every(index => {
           return cellElement[index].classList.contains(currentClass)
       })
   })
 }





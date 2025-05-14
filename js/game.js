'use strict'

 

const WALL = '&#8251;'

const FOOD = '&middot;'

const EMPTY = ' '

const LOSE = 'GAME OVER!!!'

const VICTORY = 'YOU WON!!!'

const POWER_FOOD  = '😎'

const CHERRY = '🍒'

var gCherryInterval

var gBoard

gCherryInterval = setInterval(generateCherry,15000)





const gGame = {

    score: 0,

    isOn: false ,

    isVictory:false ,

    foodCnt : 0

}

 

function init() {

    gGhosts = []

    gBoard = buildBoard()

    createPacman(gBoard)

    createGhosts(gBoard)

   

    renderBoard(gBoard, '.board-container')

    gGame.isOn = true

    closeModal()

}

 

function buildBoard() {

    const size = 10

    const board = []

 

    for (var i = 0; i < size; i++) {

        board.push([])

 

        for (var j = 0; j < size; j++) {

            board[i][j] = FOOD

            gGame.foodCnt++

           

            if (i === 0 || i === size - 1 ||

                j === 0 || j === size - 1 ||

                (j === 3 && i > 4 && i < size - 2)) {

                board[i][j] = WALL

                gGame.foodCnt--

            }

        }

    }

    board[1][1] = POWER_FOOD

    board[1][8] = POWER_FOOD

    board[8][1] = POWER_FOOD

    board[8][8] = POWER_FOOD

    gGame.foodCnt -=4

    return board

}

 

function updateScore(diff) {

    gGame.score += diff

 

      const elScore = document.querySelector('.score span')

    elScore.innerText = gGame.score

}

 

function gameOver() {

    console.log(gGame.isVictory)

    clearInterval(gGhostsInterval)

    clearInterval(gCherryInterval)

    gGame.isOn = false

    renderCell(gPacman.location,EMPTY)

    var msg = (gGame.isVictory)? 'YOU WON!!!':'YOU LOST!!!'

    openModal(msg)

}

 

function checkEmptyCells(){

      var emptyCells = []

      for (var i = 0 ; gBoard.length>i;i++){

            for(var j = 0 ; gBoard[i].length > j ;j++){

                  if(gBoard[i][j]===EMPTY){

                        emptyCells.push({i,j})

                  }

                       

            }

      }

      return emptyCells

}

 

function getRandCell(arr){

      var index = getRandomIntInclusive(0,arr.length-1)

      return arr[index]

}

 

function generateCherry(){

      var emptyCells = checkEmptyCells()

      if(!emptyCells) return

      var randCell = getRandCell(emptyCells)

      gBoard[randCell.i][randCell.j] = CHERRY

      renderCell(randCell,CHERRY)

 

}

 

function openModal(msg){

    const elModal = document.querySelector('.modal')

    elModal.innerHTML = msg

    elModal.style.display = 'block'

    const elRestart = document.querySelector('.restart')

    elRestart.style.display = 'block'

}

function closeModal(){

    const elModal = document.querySelector('.modal')

    elModal.style.display = 'none'

    const elRestart = document.querySelector('.restart')

    elRestart.style.display = 'none'

}
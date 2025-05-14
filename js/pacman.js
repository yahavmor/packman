'use strict'

 

const PACMAN = `<img class="img" src="img/gamer.png" />`

var gPacman

 

function createPacman(board) {

    gPacman = {

        location: { i: 5, j: 5 },

        isSuper: false,

        deg : 0

    }

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    gGame.foodCnt--

}

 

function movePacman(ev) {

    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)

    if(!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

   

    if (nextCell === WALL) return

   

    if (nextCell === GHOST){

      if(gPacman.isSuper) killGhost(nextLocation)

        else return gameOver()

    }

             

    if (nextCell === FOOD) {

        handleFood()

      }

      if (nextCell === CHERRY) {

            updateScore(10)

          }

      if(nextCell===POWER_FOOD){

            if(gPacman.isSuper)return

            handlePowerFood()

      }

      gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

      renderCell(gPacman.location, EMPTY)

 

      gPacman.location = nextLocation

      gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

      renderCell(gPacman.location, getPacmanHTML(gPacman.deg))

}

 

function getNextLocation(eventKeyboard) {

    var nextLocation = {

        i: gPacman.location.i,

        j: gPacman.location.j,

    }

 

    switch (eventKeyboard.key) {

        case 'ArrowUp':

            gPacman.deg = 90

            nextLocation.i -= 1

            break;

   

        case 'ArrowDown':

            gPacman.deg = -90

            nextLocation.i += 1

            break;

   

        case 'ArrowLeft':

            gPacman.deg = 0

            nextLocation.j -= 1

            break;

   

        case 'ArrowRight':

            gPacman.deg = 0

            nextLocation.j += 1

            break;

    }

    // TODO: figure out nextLocation

    return nextLocation

}

function getPacmanHTML(deg){

    return `<div style="transform:rotate(${deg}deg)">${PACMAN}</div>`

}

function handleFood(){

    gGame.foodCnt--

    updateScore(1)

    checkvictory()

}

function handlePowerFood(){

    gPacman.isSuper = true

    setTimeout(() => {

        reviveGhost()

        gPacman.isSuper = false

    }, 5000);

 

}

function checkvictory(){

    if(!gGame.foodCnt){

        gGame.isVictory = true

        gameOver()

 

    }

}

function killGhost(location){

    for(var i = 0 ; gGhosts.length>i ; i++){

        var ghost = gGhosts[i]

        if(ghost.location.i===location.i&&ghost.location.j===location.j){

            const deadGhost = gGhosts.splice(i,1)[0]

            checkBellyGhost(deadGhost)

            deadGhosts.push(deadGhost)

        }

           

 

    }

   

 

}

function checkBellyGhost(ghost){

    if(ghost.currCellContent===FOOD){

        gPacman.foodCnt++

        handleFood()

        ghost.currCellContent = EMPTY

    }

}

function reviveGhost(){

    for(var i  = 0 ; deadGhosts.length > i ; i++){

        const deadGhost = deadGhosts[i]

        gGhosts.push(deadGhost)

    }

    deadGhosts = []

}

 

 

 
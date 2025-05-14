'use strict'

 

const GHOST = 'ᗣ'

var gGhosts = []

var deadGhosts = []

var gGhostsInterval

 

function createGhosts(board) {

    gGhosts = []

    for(var i = 0; i < 3; i++){

        createGhost(board)

    }

    gGhostsInterval = setInterval(moveGhosts, 1000)

}

 

function createGhost(board) {

    const ghost = {

        location: { i: 3, j: 3 },

        color : getRandomColor(),

        currCellContent: FOOD,

    }

 

    gGhosts.push(ghost)

 

    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost,ghost.id)

}

     

 

function moveGhosts() {

    for(var i = 0; i < gGhosts.length; i++){

        moveGhost(gGhosts[i])

    }

}

 

function moveGhost(ghost) {

    const moveDiff = getMoveDiff()

    const nextLocation = {

        i: ghost.location.i + moveDiff.i,

        j: ghost.location.j + moveDiff.j,

    }

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

 

    if (nextCell === WALL || nextCell === GHOST) return

    if (nextCell === POWER_FOOD||nextCell === CHERRY) return  

    if (nextCell === PACMAN){

        if(gPacman.isSuper) return

        gameOver(LOSE)

        return

    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    renderCell(ghost.location, ghost.currCellContent)

    ghost.currCellContent = nextCell

    ghost.location = nextLocation

    gBoard[nextLocation.i][nextLocation.j] = GHOST

    renderCell(ghost.location, getGhostHTML(ghost))

}

 

function getMoveDiff() {

    const randNum = getRandomIntInclusive(1, 4)

 

    switch (randNum) {

        case 1: return { i: 0,  j: 1  }

        case 2: return { i: 1,  j: 0  }

        case 3: return { i: 0,  j: -1 }

        case 4: return { i: -1, j: 0  }

    }

}

 

function getGhostHTML(ghost) {

    const color = (gPacman.isSuper)? 'blue' : ghost.color

    return `<span style="color:${color}">${GHOST}</span>`

}

 

function changeGhostColor() {

      for (var i = 0; i < gGhosts.length; i++) {

          var gGhost = gGhosts[i]

          gGhost.color = 'blue'

          gGhost.isInDanger = true

      }

}

 

function resetGhostsColor() {

      for (var i = 0; i < gGhosts.length; i++) {

          var gGhost = gGhosts[i]

          gGhost.color = getRandomColor()

          gGhost.isInDanger = false

      }

}

 

function removeGhost(ghost){

      const index = gGhosts.indexOf(ghost)

      if(index>-1){

            gGhosts.splice(index,1)

      }

}

 
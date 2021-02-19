function init() {
  
  const grid = document.querySelector('.grid')
  // console.log(grid)
  
  const gameSpeed = 500
  
  const gridWidth = 10
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight

  const cells = []


  const tetrominoClass = 'tetromino'
  let tetrominoPosition = Math.floor((gridWidth / 2) - 1)
  const startingPosition = Math.floor((gridWidth / 2) - 1)


  function createGrid() {
    for (let i = 0; i < cellCount; i++ ) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cell.classList.add('cell')
      cells.push(cell)
    }
  }

  createGrid()


  console.log(cells.some(cell => cell.classList.contains('active')))

  function addTetromino(tetrominoPosition) {
    cells[tetrominoPosition].classList.add(tetrominoClass)
  }
  function removeTetromino(tetrominoPosition) {
    cells[tetrominoPosition].classList.remove(tetrominoClass)
  }


  // let gravityCount
  // function dropTetromino() {
  //   gravityCount = 0
  //   tetrominoPosition = startingPosition
  //   addTetromino(tetrominoPosition)
  //   const dropTimerId = setInterval(() => {  
  //     if (gravityCount < gridHeight - 1) {
  //       removeTetromino(tetrominoPosition)
  //       const currentPosition = tetrominoPosition
  //       const nextSpace = tetrominoPosition += gridWidth
  //       if (cells[nextSpace].classList.contains(tetrominoClass) === true){
  //         console.log('Check 2')
  //         cells[currentPosition].classList.add(tetrominoClass)
  //         console.log(cells[currentPosition].innerHTML)
  //         clearInterval(dropTimerId)
  //       } else {
  //         addTetromino(nextSpace)
  //       } 
  //       gravityCount++
  //     } else {
  //       console.log('Check 4',gravityCount)
  //       clearInterval(dropTimerId)
  //     }
  //   },gameSpeed)
  // }

  let gravityCount
  function dropTetromino() {
    tetrominoPosition = startingPosition
    gravityCount = 0
    const dropTimerId = setInterval(() => {  
      if (gravityCount < gridHeight - 1) {
        addTetromino(tetrominoPosition)
        removeTetromino(tetrominoPosition)
        // const currentPosition = tetrominoPosition
        const nextSpace = tetrominoPosition += gridWidth
        console.log('Check 1', nextSpace, tetrominoPosition)
        if (cells[nextSpace].classList.contains(tetrominoClass) === true  || (nextSpace + gridWidth) > cellCount - 1){
          console.log('Check 2')
          addTetromino(nextSpace)
          cells[nextSpace].classList.add(tetrominoClass)
          console.log(cells[nextSpace].innerHTML)
          tetrominoPosition = startingPosition
          gravityCount = 0
        } else {
          console.log('Check 3',nextSpace,nextSpace > cellCount - 1)
          addTetromino(nextSpace)
        } 
        gravityCount++
      }
    },gameSpeed)
  }

  dropTetromino()


  // ? every second active piece drops one space
  // ? only one active piece at a time - use a class
  // ? active piece begins middle of the top of the grid
  // ? piece becomes inactive when it reaches the bottom OR is blocked by another piece
  // ? new piece added when previous stops
  // ? pieces stop dropping if
    // ? No space at the top of the grid
    // ? The Stop button is pressed

  // setInterval
    // check cells for active class if not present:
      // add new piece middle top with active class
      // drop until can't move
      // remove active class + reset position
  
  // ! clearinterval if starting position has tetronimo class
  // ! clearinterval if stop button pressed





  // let numDrops = 0
  // const repeatDropId = setInterval(() => {
  //   if (numDrops <= 5) {
  //     console.log('Number of drops: ', numDrops)
  //     dropTetromino()
  //     numDrops++
  //   } else {
  //     clearInterval(repeatDropId)
  //   }
  // },10000)

  


  document.addEventListener('keyup', handleKeyUp)

  function handleKeyUp(event) {
    const key = event.keyCode
    // * 39 is right. 37 is left
    if (key === 39 && tetrominoPosition % gridWidth !== gridWidth - 1 && !cells[tetrominoPosition + 1].classList.contains(tetrominoClass) && tetrominoPosition + gridWidth <= cellCount - 1) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition++
    } else if (key === 37 && tetrominoPosition % gridWidth !== 0 && !cells[tetrominoPosition - 1].classList.contains(tetrominoClass) && tetrominoPosition + gridWidth <= cellCount - 1) {
      removeTetromino(tetrominoPosition)
      tetrominoPosition --
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition)
  }







}


window.addEventListener('DOMContentLoaded', init)
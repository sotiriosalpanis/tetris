function init() {
  
  const grid = document.querySelector('.grid')
  
  const gameSpeed = 100
  
  const gridWidth = 10
  const gridHeight = 20
  const cellCount = gridWidth * gridHeight

  const cells = []
  const cellSize = 25



  const tetrominoClass = 'tetromino'
  let tetrominoPosition = Math.floor((gridWidth / 2) - 1)
  const startingPosition = Math.floor((gridWidth / 2) - 1)


  function createGrid() {
    for (let i = 0; i < cellCount; i++ ) {
      const cell = document.createElement('div')
      cell.textContent = i
      cell.classList.add('cell')
      cell.style.width = `${cellSize - 2}px`
      cell.style.height = `${cellSize - 2}px`
      grid.style.width = `${gridWidth * cellSize}px`
      grid.style.height = `${gridHeight * cellSize}px`
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  createGrid()


  // ? Rotation https://www.w3schools.com/jsref/prop_style_transform.asp ?

  
  const shapes = []

  const next = document.querySelector('.next')

  class TetrominoShape {
    constructor(name,width,height,colour,blankTiles) {
      this.name = name
      this.width = width
      this.height = height
      this.colour = colour
      this.blankTiles = blankTiles
    }
    createShape() {
      const shapeGrid = document.createElement('div')
      shapeGrid.classList.add('shape')
      shapeGrid.style.width = `${this.width * cellSize}px`
      shapeGrid.style.height = `${this.height * cellSize}px`
      const shapeCellCount = this.width * this.height
      for (let i = 0; i < shapeCellCount; i++) {
        const shapeCell = document.createElement('div')
        shapeCell.textContent = i
        shapeCell.style.width = `${cellSize - 2}px`
        shapeCell.style.height = `${cellSize - 2}px`
        shapeCell.classList.add(this.name)
        if (!this.blankTiles.includes(i)) {
          shapeCell.classList.add(tetrominoClass)
          shapeCell.style.backgroundColor = `${this.colour}`
        }
      
        shapeGrid.appendChild(shapeCell)
      }
      next.appendChild(shapeGrid)
      console.log(shapeGrid)
    }
  }

  const square = new TetrominoShape('square',2,2,'yellow',[])
  const bar = new TetrominoShape('bar',4,1,'aqua',[])
  const tee = new TetrominoShape('tee',3,2,'purple',[0,2])
  const zed = new TetrominoShape('zed',3,2,'chartreuse',[0,5])
  const revZed = new TetrominoShape('revZed',3,2,'red',[2,3])
  const ell = new TetrominoShape('ell',3,2,'orange',[0,1])
  const  revEll = new TetrominoShape('revEll',3,2,'blue',[3,4])
  
  shapes.push(square)
  shapes.push(bar)
  shapes.push(tee)
  shapes.push(zed)
  shapes.push(revZed)
  shapes.push(ell)
  shapes.push(revEll)

  shapes[Math.floor(Math.random() * shapes.length)].createShape()

  function addTetromino(tetrominoPosition) {
    cells[tetrominoPosition].classList.add(tetrominoClass)
  }
  function removeTetromino(tetrominoPosition) {
    cells[tetrominoPosition].classList.remove(tetrominoClass)
  }

  let gravityCount
  function dropTetromino() {
    tetrominoPosition = startingPosition
    gravityCount = 0
    const dropTimerId = setInterval(() => {
      if (cells[startingPosition].classList.contains(tetrominoClass) || grid.classList.contains('stop-game')) {
        console.log('Game stopped')
        clearInterval(dropTimerId)
        grid.classList.remove('stop-game')
        cells.forEach(cell => cell.classList.remove(tetrominoClass))
      } else if (gravityCount < gridHeight) {
        addTetromino(tetrominoPosition)
        console.log(tetrominoPosition,gravityCount)
        removeTetromino(tetrominoPosition)
        // const currentPosition = tetrominoPosition
        const nextSpace = tetrominoPosition += gridWidth
        if ((nextSpace + gridWidth) > cellCount - 1 || cells[nextSpace + gridWidth].classList.contains(tetrominoClass) === true) {
          addTetromino(nextSpace)
          tetrominoPosition = startingPosition
          gravityCount = 0
        } else {
          addTetromino(nextSpace)
        } 
        gravityCount++
        console.log(gravityCount)
      }
    },gameSpeed)
  }

  

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

  // Buttons!
  const startButton = document.querySelector('#play')
  const stopButton = document.querySelector('#stop')
  startButton.addEventListener('click',dropTetromino)
  stopButton.addEventListener('click',stopGrid)

  function stopGrid(){
    if (window.confirm('Are you sure you want to stop the game? All progress will be lost')) {
      grid.classList.add('stop-game')
      console.log('Stop button',grid.classList)
    }
  }

  




}


window.addEventListener('DOMContentLoaded', init)
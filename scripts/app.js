function init() {
  
  const grid = document.querySelector('.grid')
  
  const gameSpeed = 500
  
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
    constructor(name,size,tiles) {
      this.name = name
      this.size = size
      this.tiles = tiles
    }
    createShape() {
      const shapeGrid = document.createElement('div')
      shapeGrid.classList.add('shape')
      shapeGrid.style.width = `${this.size * cellSize}px`
      shapeGrid.style.height = `${this.size * cellSize}px`
      const shapeCellCount = this.size * this.size
      for (let i = 0; i < shapeCellCount; i++) {
        const shapeCell = document.createElement('div')
        shapeCell.textContent = i
        shapeCell.style.width = `${cellSize - 2}px`
        shapeCell.style.height = `${cellSize - 2}px`
        shapeCell.classList.add(tetrominoClass)
        if (this.tiles[0].includes(i)) {
          shapeCell.classList.add(this.name)
          // shapeCell.style.backgroundColor = `${this.colour}`
        }
      
        shapeGrid.appendChild(shapeCell)
      }
      next.innerHTML += this.name
      next.appendChild(shapeGrid)
      
      return shapeGrid
    }
    createShapeArray() {
      const shapeArray = []
      for (let h = 0; h < this.size; h++) {
        if (h === 0) {
          for (let w = 0;w < this.size; w++) {
            shapeArray.push(startingPosition + w)
          }
        } else {
          for (let w = 0;w < this.size; w++) {
            shapeArray.push(startingPosition + (gridWidth * h) + w)
          }
        }
      }
      const tilesArray = []
      for (let r = 0; r < this.tiles[0].length; r++) {
        tilesArray.push(shapeArray[this.tiles[0][r]])
      }
      // console.log('tiles',tilesArray)
      return tilesArray
    }
  }
  const square = new TetrominoShape('square',4,[[0,1,4,5],[0,1,4,5],[0,1,4,5],[0,1,4,5]])
  const bar = new TetrominoShape('bar',4,[[4,5,6,7],[2,6,10,14],[8,9,10,11],[1,5,6,7]])
  const cross = new TetrominoShape('cross',3,[[1,3,4,5],[1,4,5,7],[3,4,5,7],[1,3,4,7]])
  const zed = new TetrominoShape('zed',3,[[1,2,3,4],[1,4,5,8],[4,5,6,7],[0,3,4,7]])
  const revZed = new TetrominoShape('revZed',3,[[0,1,4,5],[2,5,4,7],[3,4,7,8],[1,3,4,7]])
  const ell = new TetrominoShape('ell',3,[[3,4,5,2],[1,4,7,8],[3,4,5,6],[0,1,4,7]])
  const revEll = new TetrominoShape('revEll',3,[[0,3,4,5],[1,2,4,7],[3,4,5,8],[1,4,7,6]])
  
  shapes.push(square)
  shapes.push(bar)
  shapes.push(cross)
  shapes.push(zed)
  shapes.push(revZed)
  shapes.push(ell)
  shapes.push(revEll)


  function addTetromino(array,shape,orientation) {
    // console.log('Check 3',array)
    array.forEach(cell => {
      cells[cell].classList.add(tetrominoClass)
      cells[cell].classList.add(shape)
      cells[cell].classList.add(orientation)
    })
  }

  function removeTetromino(array,shape,orientation) {
    array.forEach(cell => {
      cells[cell].classList.remove(tetrominoClass)
      cells[cell].classList.remove(shape)
      cells[cell].classList.remove(orientation)
    })
  }

  const shapeToBeAdded = []
  const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
  shapeToBeAdded.push(nextShape)
  const activeShape = shapes[Math.floor(Math.random() * shapes.length)]
  shapeToBeAdded.push(activeShape)

  let arrayStartingPosition
  let shape
  let orientation

  function dropTetromino() {
    document.addEventListener('keyup', handleKeyUp)
    const shapeObject = shapeToBeAdded[0]
    shape = shapeToBeAdded[0].name
    orientation = 0
    const shapeUpNext = shapeToBeAdded[1]
    shapeUpNext.createShape()
    arrayStartingPosition = shapeObject.createShapeArray()
    tetrominoPosition = arrayStartingPosition
    const dropTimerId = setInterval(() => {
      if (cells[startingPosition].classList.contains('set') || grid.classList.contains('stop-game')) {
        console.log('Game stopped')
        clearInterval(dropTimerId)
        grid.classList.remove('stop-game')
        cells.forEach(cell => cell.classList.remove('square','bar','ell','revEll','cross','zed','revZed','set'))
        console.log('Some check 1: ',tetrominoPosition.some(space => space + gridWidth > cellCount - 1))
      } else if (tetrominoPosition.some(space => space + gridWidth > cellCount - 1) ) {
        addTetromino(tetrominoPosition,shape,orientation)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        shapeToBeAdded[1].createShape()
        orientation = 0
        console.log('Some check 2: ',tetrominoPosition.some(space => cells[space + gridWidth].classList.contains('set')))
      } else if (tetrominoPosition.some(space => cells[space + gridWidth].classList.contains('set'))) {
        addTetromino(tetrominoPosition,shape,orientation)
        tetrominoPosition.forEach(cell => {
          cells[cell].classList.add('set')
        })
        const nextShape = shapes[Math.floor(Math.random() * shapes.length)]
        shapeToBeAdded.push(nextShape)
        shapeToBeAdded.shift()
        tetrominoPosition = shapeToBeAdded[0].createShapeArray()
        shape = shapeToBeAdded[0].name
        shapeToBeAdded[1].createShape()
        orientation = 0
      } else {
        removeTetromino(tetrominoPosition,shape,orientation)
        const nextSpace = tetrominoPosition.map(cell => {
          cell += gridWidth
          return cell
        })
        addTetromino(nextSpace,shape,orientation)
        tetrominoPosition = nextSpace
      } 
    },gameSpeed)
  }



  

  function handleKeyUp(event) {
    const key = event.keyCode
    // * 39 is right. 37 is left. 38 is up.
    if (key === 39 && tetrominoPosition.every(cell => cell % gridWidth !== gridWidth - 1) && tetrominoPosition.every(cell => !cells[cell + 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
      removeTetromino(tetrominoPosition,shape,orientation)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell += 1
      })
    } else if (key === 37 && tetrominoPosition.every(cell => cell % gridWidth !== 0) && tetrominoPosition.every(cell => !cells[cell - 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
      removeTetromino(tetrominoPosition,shape)
      tetrominoPosition = tetrominoPosition.map(cell => {
        return cell -= 1
      })
    } else if (key === 38) {
      removeTetromino(tetrominoPosition,shape,orientation)
      if (orientation < 3){
        orientation = orientation + 1
      } else {
        orientation = 0
      }
      tetrominoPosition = createRotationArray(shape,orientation,tetrominoPosition)
    } else {
      console.log('Invalid key')
    }
    addTetromino(tetrominoPosition,shape,orientation)
  }

  function createRotationArray(shape,orientation,tetrominoPosition) {
    const shapeArray = []
    const rotationPosition = tetrominoPosition[0]
    const shapeObject = shapes.find(object => {
      return object.name === shape
    })
    for (let h = 0; h < shapeObject.size; h++) {
      if (h === 0) {
        for (let w = 0;w < shapeObject.size; w++) {
          shapeArray.push(rotationPosition + w)
        }
      } else {
        for (let w = 0;w < shapeObject.size; w++) {
          shapeArray.push(rotationPosition + (gridWidth * h) + w)
        }
      }
    }
    let tilesArray = []
    for (let r = 0; r < shapeObject.tiles[orientation].length; r++) {
      tilesArray.push(shapeArray[shapeObject.tiles[orientation][r]])
    }
    
    // const maxTile = tilesArray.sort(function(a,b) {return b - a })[0]
    console.log('Rotation array 0: ',tilesArray)

    if (tilesArray.some(tile => tile % gridWidth === 0) && tilesArray.some(tile => tile % gridWidth === gridWidth - 1)) {
      if (tetrominoPosition.some(tile => tile % gridWidth > 8)) {
        console.log('Check for problem')
        while (tilesArray.some(tile => tile % gridWidth === 0)) {
          console.log(tilesArray.some(tile => tile % gridWidth === 0))
          tilesArray = tilesArray.map(tile => {
            return tile -= 1
          })
        }

      }
    }

    console.log('OG array: ',tetrominoPosition)
    console.log('Rotation array 1: ',tilesArray)
    return tilesArray
  }

  // if (key === 39 && tetrominoPosition.every(cell => cell % gridWidth !== gridWidth - 1) && tetrominoPosition.every(cell => !cells[cell + 1].classList.contains('set')) && tetrominoPosition.every(cell => cell + gridWidth <= cellCount - 1)) {
  //   removeTetromino(tetrominoPosition,shape,orientation)
  //   tetrominoPosition = tetrominoPosition.map(cell => {
  //     return cell += 1
  //   })

  // Buttons!
  const startButton = document.querySelector('#play')
  const stopButton = document.querySelector('#stop')
  startButton.addEventListener('click',dropTetromino)
  stopButton.addEventListener('click',stopGrid)

  function stopGrid(){
    if (window.confirm('Are you sure you want to stop the game? All progress will be lost')) {
      grid.classList.add('stop-game')
    }
  }

  




}


window.addEventListener('DOMContentLoaded', init)
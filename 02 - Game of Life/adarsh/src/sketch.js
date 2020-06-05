let board
let rows
let cols
let scale = 10
let clearScreen = false
const backgroundColor = "#046307"

function start() {
  loop()
}

function pause() {
  noLoop()
}

function reset() {
  location.reload()
}

function isInsideBoard(nCol, nRow) {
  if (!(nCol < 0 || nCol >= this.cols) && !(nRow < 0 || nRow >= this.rows))
    return true
}

function mouseReleased() {
  x = floor(mouseX / scale)
  y = floor(mouseY / scale)
  if (isInsideBoard(x, y)) {
    board[x][y] = 1
    fill(255)
    stroke(backgroundColor)
    rect(x * scale, y * scale - 1, scale - 1)
  }
}

function draw() {
  background(backgroundColor)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j]) {
        fill(255)
        stroke(backgroundColor)
        if (!clearScreen) rect(i * scale, j * scale, scale - 1, scale - 1)
      }
    }
  }
  board = new GameOfLife(rows, cols, board).nextGeneration()
}

function setup() {
  canvas = createCanvas(800, 600)
  canvas.parent("sketch-holder")
  cols = width / scale
  rows = height / scale
  board = [...Array(cols).fill(0)].map(() => Array(rows).fill(0))
  // defaultPattern(board, rows, cols)
  pause()
}

function defaultPattern(board, rows, cols) {
  row = rows / 2 + 5
  col = cols / 2 - 10
  board[row + 1][col - 1] = 1
  board[row][col - 1] = 1
  board[row][col] = 1
  board[row][col + 1] = 1
  board[row - 1][col] = 1
}

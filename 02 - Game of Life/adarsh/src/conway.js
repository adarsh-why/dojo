class GameOfLife {
  constructor(rows, cols, board) {
    this.rows = rows
    this.cols = cols
    this.board = board
  }

  nextGeneration() {
    let next = [...Array(this.cols).fill(0)].map(() => Array(this.rows).fill(0))
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        let count = this.neighbors(col, row) - this.board[col][row]
        this.changeState(col, row, count, next)
      }
    }
    return next
  }

  neighbors(col, row) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        sum += this.isInsideBoard(col + i, row + j)
          ? this.board[col + i][row + j]
          : 0
      }
    }
    return sum
  }

  isInsideBoard(nCol, nRow) {
    if (!(nCol < 0 || nCol >= this.cols) && !(nRow < 0 || nRow >= this.rows))
      return true
  }

  changeState(col, row, count, next) {
    let state = board[col][row]
    if (state == 1 && (count < 2 || count > 3)) next[col][row] = 0
    else if (state == 0 && count == 3) next[col][row] = 1
    else next[col][row] = state
  }
}

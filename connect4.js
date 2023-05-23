/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *  board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT + 1; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  // creating a table row storing it in a variable
  const top = document.createElement("tr");

  // setting the tr with the an id and giving it the CSS of column top
  top.setAttribute("id", "column-top");

  // adding evt listener for the top of gameboard
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    // new variable for td element = WIDTH
    const headCell = document.createElement("td");

    // giving new variable an id of x
    headCell.setAttribute("id", x);

    // attaching var headCell to the top var
    top.append(headCell);
  }
  // attaching var top to the var htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code
  // looping through the HEIGHT variable
  for (let y = 0; y < HEIGHT; y++) {
    // creating a variable for Tabel Row Element * HEIGHT
    let row = document.createElement("tr");

    // looping through the WIDTH variable
    for (let x = 0; x < WIDTH; x++) {
      // creating a variable for Table Data element * WIDTH
      const cell = document.createElement("td");

      // setting the id of the of the cell var
      cell.setAttribute("id", `${y}-${x}`);

      // attaching the cell var to the row var
      row.append(cell);
    }
    // attching the var row to var htmlBoard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[x][y]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement("div");
  if (currPlayer === 1) {
    newDiv.classList.add("piece", "player1");
    newDiv.classList.add(`p${currPlayer}`);
  }
  if (currPlayer === 2) {
    newDiv.classList.add("piece", "player2");
    newDiv.classList.add(`p${currPlayer}`);
  }
  newDiv.style.top = -50 * (y + 2);
  const place = document.getElementById(`${y}-${x}`);
  place.append(newDiv);
}

/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[x][y] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Draw");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  // TODO: read and understand this code. Add comments to help you.
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

/**
 * get the m x n coordinates of the 8 surrounding cells for a given cell
 * @param {number} m - cell row
 * @param {number} n - cell column
 * @returns {number[8][]} the surrounding 8 cells for the given coordinates
 */
export const getCellNeighborCoordinates = (m, n) => [
  // clockwise from top left
  [m - 1, n - 1],
  [m - 1, n],
  [m - 1, n + 1],
  [m, n - 1],
  [m, n + 1],
  [m + 1, n - 1],
  [m + 1, n],
  [m + 1, n + 1],
];

/**
 * counts the number of 'live' neighbors given the neighbor coords and a matrix of cells
 * @param {number[][]} cellNeighborCoordinates - output of getCellNeighborCoordinates(). in the form [row, colum]
 * @param {boolean[][]} cellValues - m x n matrix of cells
 * @returns {number} number of 'live' neighbors
 */
export const getLiveNeighbors = (cellNeighborCoordinates, cellValues) =>
  cellNeighborCoordinates
    .map((coords) => cellValues[coords[0]] && cellValues[coords[0]][coords[1]])
    .filter((cell) => cell === true).length;

/**
 * 'age' an m x n matrix of cells by one period, according to the rules of Conway's Game of Life
 * @param {number[][]} cellValues - m x n matrix of cells
 * @returns {number[][]} the cellValues incremented according to the rules of Conway's Game of Life
 */
export const incrementCells = (cellValues) =>
  cellValues.map((row, m) =>
    row.map((cell, n) => {
      const liveNeighbors = getLiveNeighbors(
        getCellNeighborCoordinates(m, n),
        cellValues
      );

      if (cell === true) {
        if (liveNeighbors === 2 || liveNeighbors === 3) return true;
        else return false;
      } else {
        if (liveNeighbors === 3) return true;
        else return false;
      }
    })
  );

/**
 * takes in a semantic blueprint slug and a blank grid and returns a grid set in accordance with the blueprint
 * @param {{number: number[]}} blueprint - a blueprint slug. of the form { row: [each, column, occupied, in, row]}
 * @param {number[][]} grid - an m x n matrix
 * @returns
 */
export const setInitialCondition = (blueprint, grid) => {
  const blueprintMapping = Object.entries(blueprint)
    .map((entry) => {
      const row = Number.parseInt(entry[0]);
      const cols = entry[1];
      return [...cols.map((col) => [row, col])];
    })
    .flat();
  const gridCopy = grid.map((row) => row.slice()).slice();
  blueprintMapping.forEach((coord) => {
    gridCopy[coord[0]][coord[1]] = true;
  });
  return gridCopy;
};

/**
 * transforms a blueprint by a specified number of rows and columns
 * @param {number} rowOffset - number of rows to shift down by
 * @param {number} columnOffset - number of columns to shift to the right by
 * @param {{number: number[]}} blueprint - the blueprint to be transformed
 * @returns {{number: number[]}} transformed blueprint
 */
export const transformBlueprint = (rowOffset, columnOffset, blueprint) => {
  const newBlueprint = {};
  Object.entries(blueprint).forEach((entry) => {
    newBlueprint[Number.parseInt(entry[0]) + rowOffset] = entry[1].map(
      (col) => col + columnOffset
    );
  });
  return newBlueprint;
};

/**
 * checks the top row of a matrix to see if has at least one 'live' cell
 * @param {boolean[][]} cellValues - an m x n matrix of cells
 * @returns {boolean} whether the top row of the matrix contains a 'live' cell
 */
export const checkTopRow = (cellValues) => {
  const topRow = cellValues[0];
  for (let cell of topRow) {
    if (cell === true) return true;
  }
  return false;
};

export const checkLeftColumn = (cellValues) => {
  for (let i = 0; i < cellValues.length; i++) {
    if (cellValues[i][0] === true) return true;
  }
  return false;
};

export const checkRightColumn = (cellValues) => {
  const numColumns = cellValues[0].length;
  const numRows = cellValues.length;
  for (let i = 0; i < numRows; i++) {
    if (cellValues[i][numColumns - 1] === true) return true;
  }
  return false;
};

export const checkBottomRow = (cellValues) => {
  const bottomRow = cellValues[cellValues.length - 1];
  for (let i = 0; i < bottomRow.length; i++) {
    if (bottomRow[i] === true) return true;
  }
  return false;
};

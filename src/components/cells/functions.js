/**
 * get the m x n coordinates of the 8 surrounding cells for a given cell
 * @param {integer} m - cell row
 * @param {integer} n - cell column
 * @returns {integer[][]} the surrounding 8 cells for the given coordinates
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
 * find the number of 'live' neighbors given the neighbor coords and a matrix of cells
 * @param {integer[][]} cellNeighborCoordinates - output of getCellNeighborCoordinates(). in the form [row, colum]
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
  const gridCopy = grid.slice();
  blueprintMapping.forEach((coord) => (gridCopy[coord[0]][coord[1]] = true));
  return gridCopy;
};

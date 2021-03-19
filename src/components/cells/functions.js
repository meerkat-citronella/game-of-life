/**
 * get the m x n coordinates of the 8 surrounding cells for a given cell
 * @param {integer} m - cell row
 * @param {integer} n - cell column
 * @returns {integer[][]} - the surrounding 8 cells for the given coordinates
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
 * @param {integer[][]} cellNeighborCoordinates - output of getCellNeighborCoordinates()
 * @param {boolean[][]} cellValues - the complete set of cell values
 * @returns {number} - number of live neighbors
 */
export const getLiveNeighbors = (cellNeighborCoordinates, cellValues) =>
  cellNeighborCoordinates
    .map((coords) => cellValues[coords[0]] && cellValues[coords[0]][coords[1]])
    .filter((cell) => cell === true).length;

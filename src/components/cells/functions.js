/**
 * parses a key hash, using the format I am using ('m#n'), into its constiuent row, col coords.
 * @param {string} key - hashed key, representing coords of a cell on an m x n matrix. In the form m#n (ex: 21#42, which means row 21, col 42)
 * @returns { m: number, n: number} the m (row) and n (col) of the cell
 */
export const parseMxNKey = (key) => {
  const m = Number.parseInt(/-?\d+#/.exec(key)[0].replace("#", ""));
  const n = Number.parseInt(/#-?\d+/.exec(key)[0].replace("#", ""));
  return { m, n };
};

/**
 * get the m x n coordinates of the 8 surrounding cells for a given cell
 * @param {string} key - cell coords, in form m#n (i.e. 21#42)
 * @returns {string[]} the surrounding 8 cells for the given coordinates
 */
export const getCellNeighborCoordinates = (key) => {
  const { m, n } = parseMxNKey(key);
  return [
    // clockwise from top left
    `${m - 1}#${n - 1}`,
    `${m - 1}#${n}`,
    `${m - 1}#${n + 1}`,
    `${m}#${n - 1}`,
    `${m}#${n + 1}`,
    `${m + 1}#${n - 1}`,
    `${m + 1}#${n}`,
    `${m + 1}#${n + 1}`,
  ];
};

/**
 * 'age' an m x n matrix of cells by one period, according to the rules of Conway's Game of Life
 * @param {{string: bool}} cellValues - the 'live' cells of an m x n matrix
 * @returns {{string: bool}} the cellValues incremented according to the rules of Conway's Game of Life
 */
export const incrementCells = (cellValues) => {
  const neighbors = Object.keys(cellValues).reduce((acc, key) => {
    const neighborCellsToKey = getCellNeighborCoordinates(key); // get 8 surrounding neighbors
    neighborCellsToKey.forEach((coords) => {
      acc[coords] = acc[coords] ? acc[coords] + 1 : 1;
    });
    return acc;
  }, {});

  const newCellValues = Object.entries(neighbors).reduce((acc, cv) => {
    const coords = cv[0];
    const numLiveNeighbors = cv[1];
    const cellIsLive = cellValues[coords];
    if (cellIsLive) {
      if (numLiveNeighbors === 2 || numLiveNeighbors === 3) acc[coords] = true;
    } else {
      if (numLiveNeighbors === 3) acc[coords] = true;
    }
    return acc;
  }, {});

  return newCellValues;
};

/**
 * takes in a semantic blueprint slug and a blank grid and returns a grid set in accordance with the blueprint
 * @param {{number: number[]}} blueprint - a blueprint slug. of the form { row: [each, column, occupied, in, row]}
 * @param {number[][]} grid - the 'live' cells of m x n grid
 * @returns
 */
export const setInitialCondition = (blueprint, grid) => {
  const hashMap = {};
  Object.entries(blueprint).forEach((entry) => {
    const row = Number.parseInt(entry[0]);
    const cols = entry[1];
    cols.forEach((col) => {
      const key = `${row}#${col}`;
      hashMap[key] = true;
    });
  });
  return hashMap;
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

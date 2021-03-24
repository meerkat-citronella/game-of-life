import {
  GRID_HEIGHT,
  GRID_WIDTH,
  CELL_SIZE,
} from "./../../constants/constants";

/**
 * @type {number[][]} a blank (full of falses) GRID_HEIGHT x GRID_WIDTH matrix
 */
export const BLANK_GRID = [
  ...Array(Math.floor(GRID_HEIGHT / CELL_SIZE)),
].map(() => [...Array(Math.floor(GRID_WIDTH / CELL_SIZE))].map(() => false));

/**
 * @type {number[][]} a 2x2 stationary block
 */
export const blockBlueprint = {
  0: [0, 1],
  1: [0, 1],
};

/**
 * @type {{number: number[]}} blueprint for ten cell infinite growth pattern ('block-laying switch engine')
 */
export const tenCellInfiniteGrowthBlueprint = {
  1: [8],
  2: [6, 8, 9],
  3: [6, 8],
  4: [6],
  5: [4],
  6: [2, 4],
};

/**
 * @type {{number: number[]}} blueprint for Gosper Glider Gun
 */
export const gosperGliderGunBlueprint = {
  2: [26],
  3: [24, 26],
  4: [14, 15, 22, 23, 36, 37],
  5: [13, 17, 22, 23, 36, 37],
  6: [2, 3, 12, 18, 22, 23],
  7: [2, 3, 12, 16, 18, 19, 24, 26],
  8: [12, 18, 26],
  9: [13, 17],
  10: [14, 15],
};

/**
 * @type {{number: number[]}} blueprint for glider
 */
export const gliderBlueprint = {
  1: [2],
  2: [3],
  3: [1, 2, 3],
};

/**
 * @type {{number: number[]}} blueprint for glider
 */
export const backwardsGliderBlueprint = {
  1: [1, 2, 3],
  2: [3],
  3: [2],
};

export const toadBlueprint = {
  1: [2, 3, 4],
  2: [1, 2, 3],
};

export const beaconBlueprint = {
  1: [1, 2],
  2: [1, 2],
  3: [3, 4],
  4: [3, 4],
};

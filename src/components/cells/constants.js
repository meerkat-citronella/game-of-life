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

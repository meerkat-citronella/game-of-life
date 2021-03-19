import {
  GRID_HEIGHT,
  GRID_WIDTH,
  CELL_SIZE,
} from "./../../constants/constants";

/**
 * gets a mapping of lines start points, either vertical or horizontal
 * @param {string} horizOrVert - one of either "horizonal" or "vertical"
 * @returns {{key: string, x: number, y: number}[]} requested set of points
 */
export const getLines = (horizOrVert) =>
  [
    ...Array(
      Math.floor(
        (horizOrVert === "vertical" ? GRID_WIDTH : GRID_HEIGHT) / CELL_SIZE
      ) + 1
    ),
  ].map((_, i) => ({
    key: i.toString() + (horizOrVert === "vertical" ? "v" : "h"),
    x: horizOrVert === "vertical" ? i * CELL_SIZE : 0,
    y: horizOrVert === "horizontal" ? i * CELL_SIZE : 0,
  }));

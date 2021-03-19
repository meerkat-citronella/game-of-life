import React from "react";
import { Stage, Layer, Line } from "react-konva";

import { Cells } from "../cells/index";
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE } from "../../constants/constants";

/**
 * gets a mapping of lines, either vertical or horizontal
 * @param {string} horizOrVert - one of "horizonal" or "vertical"
 * @returns {Array} - requested set of points
 */
const getLines = (horizOrVert) =>
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

const verticalPoints = [0, 0, 0, GRID_HEIGHT];
const horizontalPoints = [0, 0, GRID_WIDTH, 0];

export const Grid = () => {
  return (
    <Stage width={GRID_WIDTH} height={GRID_HEIGHT}>
      <Layer>
        {getLines("vertical").map((line) => (
          <Line
            key={line.key}
            x={line.x}
            y={line.y}
            stroke="floralwhite"
            strokeWidth={1}
            points={verticalPoints}
          />
        ))}
        {getLines("horizontal").map((line) => (
          <Line
            key={line.key}
            x={line.x}
            y={line.y}
            stroke="floralwhite"
            strokeWidth={1}
            points={horizontalPoints}
          />
        ))}
        <Cells />
      </Layer>
    </Stage>
  );
};

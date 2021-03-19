import React from "react";
import { Stage, Layer, Line } from "react-konva";

import { getLines } from "./functions";
import { Cells } from "../cells/index";
import { GRID_HEIGHT, GRID_WIDTH } from "../../constants/constants";

const pointsToDrawVerticalLines = [0, 0, 0, GRID_HEIGHT];
const pointsToDrawHorizontalLines = [0, 0, GRID_WIDTH, 0];

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
            points={pointsToDrawVerticalLines}
          />
        ))}
        {getLines("horizontal").map((line) => (
          <Line
            key={line.key}
            x={line.x}
            y={line.y}
            stroke="floralwhite"
            strokeWidth={1}
            points={pointsToDrawHorizontalLines}
          />
        ))}
        <Cells />
      </Layer>
    </Stage>
  );
};

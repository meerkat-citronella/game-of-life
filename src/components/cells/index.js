import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

import { getCellNeighborCoordinates, getLiveNeighbors } from "./functions";
import { GRID_HEIGHT, GRID_WIDTH, CELL_SIZE } from "../../constants/constants";

const INITIAL_CONDITION = [
  ...Array(Math.floor(GRID_HEIGHT / CELL_SIZE)),
].map(() => [...Array(Math.floor(GRID_WIDTH / CELL_SIZE))].map(() => false));

INITIAL_CONDITION[5][5] = true;
INITIAL_CONDITION[5][6] = true;
INITIAL_CONDITION[5][7] = true;

INITIAL_CONDITION[10][10] = true;
INITIAL_CONDITION[10][11] = true;
INITIAL_CONDITION[10][12] = true;

export const Cells = () => {
  const [cellValues, setCellValues] = useState(INITIAL_CONDITION);

  // check cells on timer
  useEffect(() => {
    const intervalID = setInterval(() => {
      const newCellValues = cellValues.map((row, m) =>
        row.map((cell, n) => {
          const cellNeighborCoordinates = getCellNeighborCoordinates(m, n);
          const liveNeighbors = getLiveNeighbors(
            cellNeighborCoordinates,
            cellValues
          );

          if (cell === true) {
            if (liveNeighbors === 2 || liveNeighbors.length === 3) return true;
            else return false;
          } else if (cell === false) {
            if (liveNeighbors === 3) return true;
            else return false;
          }

          //   console.log(
          //     "cell:",
          //     m,
          //     n,
          //     "\ncell value:",
          //     cell,
          //     "\nlive neighbors:",
          //     liveNeighbors
          //   );
        })
      );

      setCellValues(newCellValues);
    }, 1000);
    return () => clearInterval(intervalID);
  }, [cellValues, setCellValues]);

  return cellValues.map((row, m) =>
    row.map(
      (cell, n) =>
        cell === true && (
          <Rect
            key={`row${m}-column${n}`}
            x={n * CELL_SIZE}
            y={m * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="red"
          />
        )
    )
  );
};

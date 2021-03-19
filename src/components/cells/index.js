import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

import { incrementCells, setInitialCondition } from "./functions";
import { CELL_SIZE } from "../../constants/constants";
import { BLANK_GRID } from "./constants";

const tenCellInfiniteGrowthBlueprint = {
  5: [2, 8],
  6: [6, 8, 9],
  7: [6, 8],
  8: [6],
  9: [4],
  10: [2, 4],
};

const TenCellInfiniteGrowth = setInitialCondition(
  tenCellInfiniteGrowthBlueprint,
  BLANK_GRID
);

export const Cells = () => {
  const [cellValues, setCellValues] = useState(TenCellInfiniteGrowth);

  // increment cells on interval
  useEffect(() => {
    const intervalID = setInterval(() => {
      const newCellValues = incrementCells(cellValues);
      setCellValues(newCellValues);
    }, 200);
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

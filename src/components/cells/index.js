import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

import {
  incrementCells,
  setInitialCondition,
  transformBlueprint,
} from "./functions";
import { CELL_SIZE } from "../../constants/constants";
import {
  BLANK_GRID,
  tenCellInfiniteGrowthBlueprint,
  gosperGliderGunBlueprint,
} from "./constants";

const tenCellInfiniteGrowth = setInitialCondition(
  transformBlueprint(30, 30, tenCellInfiniteGrowthBlueprint),
  BLANK_GRID
);

const gosperGliderGun = setInitialCondition(
  gosperGliderGunBlueprint,
  BLANK_GRID
);

export const Cells = () => {
  const [cellValues, setCellValues] = useState(gosperGliderGun);

  // increment cells on interval
  useEffect(() => {
    const intervalID = setInterval(() => {
      const newCellValues = incrementCells(cellValues);
      setCellValues(newCellValues);
    }, 100);
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

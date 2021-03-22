import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

import {
  incrementCells,
  setInitialCondition,
  transformBlueprint,
  checkEdgesAndAddExtraRowsOrColumns,
} from "./functions";
import { CELL_SIZE } from "../../constants/constants";
import {
  BLANK_GRID,
  tenCellInfiniteGrowthBlueprint,
  gosperGliderGunBlueprint,
  blockBlueprint,
} from "./constants";

// setup
const tenCellInfiniteGrowth = setInitialCondition(
  transformBlueprint(30, 30, tenCellInfiniteGrowthBlueprint),
  BLANK_GRID
);

const gosperGliderGun = setInitialCondition(
  gosperGliderGunBlueprint,
  BLANK_GRID
);

const block = setInitialCondition(blockBlueprint, BLANK_GRID);

const rightBlock = setInitialCondition(
  transformBlueprint(0, 98, blockBlueprint),
  BLANK_GRID
);

const bottomBlock = setInitialCondition(
  transformBlueprint(68, 0, blockBlueprint),
  BLANK_GRID
);

export const Cells = ({ displayOffset, setDisplayOffset }) => {
  const [cellValues, setCellValues] = useState(gosperGliderGun);

  console.log("displayOffset:", displayOffset);

  // move pattern forward
  useEffect(() => {
    const intervalID = setInterval(() => {
      // check edges, add if necessary
      const {
        cellValues: newCellValues,
        displayOffset: newDisplayOffset, // get new offsets
      } = checkEdgesAndAddExtraRowsOrColumns(
        // increment pattern
        incrementCells(cellValues),
        displayOffset
      );

      setDisplayOffset(newDisplayOffset);
      setCellValues(newCellValues);
    }, 100);
    return () => clearInterval(intervalID);
  }, [cellValues, displayOffset, setCellValues, setDisplayOffset]);

  return cellValues.map((row, m) =>
    row.map((cell, n) => {
      if (cell === true) {
        const adjustedRow = m - displayOffset.m;
        const adjustedColumn = n - displayOffset.n;
        return (
          <Rect
            key={`row${adjustedRow}RECT-column${adjustedColumn}`}
            x={adjustedColumn * CELL_SIZE}
            y={adjustedRow * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="goldenrod"
          />
        );
      } else return null;
    })
  );
};

import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

import {
  incrementCells,
  setInitialCondition,
  transformBlueprint,
  checkTopRow,
  checkLeftColumn,
  checkRightColumn,
  checkBottomRow,
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

/**
 * checks the borders of the passed m x n matrix, if there are live cells on any of the edges, it adds a row or column to that edge.
 * @param {boolean[][]} cellValues - an m x n matrix of cells
 * @returns {boolean[][]} the modified m x n matrix
 */
const checkEdgesAndAddExtraRowsOrColumns = (cellValues, displayOffsets) => {
  // check edges, add if necessary
  const newTop = checkTopRow(cellValues);
  const newLeft = checkLeftColumn(cellValues);
  const newRight = checkRightColumn(cellValues);
  const newBottom = checkBottomRow(cellValues);

  const blankRow = Array(cellValues[0].length).fill(false);
  if (newTop) cellValues.unshift(blankRow);
  if (newLeft) {
    cellValues.forEach((row) => row.unshift(false));
  }
  if (newRight) {
    cellValues.forEach((row) => row.push(false));
  }
  if (newBottom) cellValues.push(blankRow);

  // adjust offset
  if (newTop) displayOffsets.m = displayOffsets.m + 1;
  if (newLeft) displayOffsets.n = displayOffsets.n + 1;

  return { cellValues, displayOffsets };
};

export const Cells = ({ displayOffset, setDisplayOffset }) => {
  const [cellValues, setCellValues] = useState(gosperGliderGun);

  // increment cells on interval
  useEffect(() => {
    const intervalID = setInterval(() => {
      // check edges, add if necessary
      const {
        cellValues: newCellValues,
        displayOffsets: newDisplayOffsets, // get new offsets
      } = checkEdgesAndAddExtraRowsOrColumns(
        // increment pattern
        incrementCells(cellValues),
        displayOffset
      );

      setDisplayOffset(newDisplayOffsets);
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
      }
    })
  );
};

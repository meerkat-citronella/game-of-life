import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

import {
  incrementCells,
  setInitialCondition,
  transformBlueprint,
  parseMxNKey,
} from "./functions";
import { CELL_SIZE } from "../../constants/constants";
import {
  BLANK_GRID,
  tenCellInfiniteGrowthBlueprint,
  gosperGliderGunBlueprint,
  blockBlueprint,
  gliderBlueprint,
  backwardsGliderBlueprint,
  toadBlueprint,
  beaconBlueprint,
} from "./constants";

// setup
const tenCellInfiniteGrowth = setInitialCondition(
  transformBlueprint(30, 30, tenCellInfiniteGrowthBlueprint),
  BLANK_GRID
);

const gosperGliderGun = setInitialCondition(
  transformBlueprint(30, 30, gosperGliderGunBlueprint),
  BLANK_GRID
);

const glider = setInitialCondition(gliderBlueprint, BLANK_GRID);
const backwardsGlider = setInitialCondition(
  backwardsGliderBlueprint,
  BLANK_GRID
);
const toad = setInitialCondition(toadBlueprint, BLANK_GRID);
const beacon = setInitialCondition(beaconBlueprint, BLANK_GRID);

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

  // move pattern forward
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCellValues((prevCellValues) => incrementCells(prevCellValues));
    }, 100);
    return () => clearInterval(intervalID);
  }, [cellValues, setCellValues]);

  return Object.keys(cellValues).map((key) => {
    const { m, n } = parseMxNKey(key);
    const adjustedRow = m - displayOffset.m;
    const adjustedColumn = n - displayOffset.n;
    return (
      <Rect
        key={`row${adjustedRow}-column${adjustedColumn}`}
        x={adjustedColumn * CELL_SIZE}
        y={adjustedRow * CELL_SIZE}
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill="goldenrod"
      />
    );
  });
};

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
  transformBlueprint(30, 30, tenCellInfiniteGrowthBlueprint)
);
const gosperGliderGun = setInitialCondition(
  transformBlueprint(30, 30, gosperGliderGunBlueprint)
);
const glider = setInitialCondition(gliderBlueprint);
const backwardsGlider = setInitialCondition(backwardsGliderBlueprint);
const toad = setInitialCondition(toadBlueprint);
const beacon = setInitialCondition(beaconBlueprint);
const block = setInitialCondition(blockBlueprint);
const rightBlock = setInitialCondition(
  transformBlueprint(0, 98, blockBlueprint)
);
const bottomBlock = setInitialCondition(
  transformBlueprint(68, 0, blockBlueprint)
);

export const Cells = ({ displayOffset }) => {
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

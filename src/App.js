import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { Grid } from "./components/grid/index";
import { Cells } from "./components/cells/index";
import { PanDisplayButtons } from "./components/buttons";
import {
  GAME_CONTAINER_HEIGHT,
  GAME_CONTAINER_WIDTH,
} from "./constants/constants";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgb(16, 22, 47);
  padding: 40px;
`;

const GameContainer = styled.div`
  max-height: ${GAME_CONTAINER_HEIGHT}px;
  max-width: ${GAME_CONTAINER_WIDTH}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgb(20, 28, 58);
  border: 1px solid rgb(45, 93, 204);
  border-radius: 5px;
  color: white;
  padding: 20px;
`;

function App() {
  const [displayOffset, setDisplayOffset] = useState({ m: 0, n: 0 });

  return (
    <PageContainer>
      <GameContainer>
        <PanDisplayButtons
          displayOffset={displayOffset}
          setDisplayOffset={setDisplayOffset}
        />
        <Grid>
          <Cells
            displayOffset={displayOffset}
            setDisplayOffset={setDisplayOffset}
          />
        </Grid>
      </GameContainer>
    </PageContainer>
  );
}

export default App;

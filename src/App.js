import React from "react";
import "./App.css";
import styled from "styled-components";
import { Grid } from "./Grid";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgb(16, 22, 47);
  padding: 40px;
`;

const GameContainer = styled.div`
  height: 700px;
  width: 700px;
  background-color: rgb(20, 28, 58);
  border: 1px solid rgb(45, 93, 204);
  border-radius: 5px;
  color: white;
`;

function App() {
  return (
    <PageContainer>
      <GameContainer>
        <Grid />
      </GameContainer>
    </PageContainer>
  );
}

export default App;

import React from "react";
import { Icon, Button } from "@blueprintjs/core";

export const PanDisplayButtons = ({ setDisplayOffset }) => {
  const panRight = () => {
    setDisplayOffset((prev) => ({ ...prev, n: prev.n + 1 }));
  };
  const panLeft = () => {
    setDisplayOffset((prev) => ({ ...prev, n: prev.n - 1 }));
  };
  const panDown = () => {
    setDisplayOffset((prev) => ({ ...prev, m: prev.m + 1 }));
  };
  const panUp = () => {
    setDisplayOffset((prev) => ({ ...prev, m: prev.m - 1 }));
  };

  return (
    <div>
      <p>
        Pan:{"  "}
        <Button onClick={panLeft}>
          <Icon icon={"arrow-left"} />
        </Button>
        <Button onClick={panRight}>
          <Icon icon={"arrow-right"} />
        </Button>
        <Button onClick={panDown}>
          <Icon icon={"arrow-down"} />
        </Button>
        <Button onClick={panUp}>
          <Icon icon={"arrow-up"} />
        </Button>{" "}
      </p>
    </div>
  );
};

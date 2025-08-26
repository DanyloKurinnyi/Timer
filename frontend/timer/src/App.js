import React, { useState } from "react";
import Timer from "./component/components/timer/timer";
import StartButton from "./component/components/startButton/startButton";
import { startTest } from "../src/component/services/api";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = async () => {
    try {
      await startTest();
      setIsStarted(true);
    } catch (err) {
      console.error("Could not start:", err);
    }
  };

  return (
    <div>
      {!isStarted ? (
        <StartButton onClick={handleStart} />
      ) : (
        <Timer />
      )}
    </div>
  );
}

export default App;

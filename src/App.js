import React, { useState } from "react";
import Button from "./components/Button";
import "./App.css";

const buttonRows = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

function App() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [justEvaluated, setJustEvaluated] = useState(false);

  return (
    <main className="App">
      <section className="calculator" aria-label="Calculator">
        <output className="display" aria-live="polite" aria-atomic="true">
          {display}
        </output>
        <div className="buttons">
          {buttonRows.map((row, rowIndex) => (
            <div className="buttonContainer" key={rowIndex}>
              {row.map((label) => (
                <Button
                  key={label}
                  text={label}
                  display={display}
                  setDisplay={setDisplay}
                  equation={equation}
                  setEquation={setEquation}
                  justEvaluated={justEvaluated}
                  setJustEvaluated={setJustEvaluated}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;

import React from "react";

const OPERATORS = ["+", "-", "x", "÷"];

const evaluateExpression = (expression) => {
  const input = expression.replace(/x/g, "*").replace(/÷/g, "/").replace(/\s+/g, "");
  let position = 0;

  const parseNumber = () => {
    const match = input.slice(position).match(/^(?:\d+\.?\d*|\.\d+)/);
    if (!match) throw new Error("Invalid expression");
    position += match[0].length;
    return Number(match[0]);
  };

  const parseUnary = () => {
    if (input[position] === "+") {
      position += 1;
      return parseUnary();
    }
    if (input[position] === "-") {
      position += 1;
      return -parseUnary();
    }
    return parseNumber();
  };

  const parseTerm = () => {
    let value = parseUnary();
    while (input[position] === "*" || input[position] === "/") {
      const operator = input[position];
      position += 1;
      const right = parseUnary();
      if (operator === "/" && right === 0) {
        throw new Error("Cannot divide by zero");
      }
      value = operator === "*" ? value * right : value / right;
    }
    return value;
  };

  const parseExpression = () => {
    let value = parseTerm();
    while (input[position] === "+" || input[position] === "-") {
      const operator = input[position];
      position += 1;
      const right = parseTerm();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  };

  if (!input) throw new Error("Empty expression");
  const result = parseExpression();
  if (position !== input.length || !Number.isFinite(result)) {
    throw new Error("Invalid expression");
  }
  return Number(result.toPrecision(12));
};

const Button = ({
  text,
  setDisplay,
  display,
  equation,
  setEquation,
  justEvaluated,
  setJustEvaluated,
}) => {
  const commit = (nextExpression) => {
    setEquation(nextExpression);
    setDisplay(nextExpression || "0");
    setJustEvaluated(false);
  };

  const handleClick = () => {
    if (text === "AC") {
      setEquation("");
      setDisplay("0");
      setJustEvaluated(false);
      return;
    }

    let expression = justEvaluated ? display : equation;

    if (/^\d$/.test(text) || text === ".") {
      if (justEvaluated) expression = "";
      const tokens = expression.trim() ? expression.trim().split(/\s+/) : [];
      const last = tokens[tokens.length - 1] || "";

      if (text === "." && last.includes(".")) return;

      if (OPERATORS.includes(last)) {
        expression = `${expression}${expression.endsWith(" ") ? "" : " "}${text === "." ? "0." : text}`;
      } else if (last === "0" && text !== ".") {
        expression = expression.slice(0, -1) + text;
      } else if (!last) {
        expression = text === "." ? "0." : text;
      } else {
        expression += text;
      }
      commit(expression);
      return;
    }

    if (text === "+/-") {
      if (!expression.trim()) {
        commit("-0");
        return;
      }
      const tokens = expression.trim().split(/\s+/);
      const last = tokens[tokens.length - 1];
      if (OPERATORS.includes(last)) {
        if (last === "-" && tokens.length > 1 && OPERATORS.includes(tokens[tokens.length - 2])) return;
        expression = `${expression}${expression.endsWith(" ") ? "" : " "}-`;
      } else {
        const toggled = last.startsWith("-") ? last.slice(1) : `-${last}`;
        tokens[tokens.length - 1] = toggled;
        expression = tokens.join(" ");
      }
      commit(expression);
      return;
    }

    if (text === "%") {
      const tokens = expression.trim().split(/\s+/);
      const last = tokens[tokens.length - 1];
      if (!last || OPERATORS.includes(last)) return;
      const percentValue = Number(last) / 100;
      if (!Number.isFinite(percentValue)) return;
      tokens[tokens.length - 1] = String(Number(percentValue.toPrecision(12)));
      commit(tokens.join(" "));
      return;
    }

    if (OPERATORS.includes(text)) {
      if (!expression.trim()) {
        if (text === "-") commit("-");
        return;
      }
      const tokens = expression.trim().split(/\s+/);
      const last = tokens[tokens.length - 1];
      if (OPERATORS.includes(last)) {
        if (last === "-" && tokens.length > 1 && OPERATORS.includes(tokens[tokens.length - 2])) {
          tokens.splice(-2, 2, text);
        } else {
          tokens[tokens.length - 1] = text;
        }
        expression = tokens.join(" ") + " ";
      } else {
        expression = `${expression} ${text} `;
      }
      commit(expression);
      return;
    }

    if (text === "=") {
      if (!expression.trim() || OPERATORS.includes(expression.trim().split(/\s+/).at(-1))) return;
      try {
        const result = evaluateExpression(expression);
        const resultText = String(result);
        setEquation(resultText);
        setDisplay(resultText);
        setJustEvaluated(true);
      } catch (error) {
        setEquation("");
        setDisplay("Error");
        setJustEvaluated(true);
      }
    }
  };

  return (
    <button
      type="button"
      className="button"
      aria-label={text === "÷" ? "Divide" : text === "x" ? "Multiply" : text}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;

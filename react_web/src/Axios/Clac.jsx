

import React, { useState } from "react";

function Calc() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const calculate = (operation) => {
    const n1 = Number(num1);
    const n2 = Number(num2);

    let res;

    switch (operation) {
      case "add":
        res = n1 + n2;
        break;
      case "sub":
        res = n1 - n2;
        break;
      case "mul":
        res = n1 * n2;
        break;
      case "div":
        res = n2 !== 0 ? n1 / n2 : "Cannot divide by zero";
        break;
      default:
        res = "Invalid operation";
    }

    setResult(res);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Simple Calculator</h2>

<input type="number" placeholder="Enter first number" 
value={num1} onChange={(e) => setNum1(e.target.value)}/><br/>

<input type="number" placeholder="Enter second number" value={num2}
onChange={(e) => setNum2(e.target.value)} />

<br /><br />

      <button onClick={() => calculate("add")}>Add</button>
      <button onClick={() => calculate("sub")}>Subtract</button>
      <button onClick={() => calculate("mul")}>Multiply</button>
      <button onClick={() => calculate("div")}>Divide</button>

      <h3>Result: {result}</h3>
    </div>
  );
}

export default Calc;
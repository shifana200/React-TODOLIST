
//counter using usecallback

import React, { useState, useCallback } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  });

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  });

  return (
    <div>
      <h2>count:{count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default Counter;



//---------------------------------------------------------
//to do list using usereducer

import React, { useReducer, useState } from "react";
const reducer = (state, action) => {
  if (action.type === "ADD") {
    return [...state, action.value];
  }
  return state;
};

function App() {
  const [items, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  const addItem = () => {
    if (text) {
      dispatch({ type: "ADD", value: text });
      setText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addItem}>add</button>
      {items.map((item, i) => (
        <p key={i}>
          {i}.{item}
        </p>
      ))}
    </div>
  );
}

export default App;



//---------------------------------------------------------
//squaring a number using useMemo

import React, { useState, useMemo } from "react";

function squareCalculator() {
  const [number, setNumber] = useState();

  const squared = useMemo(() => {
    return number * number;
  }, [number]);
  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <h2>number: {number}</h2>
      <h3>squared: {squared}</h3>
    </div>
  );
}
export default squareCalculator;



//---------------------------------------------------------
//calculator using usecontext
//calculatorContext.js

import React, { useState, createContext, useContext } from 'react';


const CalculatorContext = createContext();


function CalculatorProvider({ children }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(null);

  const add = () => setResult(num1 + num2);
  const subtract = () => setResult(num1 - num2);
  const multiply = () => setResult(num1 * num2);
  const divide = () => setResult(num2 !== 0 ? num1 / num2 : 'Error');

  return (
    <CalculatorContext.Provider value={{
      num1, setNum1,
      num2, setNum2,
      result,
      add, subtract, multiply, divide
    }}>
      {children}
    </CalculatorContext.Provider>
  );
}

//calculator.js
function Calculator() {
  const {
    num1, setNum1,
    num2, setNum2,
    result,
    add, subtract, multiply, divide
  } = useContext(CalculatorContext);

  return (
    <div>
      <h2>Simple Calculator (useContext)</h2>
      <input
        type="number"
        value={num1}
        onChange={e => setNum1(Number(e.target.value))}
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={e => setNum2(Number(e.target.value))}
        placeholder="Enter second number"
      />
      <div>
        <button onClick={add}>+</button>
        <button onClick={subtract}>-</button>
        <button onClick={multiply}>×</button>
        <button onClick={divide}>÷</button>
      </div>
      <h3>Result: {result !== null ? result : 'N/A'}</h3>
    </div>
  );
}

// app.js
export default function App() {
  return (
    <CalculatorProvider>
      <Calculator />
    </CalculatorProvider>
  );
}




//---------------------------------------------------------
//fetching a data using useeffect

import React, { useEffect, useState } from "react";

function userList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error fetching", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>list</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {users.map((user) => {
            return  <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
export default userList;


//---------------------------------------------------------

//Change the colour of the text dynamically using useRef

import React, { useRef } from "react";

export default function App() {
  const textRef = useRef(); // Step 1: Create a reference

  const changeColor = () => {
    textRef.current.style.color = "red"; // Step 2: Change DOM directly
  };

  return (
    <div>
      <h2 ref={textRef}>This is a text</h2> {/* Step 3: Attach ref */}
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}




//---------------------------------------------------------
//calculator using usereducer

import React, { useReducer, useState } from "react";

// Step 1: Reducer function
const calculatorReducer = (state, action) => {
  const { num1, num2 } = action;
  switch (action.type) {
    case "ADD":
      return num1 + num2;
    case "SUB":
      return num1 - num2;
    case "MUL":
      return num1 * num2;
    case "DIV":
      return num2 !== 0 ? num1 / num2 : "Cannot divide by 0";
    default:
      return state;
  }
};

export default function App() {
  // Step 2: useReducer for result
  const [result, dispatch] = useReducer(calculatorReducer, 0);

  // Step 3: State for inputs
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  return (
    <div>
      <h2>Simple Calculator</h2>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(Number(e.target.value))}
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(Number(e.target.value))}
      />
      <br />
      <button onClick={() => dispatch({ type: "ADD", num1, num2 })}>+</button>
      <button onClick={() => dispatch({ type: "SUB", num1, num2 })}>-</button>
      <button onClick={() => dispatch({ type: "MUL", num1, num2 })}>*</button>
      <button onClick={() => dispatch({ type: "DIV", num1, num2 })}>/</button>
      <h3>Result: {result}</h3>
    </div>
  );
}



//---------------------------------------------------------
//
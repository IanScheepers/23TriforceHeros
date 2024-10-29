import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

    const [count, setCount] = useState(0);
    const [name, setName] = useState("test");

    return (
        <div className="App">
            <h1>React Counter</h1>
            <p>Current count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increase
                Count</button>
            <button onClick={() => setCount(count - 1)}>Decrease
                Count</button>
        </div>
  );
}

export default App;

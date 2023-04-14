import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Counter } from './components/Counter';
import { Stopwatch } from './components/Stopwatch';

function App() {
  return (
    <div className="App">
    <Counter/>
    <Stopwatch/>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import DualHandleRangeInput from './pen1/DualHandleRangeInput';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{width:"50%", marginLeft:"auto", marginRight:"auto", marginTop:"14%"}}>
          <DualHandleRangeInput></DualHandleRangeInput>
        </div>
      </header>
    </div>
  );
}

export default App;

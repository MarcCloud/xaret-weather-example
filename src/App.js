import * as React from 'xaret';
import logo from './logo.svg';
import Widget from './widget';
import Atom from './util/atom';
import './App.css';
const input$ = Atom('');
const Widget1 = ({...props}) => <Widget xaret-lift {...props} />
const updateLocation =  (e) => input$.modify(()=> e.target.value);
const App = (state) => (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" onChange={ updateLocation } />
          <Widget1 zipCode={ input$ } apiKey= "4a6ede7bc0a37ac709c784d5e8926410"/>
      </div>
    );

export default App;

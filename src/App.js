import React from 'react';
import logo from './logo.svg';
import './App.css'; 
import { isLogicalExpression } from '@babel/types';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="App">
        <br/>
          <Board/>
      </div>
    )
  }
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {NUMBER_ROWS: 9, NUMBER_COLUMNS: 9}
  }

  render_squares (NUMBER_ROWS, NUMBER_COLUMNS) {
    let r = {}
    const limit_low_row = NUMBER_ROWS*2
    const limit_high_row = (NUMBER_ROWS-2)*NUMBER_COLUMNS
    for(let i = 0; i < NUMBER_ROWS*NUMBER_COLUMNS; i++) {
        r[i] = 0
        if((i+1)%NUMBER_COLUMNS === 0) r[i] = 2
        i < limit_low_row  || i >= limit_high_row ? r[i] += 1 : r[i] += 0
    }

    const keys = Object.keys(r)
    return(keys.map(v => {
      return r[v] === 3 ? <div className = 'board-row'> <Square key = {v} value= { <img src={logo}/> } />  </div>: r[v] === 2 ? <div className = 'board-row'> <Square key = {v} />  </div> : r[v] === 1 ? <Square key = {v} value= { <img src={logo}/> } /> : <Square/>
    }))
  }

  render () {
    return (
      this.render_squares(this.state.NUMBER_ROWS, this.state.NUMBER_COLUMNS)
    )
  }
}

class Square extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div>
        <button className = 'square'>
          {this.props.value}
        </button>
      </div>
    )
  }
}

export default App;

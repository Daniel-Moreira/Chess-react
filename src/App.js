import React from 'react';
import './App.css'; 
const images = require.context('./icons', true);

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
    this.state = {NUMBER_ROWS: 8, NUMBER_COLUMNS: 8}
  }
  
  render_pieces (pieces, color)
  {
    return(pieces.map(p => { return( <Square piece={ p } color = { color } /> )}))
  }
  
  render_squares (NUMBER_ROWS, NUMBER_COLUMNS) {
    let rows = {}
    rows[0] = [`rook`, `knight`, `bishop`, `queen`, `king`, `bishop`, `knight`, `rook`]
    rows[1] = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
    rows[7] = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
    rows[8] = [`rook`, `knight`, `bishop`, `queen`, `king`, `bishop`, `knight`, `rook`]
    rows[2] = ['', '', '', '', '', '', '', '']
    rows[3] = ['', '', '', '', '', '', '', '']
    rows[5] = ['', '', '', '', '', '', '', '']
    rows[4] = ['', '', '', '', '', '', '', '']
    rows[6] = ['', '', '', '', '', '', '', '']

    const keys = Object.keys(rows)
    return(keys.map(key => {
      return(
        <div className = 'board-row'>
        {
          key <= 1 ? this.render_pieces(rows[key], 'white') : key >= 7 ? this.render_pieces(rows[key], 'black') : this.render_pieces(rows[key], '')
        }
      </div>
      )}))
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
    this.handleClick = this.handleClick.bind(this)
    this.state = {clicked: false}
  }
  
  handleClick (e) {
    var c = this.state.clicked

    if(c) e.target.style.backgroundColor = 'white'
    else e.target.style.backgroundColor = '#adb6c6'

    this.state = {clicked: !c}
  }

  render_img () {
    if(!this.props.color) return 
    const icon = images(`./${this.props.color}-${this.props.piece}.png`)

    return <img className = 'piece' src={icon} />
  }

  render () {
    return (
      <div>
        <button className = 'square' onClick={this.handleClick} img>
          {
            this.render_img()
          }
        </button>
      </div>
    )
  }
}

export default App;

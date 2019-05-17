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
    this.state = {NUMBER_ROWS: 8, NUMBER_COLUMNS: 8, hasPiece: false, piece_selected: {}}
  }

  putPiece(from, to) {
    to.setState({piece_color: from.state.piece_color, piece_name: from.state.piece_name})
    from.setState({piece_color: '', piece_name: ''})
  }

  changeColor(object) {
    var c = object.state.clicked
    
    if(c) object.setState({color: 'white'})
    else object.setState({color: '#adb6c6'})

    object.setState({clicked: !c})
  }

  promotePawn (piece) {
    piece.setState({piece_name: 'queen'})
  }

  movePawn (board, square) {
    const square_name = square.state.piece_name
    const square_color = square.state.piece_color
    const square_position = square.props.position

    const piece = board.state.piece_selected
    const piece_isBlack = piece.state.piece_color === 'black' ? 1 : -1
    const piece_position = board.state.piece_selected.props.position

    let moved = false
    if(!square_name && piece_position[0] === (piece_isBlack === 1 ? board.state.NUMBER_ROWS-1 : 1) 
      && square_position[1] === piece_position[1] 
      && square_position[0]+(piece_isBlack*2) === piece_position[0]) {
        moved = true
    } 
    else if(!square_name && square_position[1] === piece_position[1] 
      && square_position[0]+piece_isBlack === piece_position[0]) {
        moved = true
    }
    else if(square_name && square_color !== piece.state.piece_color && (square_position[1]-1 === piece_position[1] || square_position[1]+1 === piece_position[1]) 
      && square_position[0]+piece_isBlack === piece_position[0]) {
        moved = true
    }
    if(moved) {
      board.changeColor(piece)
      board.putPiece(piece, square)
      board.setState({hasPiece: false, piece_selected: {}})

      if(square_position[0] === (piece_isBlack === 1 ? 0 : board.state.NUMBER_ROWS)) board.promotePawn(square)
    }
  }

  moveRook (board, square) {
    const square_name = square.state.piece_name
    const square_color = square.state.piece_color
    const square_position = square.props.position

    const piece = board.state.piece_selected
    const piece_position = board.state.piece_selected.props.position

    let moved = false
    if(!square_name && square_position[1] === piece_position[1] 
      && square_position[0] !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1] === piece_position[1] 
      && square_position[0] !== piece_position[0]) {
        moved = true
    }
    else if(square_name && square_color !== piece.state.piece_color && (square_position[1]-1 === piece_position[1] || square_position[1]+1 === piece_position[1]) 
      && square_position[0] === piece_position[0]) {
        moved = true
    }
    
    if(moved) {
      board.changeColor(piece)
      board.putPiece(piece, square)
      board.setState({hasPiece: false, piece_selected: {}})
    }
  }

  moveKnight (board, square) {
    const square_name = square.state.piece_name
    const square_color = square.state.piece_color
    const square_position = square.props.position

    const piece = board.state.piece_selected
    const piece_position = board.state.piece_selected.props.position

    let moved = false
    // eat square_color !== piece.state.piece_color
    if(!square_name && square_position[1]+1 === piece_position[1] 
      && square_position[0]+3 === piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]-1 === piece_position[1] 
      && square_position[0]+3 !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]+3 === piece_position[1] 
      && square_position[0]+1 !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]-3 === piece_position[1] 
      && square_position[0]+1 !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]-1 === piece_position[1] 
      && square_position[0]-3 === piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]+1 === piece_position[1] 
      && square_position[0]-3 !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]-3 === piece_position[1] 
      && square_position[0]-1 !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1]+3 === piece_position[1] 
      && square_position[0]-1 !== piece_position[0]) {
        moved = true
    }
    
    if(moved) {
      board.changeColor(piece)
      board.putPiece(piece, square)
      board.setState({hasPiece: false, piece_selected: {}})
    }
  }

  moveBishop (board, square) {

  }

  moveQueen (board, square) {

  }

  moveKing (board, square) {

  }

  handleClick = object => {
    const square_name = object.state.piece_name
    const piece_moves = {'': () => {}, 'pawn': this.movePawn, 
      'rook': this.moveRook, 'knight': this.moveKnight, 'bishop': this.moveBishop, 
      'queen': this.moveQueen, 'king': this.moveKing}

    if(!this.state.hasPiece && !object.state.piece_name) return
    // Select piece
    if(!this.state.hasPiece)
    {
      this.setState({hasPiece: true, piece_selected: object})
      this.changeColor(object)
    }
    else if(object === this.state.piece_selected)
    {
      this.setState({hasPiece: false, piece_selected: {}})
      this.changeColor(object)
    }
    else piece_moves[this.state.piece_selected.state.piece_name](this, object)
  }
  
  render_pieces (pieces, color, x)
  {
    return(pieces.map((p, y) => { return( <Square position={[parseInt(x), y]} piece={ p } color = { color } handleClick={ this.handleClick }/> )}))
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
          key <= 1 ? this.render_pieces(rows[key], 'white', key) : key >= 7 ? this.render_pieces(rows[key], 'black', key) : this.render_pieces(rows[key], '', key)
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
    this.state = {clicked: false, color: 'white', 
      piece_color: this.props.color, piece_name: this.props.piece}
  }

  render_img () {
    if(!this.state.piece_name) return 
    const icon = images(`./${this.state.piece_color}-${this.state.piece_name}.png`)

    return <img className = 'piece' src={icon} />
  }

  render () {
    return (
      <div>
        <button className = 'square' onClick={() => this.props.handleClick(this)} style={{backgroundColor: this.state.color}}>
          {
            this.render_img()
          }
        </button>
      </div>
    )
  }
}

export default App;

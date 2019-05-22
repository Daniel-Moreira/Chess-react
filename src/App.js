import React from 'react';
import './App.css'; 
const images = require.context('./icons', true);
const NUMBER_ROWS = 8
const NUMBER_COLUMNS = 8
const QUEEN = 6

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

    let bs = []

    bs[0] = [2, 3, 4, 5, 6, 4, 3, 2]
    bs[1] = [1, 1, 1, 1, 1, 1, 1, 1]
    for(let i = 2; i < NUMBER_ROWS-2; i++) {
      let c = []
      for(let j = 0; j < NUMBER_COLUMNS; j++) {
        c[j] = 0
      }
      bs[i] = c
    }
    bs[6] = [1, 1, 1, 1, 1, 1, 1, 1]
    bs[7] = [2, 3, 4, 5, 6, 4, 3, 2]

    this.state = { hasPiece: false, piece_selected: {}, board_state: bs }
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

  promotePawn (board, piece, x, y) {
    let bs = board.state.board_state
    bs[x][y] = QUEEN
    
    board.setState({board_state: bs})
    piece.setState({piece_name: 'queen'})

    console.log(board.state.board_state)
  }

  movePawn (board, square) {
    const square_name = square.state.piece_name
    const square_color = square.state.piece_color
    const square_position = square.props.position

    const piece = board.state.piece_selected
    const piece_isBlack = piece.state.piece_color === 'black' ? -1 : 1
    const piece_position = board.state.piece_selected.props.position

    let moved = false
    if(!square_name && piece_position[0] === (piece_isBlack === 1 ? NUMBER_ROWS-2 : 1)
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
      board.movePiece(board, piece, square, piece_position, square_position)
      
      if(square_position[0] === (piece_isBlack === 1 ? 0 : NUMBER_ROWS-1)) board.promotePawn(board, square, ...square_position)
    }
  }

  movePiece (board, piece, square, piece_position, square_position) {
    board.changeColor(piece)
    board.putPiece(piece, square)
    board.setState({hasPiece: false, piece_selected: {}})

    board.registerChange(board, ...piece_position, ...square_position)
  }

  registerChange (board, piece_x, piece_y, new_x, new_y) {
    let bs = this.state.board_state

    bs[new_x][new_y] = bs[piece_x][piece_y]
    bs[piece_x][piece_y] = 0
    
    board.setState({board_state: bs})
  }

  moveRook (board, square) {
    const square_name = square.state.piece_name
    const square_color = square.state.piece_color
    const square_position = square.props.position

    const piece = board.state.piece_selected
    const piece_position = board.state.piece_selected.props.position
    const piece_color = piece.state.piece_color

    let moved = false
    if(!square_name && square_position[1] === piece_position[1] 
      && square_position[0] !== piece_position[0]) {
        moved = true
    }
    else if(!square_name && square_position[1] === piece_position[1] 
      && square_position[0] !== piece_position[0]) {
        moved = true
    }
    else if(square_name && square_color !== piece_color && (square_position[1]-1 === piece_position[1] || square_position[1]+1 === piece_position[1]) 
      && square_position[0] === piece_position[0]) {
        moved = true
    }
    
    if(moved)
      board.movePiece(board, piece, square, piece_position, square_position)
  }

  moveKnight (board, square) {
    const square_name = square.state.piece_name
    const square_color = square.state.piece_color
    const square_position = square.props.position
    
    const piece = board.state.piece_selected
    const piece_position = board.state.piece_selected.props.position
    const piece_color = piece.state.piece_color

    let moved = false
    
    if(square_color === piece_color) return

    if(square_position[1]-1 === piece_position[1] 
      && square_position[0]+2 === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]+1 === piece_position[1] 
      && square_position[0]+2  === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]+2 === piece_position[1] 
      && square_position[0]+1 === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]-2 === piece_position[1] 
      && square_position[0]+1 === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]-1 === piece_position[1] 
      && square_position[0]-2 === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]+1 === piece_position[1] 
      && square_position[0]-2 === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]-2 === piece_position[1] 
      && square_position[0]-1 === piece_position[0]) {
        moved = true
    }
    else if(square_position[1]+2 === piece_position[1] 
      && square_position[0]-1 === piece_position[0]) {
        moved = true
    }

    if(moved)
      board.movePiece(board, piece, square, piece_position, square_position)
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

  setBoard () {
    let bs = []

    bs[0] = [2, 3, 4, 5, 6, 4, 3, 2]
    bs[1] = [1, 1, 1, 1, 1, 1, 1, 1]
    for(let i = 2; i < NUMBER_ROWS-2; i++) {
      let c = []
      for(let j = 0; j < NUMBER_COLUMNS; j++) {
        c[j] = 0
      }
      bs[i] = c
    }
    bs[6] = [1, 1, 1, 1, 1, 1, 1, 1]
    bs[7] = [2, 3, 4, 5, 6, 4, 3, 2]

    this.setState({board_state: bs}, () => console.log(this.state.board_state))

  }
  
  render_squares () {
    let rows = {}
    rows[0] = [`rook`, `knight`, `bishop`, `queen`, `king`, `bishop`, `knight`, `rook`]
    rows[1] = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
    rows[6] = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
    rows[7] = [`rook`, `knight`, `bishop`, `queen`, `king`, `bishop`, `knight`, `rook`]
    rows[2] = ['', '', '', '', '', '', '', '']
    rows[3] = ['', '', '', '', '', '', '', '']
    rows[5] = ['', '', '', '', '', '', '', '']
    rows[4] = ['', '', '', '', '', '', '', '']

    // this.setBoard()

    const keys = Object.keys(rows)
    return(keys.map(key => {
      return(
        <div className = 'board-row'>
        {
          key >= 6 ? this.render_pieces(rows[key], 'white', key) : key <= 1 ? this.render_pieces(rows[key], 'black', key) : this.render_pieces(rows[key], '', key)
        }
      </div>
      )}))
  }

  render () {
    return (
      this.render_squares()
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

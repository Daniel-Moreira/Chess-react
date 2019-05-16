import React from 'react';
import logo from './logo.svg';
import './App.css'; 

class App extends React.Component {
  constructor() {
    super()
    this.state = {items: {}, form: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
  }

  handleChange (e) {
    let state = this.state.form
    state[e.target.id] = e.target.value

    this.setState(state, () => console.log(this.state))
  }

  handleSubmit (e) {
    this.setState({items: this.state.form})
    this.setState({form: {}})
  }

  handleEnter (e) {
    if(e.key == 'Enter') this.handleSubmit(e)
  }

  render() {
    return (
      <div className="App">
        <br/>
          Teste
          <input type='text'id='0' onChange = {this.handleChange} onKeyUp={this.handleEnter}/>
          <br />
          Teste 2
          <input type='text'id='1' onChange = {this.handleChange} onKeyUp={this.handleEnter}/>
          <br />
          <button onClick = {this.handleSubmit}>
            Submit
          </button>
          <Teste items={this.state.items}/>
      </div>
    )
  }
}

class Teste extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        {
          Object.keys(this.props.items).map(key => 
            {
              return (<div key={key}> {this.props.items[key]} <br/></div>)
            })
        }
      </div>
    )
  }
}

export default App;

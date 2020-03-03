import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Calculator extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     firstValue: this.props.firstValue,
  //     secondValue: this.props.secondValue,
  //     operator: '+'
  //   }
  // }

  state = {
    firstValue: this.props.firstValue,
    secondValue: this.props.secondValue,
    operator: '+'
  }

  calc = () => eval(`${this.state.firstValue || 0} ${this.state.operator} ${this.state.secondValue || 0}`) 

  render() {
   return( 
    <>
      <h2>{this.props.title}</h2>
      <input type="text" onChange = {e=>this.setState({firstValue: e.target.value})} value={this.state.firstValue}/>
      <select onChange={e => this.setState({operator: e.target.value})} value={this.state.operator}>
        {['+', '-', '*', '/'].map(val => <option key={val} value={val}>{val}</option>) }
      </select>
      <input type="text" onChange = {e=>this.setState({secondValue: e.target.value})} value={this.state.secondValue}/>
      = {this.calc()}
    </>
    )
  }
}

Calculator.defaultProps = {
  firstValue: 0,
  secondValue: 0,
  operator: '+'
}

Calculator.propTypes = {
  firstValue: PropTypes.number,
  secondValue: PropTypes.number,
  operator: PropTypes.string
}

export default Calculator
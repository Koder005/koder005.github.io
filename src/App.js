import React from 'react';
import './App.scss';
import {FaRegCheckCircle, FaRegCircle} from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi"

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const later = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', ',', '.', '/', '<', '>', '?', '|', '\\']
const toLoverLate = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x','y', 'z']


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: num,
      later: later,
      specialChars: specialChars,
      toLoverLate: toLoverLate,
      result: '',
      value: 10,
      checkNum: true,
      checkLat: true,
      checkLov: true,
      checkSym: true,
    };
    
    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.all = [...this.state.specialChars , ...this.state.later,  ...this.state.num, ...this.state.toLoverLate];
  }


  copyToClipboard() {
    navigator.clipboard.writeText(this.state.result);

    alert('Текст скопирован!')
  }


  generationPass = (how, arr) => {
    
    let result = '';
    for (let i = 0; i < how; i++) { 
      result += arr[Math.floor(Math.random() * arr.length)];
    }

    this.all = [...this.state.specialChars , ...this.state.later,  ...this.state.num, ...this.state.toLoverLate];

    if (!this.state.checkNum && !this.state.checkSym && !this.state.checkLat && !this.state.checkLov) {
      this.setState({result: 'Добавьте фильтр!'})
    } else {
      this.setState({ result });
    }
  }

  handleOnChange = (event) => {
    this.setState({ value: event.target.value }); 
    if (!this.state.checkNum && !this.state.checkSym && !this.state.checkLat && !this.state.checkLov) {
      this.setState({result: 'Добавьте фильтр!'})
    }
  };

  plusNum = () => {
    this.setState({checkNum: !this.state.checkNum})
    this.setState({num: this.state.checkNum ? [] : num})
  }

  plusLater = () => {
    this.setState({checkLat: !this.state.checkLat})
    this.setState({later: this.state.checkLat ? [] : later})
  }
  
  plusLoverLater = () => {
    this.setState({checkLov: !this.state.checkLov})
    this.setState({toLoverLate: this.state.checkLov ? [] : toLoverLate})
  }


  plusSymbol = () => {
    this.setState({checkSym: !this.state.checkSym})
    this.setState({specialChars: this.state.checkSym ? [] : specialChars})
  }

  

  render() {
    return (
      <div>
        <div className='header'></div>
        <div className='container'>
          <div className='cont-of-buff'>
            <div onClick={this.copyToClipboard} className='buff'>
              <BiAddToQueue className='buff-btn'/>
            </div>
          </div>
          <div className='result'>{this.state.result}</div>
          <div>
            <div className="inputradio">
              <input
                type="range"
                min="1"
                max="32"
                value={this.state.value}
                onChange={this.handleOnChange}
                className='slider'
              /> 
              <span>{this.state.value}</span><br/>
            </div>
            <div className='filther'>
              <div onClick={this.plusNum}>{this.state.checkNum ? <FaRegCheckCircle/> : <FaRegCircle/>} Цифры</div>
              <div onClick={this.plusLater}>{this.state.checkLat ? <FaRegCheckCircle/> : <FaRegCircle/>} Буквы (верхний регистр)</div>
              <div onClick={this.plusLoverLater}>{this.state.checkLov ? <FaRegCheckCircle/> : <FaRegCircle/>} Буквы (нижний регистр)</div>
              <div onClick={this.plusSymbol}>{this.state.checkSym ? <FaRegCheckCircle/> : <FaRegCircle/>} Специальные символы</div>
            </div>

            
            <button className='btn' onClick={() => this.generationPass(this.state.value, this.all)}>generation</button>
          </div>
        </div>
      </div>
    ); 
  }
}

export default App;


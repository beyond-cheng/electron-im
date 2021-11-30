import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.aClick}>
        { this.props.value }
      </button>
    );
  }
}

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square 
      value={this.props.squares[i]}
      aClick={() => this.props.onClick(i) }
    />;
  }

  render() {

    return (
      <div>
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    let beginSquares = Array(9).fill(null);

    this.state = {
      collect: [beginSquares.slice()],
      squares: beginSquares,  // 'X', 'O', null
      isNextX: true,  // 'X' begin
      win: null
    }
  }

  handleClick(index) {
    if(this.state.squares[index] !== null || this.state.win !== null) {
      return;
    }

    let arr = this.state.squares.slice();
    arr[index] = this.state.isNextX ? 'X' : 'O';

    let count = 0;
    arr.forEach(item => {
      if(item !== null) {
        count++;
      }
    })

    let cot = this.state.collect.slice(0, count);
    cot.push(arr);
    
    this.setState({
      squares: arr,
      isNextX: !this.state.isNextX,
      collect: cot
    })

    let result = this.culcalate(arr);

    if(result) {
      this.setState({
        win: result
      })
    }
  }

  culcalate(squares) {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return false;
  }

  jumpTo(i) {
    
    this.setState({
      squares: this.state.collect[i].slice()
    })
  }

  render() {

    // ?  collect 變了後，steps 會跟著變
    let steps = this.state.collect.map((value, index) => {
      let text;

      if(index === 0) {
        text = 'Go to game start'
      } else {
        text = 'Go to move #' + index;
      }

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{text}</button>
        </li>
      );
    });

    // this.setState({
    //   steps: 'steps'
    // })

    let status = '';

    if(this.state.win) {
      status = 'Winner: ' + this.state.win;
    } else {
      status = 'Next player: ' + (this.state.isNextX ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.state.squares}
            onClick={i => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div className="status">
            {status}
            </div>
          <ol>
            {steps}
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

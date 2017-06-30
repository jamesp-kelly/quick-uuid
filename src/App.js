import React, { Component } from 'react';
import { v4 } from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuids: [v4()]
    };

    this.textInputs = [];

    this.selectInput = this.selectInput.bind(this);
    this.numChanged = this.numChanged.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  selectInput(index) {
    this.textInputs[index].select();
  }

  numChanged(e) {
    const targetValue = e.target.value;

    if (e.target.value < this.state.uuids.length) {
      this.setState((state) => {
        let reduceBy = state.uuids.length - targetValue;
        //reduceBy = reduceBy <= state.uuids.length ? reduceBy : state.uuids.length; //???
        return {
          uuids: state.uuids.slice(0, -reduceBy)
        };
      });
    } else {
      this.setState((state) => {
        let increaseBy = targetValue - state.uuids.length;
        //increaseBy = (increaseBy + state.uuids.length >= 10) ? 10 - state.uuids.length : increaseBy; //???
        const tempArr = Array(increaseBy).fill('');
        return {
          uuids: [
            ...state.uuids,
            ...tempArr.map(() => v4()),
          ]
        };
      });
    }
  }

  handleRefresh() {
    this.setState((state) => {
      return {
        uuids: state.uuids.map(uuid => v4())
      }
    });
  }
  
  render() {
    return (
      <div id="form-wrapper">
         <div>
          <input 
            className="uuid-num" 
            type="number"
            min="0"
            max="25"
            value={this.state.uuids.length}
            onChange={this.numChanged} 
          />
          <button onClick={this.handleRefresh}>refresh</button>
        </div>

        {
          this.state.uuids.map((uuid, index) => {
            return <input 
              type="text" 
              key={uuid}
              className="uuid-result"
              value={uuid}
              spellCheck="false"
              readOnly="true"
              ref={(input) => {this.textInputs[index] = input; }}
              onClick={() => { this.selectInput(index) }}  />
          })
        }
      </div>
    )
  }
}

export default App;
import React, { Component } from 'react';
import { v4 } from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberUUIDs: 1
    };

    this.textInputs = [];

    this.selectInput = this.selectInput.bind(this);
    this.numChanged = this.numChanged.bind(this);
  }
  selectInput(index) {
    this.textInputs[index].select();
  }

  numChanged(e) {
    this.setState({
      numberUUIDs: e.target.value
    })
  }
  
  render() {
    const mapArray = new Array(parseInt(this.state.numberUUIDs, 10)).fill("");
    return (
      <div id="form-wrapper">
         <div>
          <input 
            className="uuid-num" 
            type="number"
            value={this.state.numberUUIDs}
            onChange={this.numChanged} 
          />
          <a href="/">refresh</a>
        </div>

        {
          mapArray.map((item, idx) => {
            return <input 
              type="text" 
              className="uuid-result"
              value={v4()}
              spellCheck="false"
              readOnly="true"
              ref={(input) => {this.textInputs[idx] = input; }}
              onClick={() => { this.selectInput(idx) }}  />
          })
        }
      </div>
    )
  }
}

export default App;
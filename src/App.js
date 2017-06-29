import React, { Component } from 'react';
import { v4 } from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.selectInput = this.selectInput.bind(this);
  }
  selectInput() {
    this.textInput.select();
  }
  
  render() {
    return (
      <div id="form-wrapper">
        <input 
          type="text" 
          value={v4()}
          spellCheck="false"
          readOnly="true"
          ref={(input) => {this.textInput = input; }}
          onClick={this.selectInput}  />
        <div>
          <a href="/">refresh</a>
        </div>
      </div>
    )
  }
}

export default App;
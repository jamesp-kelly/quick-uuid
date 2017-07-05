import React, { Component } from 'react';
import { v4 } from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuids: [v4(), v4(), v4(), v4(), v4()]
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
        return {
          uuids: state.uuids.slice(0, -reduceBy)
        };
      });
    } else {
      this.setState((state) => {
        let increaseBy = targetValue - state.uuids.length;
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
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Quick UUID</h1>
          <p className="lead">generates V4 UUIDs using <a target="_blank" href='https://www.npmjs.com/package/uuid'>uuid</a></p>
        </div>

        <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input 
              className="uuid-num form-control col-2" 
              type="number"
              min="1"
              max="25"
              value={this.state.uuids.length}
              onChange={this.numChanged} 
            />
            <button 
              onClick={this.handleRefresh}
              className="btn btn-default">
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </button>
          </div>
        </form>

        <div>
          {
            this.state.uuids.map((uuid, index) => {
              return (
                <div className="uuid-row">
                  <input 
                    type="text" 
                    key={uuid}
                    className="uuid-result"
                    value={uuid}
                    spellCheck="false"
                    readOnly="true"
                    ref={(input) => {this.textInputs[index] = input; }}
                    onClick={() => { this.selectInput(index) }}  />
                </div>
              ); 
            })
          }
        </div>

      </div>
    )
  }
  
  rendedr() {
    return (
      <div>
         <div className="header">
          <div className="jumbotron">
            <div className="container">
              <h1>Quick UUID</h1>
            </div>
          </div>
          <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input 
                className="uuid-num form-control col-2" 
                type="number"
                min="1"
                max="25"
                value={this.state.uuids.length}
                onChange={this.numChanged} 
              />
              <button 
                onClick={this.handleRefresh}
                className="btn btn-default">
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="book-list container">
          {
            this.state.uuids.map((uuid, index) => {
              return (
                <div className>
                  <input 
                    type="text" 
                    key={uuid}
                    className="uuid-result"
                    value={uuid}
                    spellCheck="false"
                    readOnly="true"
                    ref={(input) => {this.textInputs[index] = input; }}
                    onClick={() => { this.selectInput(index) }}  />
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
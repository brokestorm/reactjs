import React from 'react';
import './Search.css'

export default class Search extends React.Component {

  render() {
    return (
      <div className={"search-container"}>
        <form onSubmit={this.props.handleSubmit.bind(this)}>
          <input 
              type="text"
              list="data"
              required
              autoFocus
              placeholder="Type Here..."
              onChange={this.props.handleChange.bind(this)}
              value={this.props.symbol}
          />
          <datalist id="data">
            {this.props.searchList.map((data) =>
              <option key={data.symbol} value={data.symbol} onSubmit={this.props.handleSubmit.bind(this)}> {data.name} </option> )}
          </datalist>
        </form>
      </div>

    );
  }
}
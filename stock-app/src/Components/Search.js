import React from 'react';
import './Search.css'

export default class Search extends React.Component {
  handleChange(event) {
    //console.log(event.target.value);
    const symbol = event.target.value.toUpperCase();
    if(symbol !== ""){
      this.props.changeSymbol(symbol);
    }
  }

  handleSubmit(event){
    //alert(this.props.symbol);
    //console.log("Submitted:", this.props.symbol);
    this.props.fetchData(this.props.symbol);
    event.preventDefault();
  }

  render() {
    return (
      <div className={"search-container"}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input 
              type="text"
              list="data"
              required
              autoFocus
              placeholder="Type Here..."
              onChange={this.handleChange.bind(this)}
              value={this.props.symbol}
          />
          <datalist id="data">
            {this.props.searchList.map((data) =>
              <option key={data.symbol} value={data.symbol} onSubmit={this.handleSubmit.bind(this)}> {data.name} </option> )}
          </datalist>
        </form>
      </div>

    );
  }
}
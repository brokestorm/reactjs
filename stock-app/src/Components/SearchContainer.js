import React from 'react';
import './Search.css';
import Search from './Search';

export default class SearchContainer extends React.Component {

  fetchSearchData(symbol){
    const alphaKey = this.props.alphaKey;
    let list = [];

    fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ symbol +"&apikey=" + alphaKey)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Was not possible to fetch the search data list');
        }
    })
    .then(result => {
        if(result["bestMatches"] !== ""){
            for(let i = 0; i < result["bestMatches"].length; i++){
                list[i] = {name: "", symbol: ""};
                list[i].name = result["bestMatches"][i]["2. name"];
                list[i].symbol = result["bestMatches"][i]["1. symbol"];
            }
            this.setState({dataSearch: result, searchList: list, symbol: result["bestMatches"][0]["1. symbol"]});
        }
    })
    .catch(error => this.setState({ error }));
}

  render() {
    return ( 
    <Search 
        symbol={this.props.symbol}
        searchList={this.props.searchList}
        fetchData={this.props.fetchData.bind(this)}
        fetchSearchData={this.fetchSearchData.bind(this)}
    />
     );
  }
}
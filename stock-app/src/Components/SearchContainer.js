import React from 'react';
import './Search.css';
import Search from './Search';

export default class SearchContainer extends React.Component {

    handleChange(event) {
        const symbol = event.target.value.toUpperCase();
        this.props.changeSymbol(symbol);
    }
    
    handleSubmit(event) {
        this.props.submitSymbol(this.props.symbol);
        event.preventDefault();
    }


    render() {
      
        return ( <Search 
            symbol = {this.props.symbol}
            fetchData = {this.props.fetchData.bind(this)}
            searchList = {this.props.searchList}
            changeSymbol = {this.props.changeSymbol.bind(this)}
            submitSymbol = {this.props.submitSymbol.bind(this)}
            handleChange = {this.handleChange.bind(this)}
            handleSubmit = {this.handleSubmit.bind(this)}
        /> );
    }
}
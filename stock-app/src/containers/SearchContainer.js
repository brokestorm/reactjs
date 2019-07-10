import React from 'react';
import { isUndefined } from 'util';
import Search from '../components/Search';
import { connect } from 'react-redux';
import { submitName, submitSymbol, searchDataError, setSearchData, changeInput } from '../actions/symbolActions';

const mapStateToProps = state => ({
    vantKey: state.dataReducer.vantKey,
    symbol: state.symbolReducer.symbol,
    searchList: state.symbolReducer.searchList,
    name: state.symbolReducer.name,
    symbolInput: state.symbolReducer.symbolInput,
});

const mapDispatchToProps = dispatch => ({
    submitName: name => dispatch(submitName(name)),
    submitSymbol: symbol => dispatch(submitSymbol(symbol)),
    setSearchData: searchList => dispatch(setSearchData(searchList)),
    searchDataError: error => dispatch(searchDataError(error)),
    changeInput: symbol => dispatch(changeInput(symbol)),
});

class SearchContainer extends React.Component {

    handleChange(event) {
        const symbol = event.target.value.toUpperCase();
        this.props.changeInput(symbol);
        if(this.props.symbolInput !== ''){
            this.fetchSearchData(this.props.symbolInput);
        }
    }
    
    handleSubmit(event) {
        let name = "";
        const searchList = this.props.searchList;
        const symbolInput = this.props.symbolInput;
        
        this.fetchSearchData(symbolInput);

        if(symbolInput !== ''){
            for(let i = 0; i < searchList.length; i++){
                if(symbolInput === searchList[i].symbol){
                    name = searchList[i].name;
                }
            }
            this.props.submitSymbol(symbolInput);
            this.props.submitName(name);
        }
        event.preventDefault();
    }

    fetchSearchData(symbol){
        const vantKey = this.props.vantKey;
        let list = [];

        fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ symbol +"&apikey=" + vantKey)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Was not possible to fetch the search data list');
            }
        })
        .then(result => {
            if(result["bestMatches"] !== "" || !isUndefined(result) ){
                for(let i = 0; i < result["bestMatches"].length; i++) {
                    list[i] = {name: "", symbol: ""};
                    list[i].name = result["bestMatches"][i]["2. name"];
                    list[i].symbol = result["bestMatches"][i]["1. symbol"];
                }               
                
                this.props.setSearchData(list);

            }
        })
        .catch(error => this.props.searchDataError(error));
    }

    render() {

        return ( <Search 
            symbolInput = {this.props.symbolInput}
            searchList = {this.props.searchList}
            handleChange = {this.handleChange.bind(this)}
            handleSubmit = {this.handleSubmit.bind(this)}
        /> );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchContainer);

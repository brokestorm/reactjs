import React from 'react';
import './StockApp.css';
import {isUndefined} from 'util';
import StockApp from './StockApp'

class StockAppContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            chartObjs: [{
                id: null,
                symbol: null,
                data: null,
            }],
            dataSearch: {},
            symbol: "",
            symbolSubmitted: undefined,
            func: 'TIME_SERIES_INTRADAY',
            interval: '5min',
            data: [],
            searchList: [],
            key: '79LT1U32C3F71WIT',
            name: "",
        };
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.symbolSubmitted !== prevState.symbolSubmitted){
            if(this.state.symbolSubmitted !== ''){
                this.fetchData();
            }
        }
    }

    submitSymbol(symbol){
        this.setState({symbolSubmitted: symbol});
    }

    changeSymbol(symbol){
        this.setState({symbol});
        if(this.state.symbol !== ''){
            this.fetchSearchData(symbol);
        }
    }

    fillData(items){
        const name = this.state.name;
        const symbol = this.state.symbolSubmitted;
        let data = [];
        let xAxis = [];
        var i = 0;
        xAxis = Object.keys(items);
        let xChart = xAxis.length;

        if(xChart > 200){
            xChart = 200;
        }

        let date;
        let open;
        let high;
        let low;
        let close;
        let volume;

        for(i; i < xChart; i++){
            let aux = new Date(xAxis[i]);
            open = parseFloat(items[xAxis[(xChart - 1) - i]]['1. open']);
            high = parseFloat(items[xAxis[(xChart - 1) - i]]['2. high']);
            low = parseFloat(items[xAxis[(xChart - 1) - i]]['3. low']);
            close = parseFloat(items[xAxis[(xChart - 1) - i]]['4. close']);
            volume = parseInt(items[xAxis[(xChart - 1) - i]]['5. volume']);

            date = aux.getHours() + ':' + aux.getMinutes();
            if(aux.getMinutes() === 0){
                date = date + '0';
            }else if(aux.getMinutes() === 5){
                date = aux.getHours() + ':0'+ aux.getMinutes();
            }

            data[(xChart - 1) - i] = {time: date, open: open, high: high, low: low, close: close, volume: volume};
        }
        this.setState({ 
            chartObjs: [...this.state.chartObjs, {id: Date.now(), symbol: symbol, name: name, data: data}],
            symbolSubmitted: '',
        });
        
    }

    fetchData(){
        const sym = this.state.symbolSubmitted;
        const func = this.state.func;
        const key = this.state.key;
        const interval = this.state.interval;
        
        fetch('https://www.alphavantage.co/query?function=' + func +'&symbol='+ sym +'&interval='+ interval +'&outputsize=full&apikey=' + key)
            .then(response => {
                if (response.ok) {
                    console.log("FETCHING DATA!");
                    return response.json();
                } else {
                    throw new Error('it Was not possible to fetch data');
                }
            })
            .then(result => {
                if(!isUndefined(result["Meta Data"])) {
                    //var saoPauloTime = new Date(result["Meta Data"]["3. Last Refreshed"]).toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
                    //saoPauloTime = new Date(saoPauloTime);
                    this.fillData(result['Time Series (5min)']);                    
                }
                else {
                    console.log("I didn't fetch something valid: ", result);
                    this.setState({symbolSubmitted: ""});
                }
            })
            .catch(error => this.setState({ error }));            

    }

    fetchSearchData(symbol){
        const key = this.state.key;
        let name;
        let list = [];

        fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ symbol +"&apikey=" + key)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Was not possible to fetch the search data list');
            }
        })
        .then(result => {
            if(result["bestMatches"] !== "" || !isUndefined(result) ){
                for(let i = 0; i < result["bestMatches"].length; i++){
                    if(symbol === result["bestMatches"][i]["1. symbol"]){
                        name = result["bestMatches"][i]["1. symbol"];
                    }
                    list[i] = {name: "", symbol: ""};
                    list[i].name = result["bestMatches"][i]["2. name"];
                    list[i].symbol = result["bestMatches"][i]["1. symbol"];
                }               
                this.setState({dataSearch: result["bestMatches"], searchList: list, name});
            }
        })
        .catch(error => this.setState({ error }));
    }

    onDeleteHandle(){
        let id = arguments[0];

        this.setState({
            chartObjs: this.state.chartObjs.filter( item =>{
                if(item.id!== id)
                    return item;
            } ),
        });
    }

    render(){
        
        return(
            <StockApp
            fetchData = {this.fetchData.bind(this)}
            changeSymbol = {this.changeSymbol.bind(this)}
            submitSymbol = {this.submitSymbol.bind(this)}
            onDeleteHandle = {this.onDeleteHandle.bind(this)}

            chartObjs = {this.state.chartObjs}
            symbol = {this.state.symbol}
            searchList = {this.state.searchList}

            
            />
        );
        
    }

}
export default StockAppContainer;
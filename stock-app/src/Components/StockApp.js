import React from 'react';
import './StockApp.css';
import {isUndefined} from 'util';
import StockCharts from './StockCharts';
import Search from './Search';

class StockApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            itemsIsLoaded: false,
            items: {},
            dataSearch: {},
            information: {
                symbol: null,
                name: null,
                lastRefreshed: null,
            },
            func: 'TIME_SERIES_INTRADAY',
            interval: '5min',
            data: [],
            searchList: [],
            key: '79LT1U32C3F71WIT',
            open: null,
            high: null,
            low: null,
        };
    }

    shouldComponentUpdate(nextState){
        return (this.state !== nextState);

    }


    changeSymbol(symbol){
        this.setState({symbol});
        this.fetchSearchData(symbol);
    }

    setItemLoad(){
        this.setState({itemsIsLoaded: false});
    }

    fillData(items){
        let data = [];
        let xAxis = [];
        var i = 0;
        xAxis = Object.keys(items);
        let xChart = xAxis.length;
        
        if(xChart > 50){
            xChart = 50;
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
        this.setState({data: data, open: data[i-1]['open'], high: data[i-1]['high'], low: data[i-1]['low']});
    }

    fetchData(symbol){
        const sym = symbol;
        const func = this.state.func;
        const key = this.state.key;
        const interval = this.state.interval;
        let name = null;
        
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
                if(!isUndefined(result["Meta Data"])){
                    this.fetchSearchData(sym);
                    const dataSearch = this.state.dataSearch;
                    console.log(dataSearch);
                    for(let i = 0; i < dataSearch["bestMatches"].length; i++){
                        if(sym === dataSearch["bestMatches"][i]['1. symbol']){
                            name = dataSearch["bestMatches"][i]["2. name"];
                        }
                    }
                    var saoPauloTime = new Date(result["Meta Data"]["3. Last Refreshed"]).toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
                    saoPauloTime = new Date(saoPauloTime);
                    this.setState({ 
                        itemsIsLoaded: true, 
                        items: result,
                        information: {
                            symbol: sym,
                            lastRefreshed: saoPauloTime.toString(),
                            name: name,
                        },
                    });
                    this.fillData(result['Time Series (5min)']);
                }
            })
            .catch(error => this.setState({ error, itemsIsLoaded: true }));            

    }

    fetchSearchData(symbol){
        const key = this.state.key;
        let list = [];

        fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ symbol +"&apikey=" + key)
        .then(response => {
            if (response.ok) {
                //console.log("SEARCHING FOR SYMBOL!");
                return response.json();
            } else {
                throw new Error('Was not possible to fetch the search data list');
            }
        })
        .then(result => {
            //console.log("URL: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ symbol +"&apikey=" + key);
            //console.log(result);
            if(result["bestMatches"] !== ""){
                for(let i = 0; i < result["bestMatches"].length; i++){
                    list[i] = {name: "", symbol: ""};
                    list[i].name = result["bestMatches"][i]["2. name"];
                    list[i].symbol = result["bestMatches"][i]["1. symbol"];
                }
                //console.log(list);
                
                this.setState({dataSearch: result, searchList: list });
            }
        })
        .catch(error => this.setState({ error }));
    }

    render(){
        const {error, itemsIsLoaded, items, symbol, searchList, data, open, high, low} = this.state;

        if (!itemsIsLoaded){
            return(
                <div>
                    <div className = 'title'> 
                            <h1> STOCK MARKET PRICES</h1> 
                            <Search 
                                    symbol = {symbol}
                                    fetchData = {this.fetchData.bind(this)}
                                    searchList = {searchList}
                                    changeSymbol ={this.changeSymbol.bind(this)}
                            />
                    </div>
                </div>
            );
        }else if (error){
                return(
                    <div className="error">Error: {error.message}</div>
                );
        } else {
            return(
                <div>
                    <div className = 'title'> 
                        <h1> STOCK MARKET PRICES</h1> 
                        <Search 
                                    symbol = {symbol}
                                    fetchData = {this.fetchData.bind(this)}
                                    searchList = {searchList}
                                    changeSymbol ={this.changeSymbol.bind(this)}
                        />
                    
                    </div>
                    <div className='mainBox'>
                        <div className="chart-title">
                            <h1 id="symbol">{this.state.information.symbol}</h1>
                            <h2 id="company">{this.state.information.name}</h2>
                            <h3 id="time">{this.state.information.lastRefreshed}</h3>
                            <ul id="atributes">
                                <li><b>Open:</b>   {open}</li>
                                <li><b>High:</b>   {high}</li>
                                <li><b>Low:</b>    {low}</li>
                            </ul>
                        </div>
                        <div className='canvas'>
                            <StockCharts 
                                symbol = {items["Meta Data"]["2. Symbol"]}
                                data = {data}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

}
export default StockApp;

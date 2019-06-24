import React from 'react';
import './StockApp.css';
import {isUndefined} from 'util';
import StockCharts from './StockCharts';
import Search from './Search';

const KEY = '79LT1U32C3F71WIT';

class StockApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            itemsIsLoaded: false,
            infoIsLoaded: false,
            items: {},
            info: {},
            symbol: "MSFT",
            symbolIsLoaded: false,
            lastUpdate: null,
            func: 'TIME_SERIES_INTRADAY',
            interval: '5min',
            data: [],
            xChart: 19,
            search: '',
        };
    }


    fillData(){
        let data = [];
        const xChart = this.state.xChart;
        const items = this.state.items['Time Series (5min)'];
        let xAxis = [];
        console.log(items);
        xAxis = Object.keys(items);
        let date = [];
        let open = [];
        let high = [];
        let low = [];
        let close = [];
        let volume = [];
        let min = items[xAxis[2]]['1. open'];
        let max = items[xAxis[2]]['1. open'];
        for(let i = 0; i < xChart + 1; i++){
            let aux = new Date(xAxis[i]);
            open[xChart - i] = items[xAxis[xChart - i]]['1. open'];
            high[xChart - i] = items[xAxis[xChart - i]]['2. high'];
            low[xChart - i] = items[xAxis[xChart - i]]['3. low'];
            close[xChart - i] = items[xAxis[xChart - i]]['4. close'];

            if(open[xChart - i] < min){
                min = open[i];
            }
            if(high[xChart - i] < min){
                min = high[i];
            }
            if(low[xChart - i] < min){
                min = low[i];
            }
            if(close[xChart - i] < min){
                min = close[i];
            }

            if(open[xChart - i] > max){
                max = open[i];
            }
            if(high[xChart - i] > max){
                max = high[i];
            }
            if(low[xChart - i] > max){
                max = low[i];
            }
            if(close[xChart - i] > max){
                max = close[i];
            }

            volume[xChart - i] = items[xAxis[xChart - i]]['5. volume'];
            date[xChart - i] = aux.getHours() + ':' + aux.getMinutes();
            if(aux.getMinutes() === 0){
                date[xChart - i] = date[xChart - i] + '0';
            }else if(aux.getMinutes() === 5){
                date[xChart - i] = aux.getHours() + ':' +'0'+ aux.getMinutes();
            }
            data[xChart - i] = {time: date[xChart - i], open: open[xChart - i], high: high[xChart - i], low: low[xChart - i], close: close[xChart - i], volume: volume[xChart - i], min: min, max: max};
        }

        //console.log(open);
        console.log(min);
        console.log(max);
        //console.log(xAxis);
        return(data);
    }

    componentDidMount() {
        let sym = this.state.symbol;
        let lastUpdate = this.state.lastUpdate;
        let func = this.state.func;
        let interval = this.state.interval;
        
        fetch('https://www.alphavantage.co/query?function=' + func +'&symbol='+ sym +'&interval='+ interval +'&outputsize=full&apikey=' + KEY)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(result => {
                //console.log(JSON.stringify(result));
                if(!isUndefined(result["Meta Data"])){
                    this.setState({ itemsIsLoaded: true, items: result, });
                    //console.log(JSON.stringify(result["Meta Data"]["2. Symbol"]));
                }
            })
            .catch(error => this.setState({ error, itemsIsLoaded: true }));
                
                

        fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${sym}&apikey=${key}")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(result => {
                //console.log(JSON.stringify(data));
                this.setState({ infoIsLoaded: true, info: result, });
                //console.log(JSON.stringify(data["Meta Data"]["1. Information"]));
            })
            .catch(error => this.setState({ error, infoIsLoaded: true }));
            

    }

    render(){
        var {error, itemsIsLoaded, infoIsLoaded, items, info} = this.state;

        if(error){
            return(
                <div className="error">Error: {error.message}</div>
            );
        } else if (infoIsLoaded && !itemsIsLoaded){
            return(
                <div>
                    <div className = 'title'> 
                            <h1> STOCK MARKET PRICES</h1> 
                    </div>
                    <div className='mainBox'>
                        <div className='topnav'>

                        </div>
                    </div>
                </div>
            );
        } else if(itemsIsLoaded){
            return(
                <div>
                    <div className = 'title'> 
                        <h1> STOCK MARKET PRICES</h1> 
                    
                    </div>
                    <div className='mainBox'>
                        <div className='topnav'>
                                <Search 
                                    ref={search => this.search = search}
                                />
                        </div>
                        <div className='canvas'>
                            <StockCharts 
                                symbol = {this.state.items["Meta Data"]["2. Symbol"]}
                                data = {this.fillData()}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <div className = 'title'> 
                            <h1> STOCK MARKET PRICES</h1> 
                    </div>
                    <div className='mainBox'>
                        <div className='topnav'>
                            <div className='Loading'>...</div>
                        </div>
                    </div>
                </div>
            );
        }
    }

}
export default StockApp;

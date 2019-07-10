import React from 'react';
import { isUndefined } from 'util';
import StockApp from '../components/StockApp';
import { connect } from 'react-redux';
import { submitSymbol } from '../actions/symbolActions';
import { setChartObjs, fetchDataError } from '../actions/dataActions';

const mapStateToProps = state => ({
    symbol: state.symbolReducer.symbol,
    chartObjs: state.dataReducer.chartObjs,
    name: state.symbolReducer.name,
    timeFunc: state.chartReducer.timeFunc,
    interval: state.chartReducer.interval,
    vantKey: state.dataReducer.vantKey,

});
  
const mapDispatchToProps = dispatch => ({
    submitSymbol: symbol => dispatch(submitSymbol(symbol)),
    setChartObjs:  data => dispatch(setChartObjs(data)),
    fetchDataError: error => dispatch(fetchDataError(error)),
});

class StockAppContainer extends React.Component {

    componentDidUpdate(prevProps, prevState){
        if (this.props.symbol !== prevProps.symbol){
            if(this.props.symbol !== ''){
                this.fetchData();
            }
        }

        if(this.props.chartObjs !== prevProps.chartObjs){
            return true;
        }
    }

    fillData(items){
        const name = this.props.name;
        const symbol = this.props.symbol;
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
        let newChart = this.props.chartObjs;
        newChart = newChart.concat({id: Date.now(), symbol: symbol, name: name, data: data, lineColor: "Purple"});
        this.props.setChartObjs(newChart);
        this.props.submitSymbol("");
    }

    fetchData(){
        const sym = this.props.symbol;
        const timeFunc = this.props.timeFunc;
        const vantKey = this.props.vantKey;
        const interval = this.props.interval;
        
        fetch('https://www.alphavantage.co/query?function=' + timeFunc +'&symbol='+ sym +'&interval='+ interval +'&outputsize=full&apikey=' + vantKey)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('it Was not possible to fetch data');
                }
            })
            .then(result => {
                if(!isUndefined(result["Meta Data"])) {
                    this.fillData(result['Time Series (5min)']);                    
                }
                else {
                    console.log("I didn't fetch something valid: ", result);
                    this.props.submitSymbol("");
                }
            })
            .catch(error => this.props.fetchDataError(error));            

    }

    onDeleteHandle(){
        let id = arguments[0];

        this.props.setChartObjs(this.props.chartObjs.filter(item => item.id!== id ));
    }

    onEditHandle(){
        let id = arguments[0];
        let newChartObjs = this.props.chartObjs;
        newChartObjs = newChartObjs.map(item => {
                if(item.id === id){
                    if(item.lineColor === "Purple"){
                        return ({id: item.id, name: item.name, symbol: item.symbol, data: item.data, lineColor: "Blue"});
                    }
                    else if(item.lineColor === "Blue"){
                        return ({id: item.id, name: item.name, symbol: item.symbol, data: item.data, lineColor: "Orange"});
                    }
                    else
                        return ({id: item.id, name: item.name, symbol: item.symbol, data: item.data, lineColor: "Purple"});
                }
                return(item);
        });

        console.log("newChartObjs: ", newChartObjs)
        this.props.setChartObjs(newChartObjs);
    }

    render(){
        
        return(
            <StockApp
            onDeleteHandle = {this.onDeleteHandle.bind(this)}
            onEditHandle = {this.onEditHandle.bind(this)}
            chartObjs = {this.props.chartObjs}
            
            />
        );
        
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockAppContainer);


import React from 'react';
import './StockApp.css';
import StockChartsContainer from './StockChartsContainer';
import SearchContainer from './SearchContainer';

class StockApp extends React.Component {

    render(){
        const chartObjs = this.props.chartObjs;

        return(
            <div>
                <div className = 'title'> 
                    <h1> STOCK MARKET PRICES</h1> 
                    <SearchContainer 
                        symbol = {this.props.symbol}
                        fetchData = {this.props.fetchData.bind(this)}
                        searchList = {this.props.searchList}
                        changeSymbol ={this.props.changeSymbol.bind(this)}
                        submitSymbol ={this.props.submitSymbol.bind(this)}
                    />
                </div>
                <div className='canvas'>
                    <ul>
                    {chartObjs.map((item) => {
                        if(item.id !== null){
                            return(
                                <li id="charts" key= {item.id} onDoubleClick={this.props.onDeleteHandle.bind(this, item.id)}>
                                    <h2>{item.symbol}</h2>
                                    <h3>{item.name}</h3>
                                    <StockChartsContainer key={item.id} data = {item.data} />
                                </li>
                            );
                        }
                    }) }
                    </ul>
                </div>
            </div>
        );
        
    }

}
export default StockApp;

import React from 'react';
import './StockApp.css';
import StockChartsContainer from '../containers/StockChartsContainer';
import SearchContainer from '../containers/SearchContainer';
import PropTypes from 'prop-types';


class StockApp extends React.Component {

    render(){

        return(
            <div>
                <div className = 'title'> 
                    <h1> STOCK MARKET PRICES</h1> 
                    <SearchContainer />
                </div>
                <div className='canvas'>
                    <ul>
                    {this.props.chartObjs
                        .filter(item => item.id !== null)
                        .map(item => {
                            return(
                                <li id="charts" key= {item.id}>
                                    <h2>{item.symbol}</h2>
                                    <h3>{item.name}</h3>
                                    <StockChartsContainer key={item.id} data = {item.data} lineColor={item.lineColor} />
                                    <button className="delete" type="button" onClick={this.props.onDeleteHandle.bind(this,  item.id)}> Delete </button>
                                    <button className="edit" type="button" onClick={this.props.onEditHandle.bind(this,  item.id)}> Change Color </button>
                                </li>
                            );
                    }) }
                    </ul>
                </div>
            </div>
        );
        
    }

}

StockApp.propTypes = {
    key: PropTypes.string,
    symbol: PropTypes.string,
    chartObjs: PropTypes.array,
    updateSymbol: PropTypes.func,
    submitSymbol: PropTypes.func,
    onDeleteHandle: PropTypes.func,

};

export default StockApp;

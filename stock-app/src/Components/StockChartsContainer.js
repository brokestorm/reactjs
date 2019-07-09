import React, { PureComponent } from 'react';
import StockCharts from "./StockCharts"

export default class StockChartsContainer extends PureComponent {

    getDiff(data){
        var diff = []

        for(let i = 0; i < data.length; i++){
            if(i === 0){
                diff[i] = true;
            }else if(data[i - 1]['volume'] < data[i]['volume'] ){
                diff[i] = true;
            }
            else {
                diff[i] = false;
            }
        }

        return diff;
    }

    render() {
        const data = this.props.data;      

        return (
        <div>
            <StockCharts 

            data = {data}
            diff = {this.getDiff(data)}

            />
            
      </div>
    );
  }
}
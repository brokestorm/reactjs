import React, { PureComponent } from 'react';
import StockCharts from "../components/StockCharts";

class StockChartsContainer extends PureComponent {

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

    getColor(color){
        console.log(color);
        if(color === "Purple"){
            return "#ff00ff";
        }
        else if(color === "Blue"){
            return "#0044ff";
        }
        else if(color === "Orange"){
            return "#ff5500";
        }
        else{
            return "#ff00ff";
        }
    }

    render() {
        const data = this.props.data;      
        const lineColor = this.props.lineColor;

        return (
        <div>
            <StockCharts 

            data = {data}
            diff = {this.getDiff(data)}
            lineColor = {this.getColor(lineColor)}

            />
            
      </div>
    );
  }
}

export default StockChartsContainer;
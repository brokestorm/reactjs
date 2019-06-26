import React, { PureComponent } from 'react';
import {
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush
} from 'recharts';

export default class Example extends PureComponent {

    getDiff(data){
        var diff = []

        for(let i = 0; i < data.length; i++){
            if(i === 0){
                diff[i] = true;
            }else if(parseInt(data[i - 1]['volume']) < parseInt(data[i]['volume']) ){
                diff[i] = true;
            }
            else {
                diff[i] = false;
            }
        }

        return diff;
    }

    getMaxVolume(data){
        var max = 0;
        var aux = 0;
        for(let i = 0; i < data.length; i++){
            aux = parseInt(data[i]['volume']);
            if(aux > max){
                max = aux;
            }
        }

        return max;
    }

    getMax(data){
        var max = 0;
        var open = 0;
        var high = 0;
        var low = 0;
        var close = 0;

        for(let i = 0; i < data.length; i++){
            open = parseFloat(data[i]['open']);
            high = parseFloat(data[i]['high']);
            low = parseFloat(data[i]['low']);
            close = parseFloat(data[i]['close']);

            if(open > max){
                max = open;
            }
            if(high > max){
                max = high;
            }
            if(low > max){
                max = low;
            }
            if(close > max){
                max = close;
            }
        }

        return max;
    }

    getMin(data){
        var min = Infinity;
        var open = Infinity;
        var high = Infinity;
        var low = Infinity;
        var close = Infinity;

        for(let i = 0; i < data.length; i++){
            open = parseFloat(data[i]['open']);
            high = parseFloat(data[i]['high']);
            low = parseFloat(data[i]['low']);
            close = parseFloat(data[i]['close']);

            if(open < min){
                min = open;
            }
            if(high < min){
                min = high;
            }
            if(low < min){
                min = low;
            }
            if(close < min){
                min = close;
            }
        }

        return min;
    }

    render() {
        const data = this.props.data;
        const maxVol = this.getMaxVolume(data);
        const max = this.getMax(data);
        const min = this.getMin(data);
        const diff = this.getDiff(data);        

        return (
        <div>
            <LineChart
                width={1000}
                height={1000}
                data={data}
          
                syncId="anyId"
                margin={{
                    top: 20, right: 20, left: 40, bottom: 20,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain ={[ min - 0.05, max + 0.01] } />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="#28AFA2" fill="#8884d8" />
                <Line type="monotone" dataKey="high" stroke="#731DD8" fill="#82ca9d" />
                <Line type="monotone" dataKey="low" stroke="#FB8B24" fill="#82ca9d" />
                <Line type="monotone" dataKey="close" stroke="#D90368" fill="#82ca9d" />
                <Brush height={30}/>
            </LineChart>

            <p>Volumes</p>
            <BarChart
                width={1000}
                height={300}
                data={data}

                syncId="anyId"
                margin={{
                     top: 20, right: 20, left: 40, bottom: 20,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain ={[ 0, maxVol + 1000] } />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#00cc00" >
                {
                    diff.map((entry, index) => (
                        <Cell fill={entry === true ? '#00cc00' : '#ff1a1a'} key={`cell-${index}`} />
                    ))
                }
                </Bar>
            </BarChart>
            
      </div>
    );
  }
}
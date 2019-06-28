import React, { PureComponent } from 'react';
import {
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
  AreaChart, Area,
} from 'recharts';

export default class Example extends PureComponent {



    render() {
        const data = this.props.data;
        const symbol = this.props.symbol;

        return (
        <div>
            <h4 className = "chartTitle">{symbol}</h4>
            <LineChart
                width={1000}
                height={1000}
                data={data}
          
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain ={[ data[19]['min'], data[19]['max']] } />
                <Tooltip />
          
                <Line type="monotone" dataKey="open" stroke="#28AFA2" fill="#8884d8" />
                <Line type="monotone" dataKey="high" stroke="#731DD8" fill="#82ca9d" />
                <Line type="monotone" dataKey="low" stroke="#FB8B24" fill="#82ca9d" />
                <Line type="monotone" dataKey="close" stroke="#D90368" fill="#82ca9d" />

            </LineChart>

            <p>Volumes</p>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                     top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#C200FB" />
            </BarChart>
            
      </div>
    );
  }
}
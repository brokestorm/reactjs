import React, { PureComponent } from 'react';
import {
  Line, Bar, Cell, XAxis, YAxis, Tooltip, Brush, ComposedChart, Label,
} from 'recharts';

export default class Example extends PureComponent {

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

    getMaxVolume(data){
        var max = 0;
        var aux = 0;
        for(let i = 0; i < data.length; i++){
            aux = data[i]['volume'];
            if(aux > max){
                max = aux;
            }
        }

        return max;
    }

    getMax(data){
        var max = 0;
        var high = 0;

        for(let i = 0; i < data.length; i++){
            high = data[i]['high'];

            if(high > max){
                max = high;
            }
        }

        return max;
    }

    getMin(data){
        var min = Infinity;
        var low = Infinity;

        for(let i = 0; i < data.length; i++){
            if(data[i]['low'] < min){
                min = low;
            }
        }

        return min;
    }

    render() {
        const data = this.props.data;
        const symbol = this.props.symbol;

        //const maxVol = this.getMaxVolume(data);
        //const max = this.getMax(data);
        //const min = this.getMin(data);

        const diff = this.getDiff(data);        

        return (
        <div>
            <ComposedChart
                width={500}
                height={300}
                data={data}
          
                syncId="anyId"
                margin={{
                    top: 20, right: 20, left: 40, bottom: 20,
                }}
                >
                
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" domain={['auto', 'auto']}/>
                <YAxis yAxisId="right" orientation="right" />
                <Label value={symbol} offset={0} position="insideTopRight"/>
                <Tooltip />
                <Bar yAxisId="right" dataKey="volume" fill="#00cc00" >
                {
                    diff.map((entry, index) => (
                        <Cell fill={entry === true ? '#008000' : '#8b0000'} key={`cell-${index}`} />
                    ))
                }
                </Bar>
                <Line yAxisId="left" type="monotone" dataKey="close" stroke="#ff00ff" dot={false} />
                <Brush height={10}/>
                </ComposedChart>
            
      </div>
    );
  }
}
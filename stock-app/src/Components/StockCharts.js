import React, { PureComponent } from 'react';
import {
  Line, Bar, Cell, XAxis, YAxis, Tooltip, ComposedChart,
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

    render() {
        const data = this.props.data;

        const diff = this.getDiff(data);        

        return (
        <div>
            <ComposedChart
                width={500}
                height={300}
                data={data}
          
                syncId="anyId"
                margin={{
                    top: 10, right: 10, left: 10, bottom: 10,
                }}
                >
                
                <XAxis dataKey="time" tick={false}/>
                <YAxis yAxisId="left" domain={['auto', 'auto']} padding={{ bottom: 100, top: 10 }} tick={false}/>
                <YAxis yAxisId="right" orientation="right" tick={false}/>
                <Tooltip />
                <Bar yAxisId="right" dataKey="volume" fill="#00cc00" >
                {
                    diff.map((entry, index) => (
                        <Cell fill={entry === true ? '#008000' : '#8b0000'} key={`cell-${index}`} />
                    ))
                }
                </Bar>
                <Line yAxisId="left" type="monotone" dataKey="close" stroke="#ff00ff" dot={false} />
                </ComposedChart>
            
      </div>
    );
  }
}
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {  Line, Bar, Cell, XAxis, YAxis, Tooltip, ComposedChart } from 'recharts';

class StockCharts extends PureComponent {

    render() {    
        return (
        <div>
            <ComposedChart
                width={500}
                height={300}
                data={this.props.data}
          
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
                    this.props.diff.map((entry, index) => (
                        <Cell fill={entry === true ? '#008000' : '#8b0000'} key={`cell-${index}`} />
                    ))
                }
                </Bar>
                <Line yAxisId="left" type="monotone" dataKey="close" stroke={this.props.lineColor} dot={false} />
            </ComposedChart>
            
      </div>
    );
  }
}


StockCharts.propTypes = {
    data: PropTypes.array,
    diff: PropTypes.array,
};

export default StockCharts;
import React from 'react';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Crosshair,
    MarkSeries,
    VerticalBarSeries,
    HorizontalBarSeries
} from 'react-vis';
import AreaMarkSeries from './AreaMarkSeries';
import {scaleLinear} from 'd3-scale';
const DATA = [
    [
        {x: 1, y: 10},
        {x: 2, y: 7},
        {x: 3, y: 15}
    ],
    [
        {x: 1, y: 20},
        {x: 2, y: 5},
        {x: 3, y: 15}
    ]
];
import * as d3 from 'd3';
export default class DynamicCrosshair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crosshairValues: []
        };

        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onNearestX = this._onNearestX.bind(this);
    }

    /**
     * Event handler for onNearestX.
     * @param {Object} value Selected value.
     * @param {index} index Index of the value in the data array.
     * @private
     */
    _onNearestX(value, info) {
        this.setState({crosshairValues: DATA.map(d => d[info.index])});
        console.info(value,info);
    }


    _getFromLinearColorScale(domain,range,value){
        return d3.scaleLinear().range(['1f77b4','ff7f0e']).domain([0,100])(value);
    }
    /**
     * Event handler for onMouseLeave.
     * @private
     */
    _onMouseLeave() {
        this.setState({crosshairValues: []});
    }

    render() {
        return (
            <XYPlot
                width={300}
                height={300}
                stackBy={'y'}
                colorRange={['#3944ff','#ff4933','#1bff31']}
                colorType='category'

            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                    className="mark-series-example"
                    strokeWidth={2}
                    opacity="0.8"

                    data={[
                        {x: 1, y: 10, color:'piston'},
                        {x: 1.7, y: 12,color:'rotary'},
                        {x: 2, y: 5,  color:'piston'},
                        {x: 2, y: 15, color:'rotary'},
                        {x: 2.5, y: 7, color:'piston2'}
                    ]}/>
                <VerticalBarSeries
                    className="mark-series-example"
                    strokeWidth={2}
                    opacity="0.8"

                    data={[
                        {x: 1, y: 10, color:'piston'},
                        {x: 1.7, y: 12,color:'rotary'},
                        {x: 2, y: 5,  color:'piston'},
                        {x: 2, y: 15, color:'rotary'},
                        {x: 2.5, y: 7, color:'piston2'}
                    ]}/>
            </XYPlot>
        );
    }
}
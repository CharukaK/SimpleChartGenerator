import React from 'react';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Crosshair
} from 'react-vis';
// import AreaMarkSeries from 'AreaMarkSeries';
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
                onMouseLeave={this._onMouseLeave}
                width={300}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                {/*<AreaMarkSeries*/}
                    {/*onNearestX={this._onNearestX}*/}
                    {/*data={DATA[0]}/>*/}
                <LineSeries
                    data={DATA[1]}/>
                <Crosshair values={this.state.crosshairValues}/>
            </XYPlot>
        );
    }
}
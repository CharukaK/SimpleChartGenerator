import React from 'react';

import {
    AreaSeries,
    Crosshair,
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineMarkSeries
} from 'react-vis';

const DATA = [
    [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: null},
        {x: 4, y: 7},
        {x: 5, y: 20}
    ],
    [
        {x: 1, y: 30},
        {x: 2, y: 0},
        {x: 5, y: null},
        {x: 4, y: 15},
        {x: 5, y: 89}
    ]
];

export default class NullDataExample extends React.Component {
    state = {
        crosshairValues: []
    };

    onMouseLeave = () => this.setState({crosshairValues: []});
    onNearestX = (value, {index}) =>
        this.setState({crosshairValues: DATA.map(d => d[index].y !== null && d[index])});

    render() {
        return (
            <XYPlot
                width={300}
                height={300}
                onMouseLeave={this.onMouseLeave}>
                <XAxis/>
                <YAxis/>
                <HorizontalGridLines />
                <VerticalGridLines />

                <AreaSeries nullAccessor={(d) => d.y !== null} onNearestX={this.onNearestX} data={DATA[0]} />
                <LineMarkSeries nullAccessor={(d) => d.y !== null} data={DATA[1]} color='red' />
                <Crosshair
                    values={this.state.crosshairValues}/>
            </XYPlot>
        );
    }
}
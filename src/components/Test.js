import React from 'react';
// import {getColorFromSchema} from './ChartWrapper';
import {
    AreaSeries,
    Crosshair,
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalBarSeries,
    VerticalBarSeries,
    LineMarkSeries
} from 'react-vis';
import * as d3 from 'd3';

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
        {x: 2, y: null},
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
        console.info(d3.scaleOrdinal().range(d3.schemeCategory10).domain([0,1,2,3,4,5,6,7,8,9])(0));
        console.info(d3.scaleOrdinal().range(d3.schemeCategory10).domain([0,1,2,3,4,5,6,7,8,9])(1));
        console.info(d3.scaleOrdinal().range(d3.schemeCategory10).domain([0,1,2,3,4,5,6,7,8,9])(2));
        console.info(getColorFromSchema('category20',2));
        return (

            <XYPlot
                width={300}
                height={300}
                onMouseLeave={this.onMouseLeave}>
                <XAxis title='rpm' orientation='left'/>
                <YAxis title='torque' orientation='top'/>
                <HorizontalGridLines />
                <VerticalGridLines />

                {/*<AreaSeries nullAccessor={(d) => d.y !== null} onNearestX={this.onNearestX} opacity={0.5} data={DATA[0]} />*/}
                {/*<LineMarkSeries nullAccessor={(d) => d.y !== null} data={DATA[1]} opacity={0.5} color='red' />*/}
                <HorizontalBarSeries data={DATA[1].filter((d)=>d.y!==null)} opacity={0.5} color='red' />
                <Crosshair
                    values={this.state.crosshairValues}/>
            </XYPlot>
        );
    }
}


function getColorFromSchema(schema, index) {
    switch (schema) {
        case 'category10':
            return d3.scaleOrdinal(d3.schemeCategory10)(index);
        case 'category20':
            return d3.scaleOrdinal(d3.schemeCategory20)(index);
        case 'category20b':
            return d3.scaleOrdinal(d3.schemeCategory20b)(index);
        case 'category20c':
            return d3.scaleOrdinal(d3.schemeCategory20c)(index);
    }
}
import React from 'react';

import {
    FlexibleWidthXYPlot,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Crosshair,
    MarkSeries,
    LineMarkSeries,
    VerticalBarSeries,
    HorizontalBarSeries,
    ArcSeries,
    LineMarkSeriesCanvas,
    VerticalBarSeriesCanvas,
    MarkSeriesCanvas
} from 'react-vis';
import AreaMarkSeries from './AreaMarkSeries';
import {scaleLinear} from 'd3-scale';
import VIzG2 from "./VIzG2";
import {Row} from "./util";


export default class DynamicCrosshair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{x: 1, y: 10,color: 'piston'}, {x: 1, y: 20,  color: 'rotary'}],
            height:800,
            width:450,
            timer:1,
        };
    }

    metadata = {
        names: ['rpm', 'torque', 'horsepower', 'EngineType', 'weight'],
        types: ['linear', 'linear', 'linear', 'ordinal', 'linear']
    };


    /*****************[START] Chart Config******************/
    lineChartConfig = {
        x: 'rpm',
        charts: [{type: 'line', y: 'torque', color: 'EngineType', colorDomain: ['', '', 'piston']}],
        maxLength: 7,
        width: 700,
        height: 450,
        animation:true
    };

    singleAreaChartConfig = {
        x: 'rpm',
        charts: [{type: 'area', y: 'horsepower', fill: '#2ca02c'}],
        maxLength: 7,
        width: 700,
        height: 450,
        animation:true
    };

    barChartConfig = {
        x: 'rpm',
        charts: [{type: 'bar', y: 'torque', color: 'EngineType', colorDomain: ['', '', 'piston']}],
        maxLength: 7,
        width: 700,
        height: 450,
        animation:true
    };

    /*****************[END] Chart Config******************/


    componentDidMount() {
        setInterval(() => {
            let randomY = Math.random() * 100;
            let {data}=this.state;
            // console.info(data);
            data.push({
                x: parseInt(this.state.timer),
                y: this.state.timer*2,

                color: 'piston'
            });
            data.push({x: parseInt(this.state.timer), y: this.state.timer*7,  color: 'rotary'});

            this.setState({
                data: data,

                timer: this.state.timer + 1
            })
            ;

        }, 500);
    }


    render() {
        return (
            <div>
                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}

                    animation={false}
                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <VerticalBarSeriesCanvas data={this.state.data}/>
                </XYPlot>
                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}
                    animation={false}


                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <LineMarkSeriesCanvas data={this.state.data}/>
                </XYPlot>

                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}

                    animation={false}
                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <VerticalBarSeriesCanvas data={this.state.data}/>
                </XYPlot>
                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}
                    animation={false}


                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <LineMarkSeriesCanvas data={this.state.data}/>
                </XYPlot><XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}

                    animation={false}
                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <VerticalBarSeriesCanvas data={this.state.data}/>
                </XYPlot>
                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}
                    animation={false}


                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <LineMarkSeriesCanvas data={this.state.data}/>
                </XYPlot><XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}

                    animation={false}
                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <VerticalBarSeriesCanvas data={this.state.data}/>
                </XYPlot>
                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}
                    animation={false}


                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <LineMarkSeriesCanvas data={this.state.data}/>
                </XYPlot><XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}

                    animation={false}
                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <VerticalBarSeriesCanvas data={this.state.data}/>
                </XYPlot>
                <XYPlot
                    height={450}
                    width={800}
                    colorType="category"
                    xType='linear'
                    margin={{left: 100}}
                    animation={false}


                >

                    <HorizontalGridLines/>
                    <VerticalGridLines/>


                    <XAxis title='x'/>
                    <YAxis title='y'/>
                    <LineMarkSeriesCanvas data={this.state.data}/>
                </XYPlot>
            </div>


        );
    }
}
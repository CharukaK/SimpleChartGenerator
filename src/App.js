import React from 'react';

import {Row} from './components/util';
import VizG from './components/VizG';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [[1, 10, 23, 'piston'], [1, 20, 34, 'rotary']],
            data2: [[1, 10, 23, 'piston']],
            scatterPlot: [
                [1, 41600, 3.5, 79.91, 0.8, 0.03, 'piston'],
                [2, 37800, 3.5, 79.65, 1.3, 0.06, 'rotary']],
            timer: 0
        };
    }

    metadata = {
        names: ['rpm', 'torque', 'horsepower','weight', 'EngineType'],
        types: ['linear', 'linear', 'linear', 'linear','ordinal']
    };


    /*****************[START] Chart Config******************/
    lineChartConfig = {
        x: 'rpm',
        charts: [{type: 'line', y: 'torque', color: 'EngineType', colorDomain: ['', '', 'piston']}],
        maxLength: 7,
        width: 700,
        height: 450,
        // animation:true
    };

    singleAreaChartConfig = {
        x: 'rpm',
        charts: [{type: 'area', y: 'horsepower', fill: '#2ca02c'}],
        maxLength: 7,
        width: 700,
        height: 450,
        // animation:true
    };

    barChartConfig = {
        x: 'rpm',
        charts: [{type: 'bar', y: 'torque', color: 'EngineType', colorDomain: ['', '', 'piston']}],
        maxLength: 7,
        width: 700,
        height: 450,
        // animation:true
    };

    scatterPlotConfig = {
        type: 'scatter',
        charts: [
            {
                type: 'scatter',
                x: 'rpm',
                y: 'torque',
                color: 'horsepower',
                size: 'weight',
                maxLength: 30
            }],

        width: 400,
        height: 450
    };

    /*****************[END] Chart Config******************/



    componentDidMount() {
        setInterval(() => {
            let randomY = Math.random() * 100;
            this.setState({
                data: [
                    [this.state.timer, this.state.timer === 20 ? null : randomY * 2, 10, 'piston'],
                    [this.state.timer, randomY * 3, 10, 'rotary'],

                ],
                data2: [

                    [this.state.timer, randomY*8, randomY, 'rotary']
                ],
                scatterPlot:[[this.state.timer,randomY*2,randomY*3,randomY*5,'piston'],[this.state.timer,randomY*5,randomY*6,randomY*9,'rotary']],
                timer: this.state.timer + 1
            });

        }, 500);
    }

    //<ChartWrapper config={this.areaChartConfig} metadata={this.metadata} data={this.state.data}/>
    render() {
        return (

            <div>
                <center><h1>Charting Config Samples</h1></center>
                <Row title="Line Series" chart="line" media={true} actionBar={true}>
                    <div>
                        <VizG config={this.lineChartConfig} metadata={this.metadata} data={this.state.data}/>
                    </div>

                    <br/>
                </Row>
                <Row title="Bar Series" chart="bar" media={true} actionBar={true}>
                    <div>
                        <VizG config={this.barChartConfig} metadata={this.metadata} data={this.state.data}/>
                    </div>
                    <br/><br/>
                </Row>
                <Row title="Area Series" chart="area" media={true} actionBar={true}>
                    <div>
                        <VizG config={this.singleAreaChartConfig} metadata={this.metadata} data={this.state.data2}/>
                    </div>
                    <br/><br/>
                </Row>
                <Row title="Scatter Plots" chart="scatter" media={true} actionBar={true}>
                    <div>
                        <VizG config={this.scatterPlotConfig} metadata={this.metadata} data={this.state.scatterPlot}/>
                    </div>
                    <br/><br/>
                </Row>

                {/*<Row title="asd" chart="asd"/>*/}
            </div>

        );
    }
}
import React from 'react';
import ChartWrapper from './components/ChartWrapper';
import Test from './components/Test';
import {Row} from "./components/util";
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LineChartConfigSample from "./Samples/LineChartConfigSample";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [[1, 10, 23, 'piston'], [1, 20, 34, 'rotary']],
            data2:[[1, 10, 23, 'piston']],
            timer: 0
        };
    }

    metadata = {
        names: ['rpm', 'torque', 'horsepower', 'EngineType'],
        types: ['linear', 'linear', 'linear', 'ordinal']
    };



    /*****************[START] Chart Config******************/
    lineChartConfig = {
        x: 'rpm',
        charts: [{ type: 'line', y: 'torque', color: 'EngineType',colorDomain:['','','piston']}],
        maxLength: 7,
        width: 700,
        height: 450,
        animation:true
    };

    singleAreaChartConfig = {
        x: 'rpm',
        charts: [{ type: 'area', y: 'horsepower', fill:'#2ca02c'}],
        maxLength: 7,
        width: 700,
        height: 450,
        animation:true
    };

    barChartConfig = {
        x: 'rpm',
        charts: [{ type: 'bar', y: 'torque', color: 'EngineType',colorDomain:['','','piston']}],
        maxLength: 7,
        width: 700,
        height: 450,
        animation:true
    };

    /*****************[END] Chart Config******************/



    componentDidMount() {
        setInterval(() => {
            this.setState({
                data: [
                    [this.state.timer, this.state.timer===20? null :Math.random() * 100, 10, 'piston'],
                    [this.state.timer, Math.random() * 100, 10, 'rotary']
                ],
                data2: [

                    [this.state.timer, Math.random() * 100, Math.random()*100, 'rotary']
                ],
                timer: this.state.timer + 1
            });

        }, 2000);
    }

    //<ChartWrapper config={this.areaChartConfig} metadata={this.metadata} data={this.state.data}/>
    render() {
        return (
            <div>
                <center><h1>Charting Config Samples</h1></center>
                <Row title="Line Series" chart="line" media={true} actionBar={true}>
                    <ChartWrapper config={this.lineChartConfig} metadata={this.metadata} data={this.state.data}/>
                </Row>
                <Row title="Bar Series" chart="bar" media={true} actionBar={true}>
                    <ChartWrapper config={this.barChartConfig} metadata={this.metadata} data={this.state.data}/>
                </Row>
                <Row title="Area Series" chart="area" media={true} actionBar={true}>
                    <ChartWrapper config={this.singleAreaChartConfig} metadata={this.metadata} data={this.state.data2}/>
                </Row>

                {/*<Row title="asd" chart="asd"/>*/}
            </div>

        );
    }
}
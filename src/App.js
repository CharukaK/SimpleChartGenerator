import React from 'react';
import ChartWrapper from './components/ChartWrapper';
import Test from './components/Test';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [[1, 10, 23, 'piston'], [1, 20, 34, 'rotary']],
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
        maxLength: 30,
        width: 800,
        height: 450
    };

    /*****************[END] Chart Config******************/



    componentDidMount() {
        setInterval(() => {
            this.setState({
                data: [
                    [this.state.timer, this.state.timer===20? null :Math.random() * 100, Math.random() * 100, 'piston'],
                    [this.state.timer, Math.random() * 100, Math.random() * 100, 'rotary']
                ],
                timer: this.state.timer + 1
            });

        }, 500);
    }

    //<ChartWrapper config={this.lineChartConfig} metadata={this.metadata} data={this.state.data}/>
    render() {
        return (
            <ChartWrapper config={this.lineChartConfig} metadata={this.metadata} data={this.state.data}/>

        );
    }
}
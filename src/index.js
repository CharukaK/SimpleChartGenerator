import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './components/Test';
import LineChart from './Samples/LineChartConfigSample';
import BarChart from './Samples/BarChartConfigSample';
import AreaChart from './Samples/AreaChartConfigSample';
import ScatterPlot from './Samples/ScatterChartConfigSample';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route exact path="/test" component={Test}/>
            <Route exact path="/line-charts" component={LineChart}/>
            <Route exact path="/bar-charts" component={BarChart}/>
            <Route exact path="/area-charts/" component={AreaChart}/>
            <Route exact path='/scatter-charts' component={ScatterPlot}/>
        </div>
    </Router>, document.getElementById('root'));




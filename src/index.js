import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './components/Test';
import LineChart from './Samples/LineChartConfigSample';
import BarChart from './Samples/BarChartConfigSample';
import AreaChart from './Samples/AreaChartConfigSample';
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
        </div>
    </Router>, document.getElementById('root'));




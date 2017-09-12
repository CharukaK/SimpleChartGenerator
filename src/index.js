import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './components/Test';
import LineChart from './Samples/LineChartConfigSample';
import BarChart from './Samples/BarChartConfigSample';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/test" component={Test}/>
            <Route path="/line-charts" component={LineChart}/>
            <Route path="/bar-charts" component={BarChart}/>
        </div>
    </Router>, document.getElementById('root'));




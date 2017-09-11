import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './components/Test';
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
        </div>
    </Router>, document.getElementById('root'));




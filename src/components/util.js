import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Perf from 'react-addons-perf';


export class Row extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
           children:null,
            title:this.props.title,
            subtitle:this.props.subtitle,
            actionBar:this.props.actionBar,
            chart:this.props.chart
        };
    }
    componentWillReceiveProps(props){
        this.setState({children:props.children});
    }



    render() {
        return (
            <div className="col-md-6 tile">

                    {/*<div className="panel-heading">*/}
                        {/*<h3 className="panel-title">{this.props.title}</h3>*/}
                    {/*</div>*/}
                    {/*<div className="panel-body">*/}
                        {/*<div className="text-right">*/}
                            {/*/!*<a href="charts/line">View Usage</a>*!/*/}
                            {/*{this.props.children}*/}
                        {/*</div>*/}

                        {/*<div className="text-right">*/}
                            {/*<a href={`charts/${this.props.chart}`}>View Usage</a>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

                    <Card style={{marginTop:50}} >
                        {
                            this.props.media?
                                <AppBar style={{marginBottom:10}} title={this.state.title} showMenuIconButton={false} />:
                                <CardTitle title={this.state.title} subtitle={this.state.subtitle}/>
                        }
                        {/*<CardTitle/>*/}
                        <CardMedia>

                            {this.state.children}

                        </CardMedia>
                        <CardActions>
                            <FlatButton label={this.state.actionBar?'View Usage' : ' '} onClick={()=>{
                                window.location.href=this.state.chart+'-charts';
                            }}/>
                            {/*<FlatButton label="Action2" />*/}
                        </CardActions>
                    </Card>
                </MuiThemeProvider>


            </div>

        );
    }
}

Row.defaultProps={
    media:false,
    actionBar:false,
};

Row.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle:PropTypes.string,
    children: PropTypes.any.isRequired,
    chart:PropTypes.string.isRequired,
    media:PropTypes.bool,
    actionBar:PropTypes.bool.isRequired
};






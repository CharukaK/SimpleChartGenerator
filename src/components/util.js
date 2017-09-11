import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

export class Row extends React.Component{



    constructor(props) {
        super(props);


    }
// {/*<div className="col-md-6 tile">*/}
// {/*<div className="panel panel-default">*/}
// {/*<div className="panel-heading">*/}
// {/*<h3 className="panel-title">{this.props.title}</h3>*/}
// {/*</div>*/}
// {/*<div className="panel-body">*/}
// {/*<div className="text-right">*/}
// {/*/!*<a href="charts/line">View Usage</a>*!/*/}
// {/*{this.props.children}*/}
// {/*</div>*/}
//
// {/*<div className="text-right">*/}
// {/*<a href={`charts/${this.props.chart}`}>View Usage</a>*/}
// {/*</div>*/}
// {/*</div>*/}
//
// {/*</div>*/}
// {/*</div>*/}
    render() {
        const classes = this.props.classes;
        return (

        <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        );
    }
}


Row.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    chart:PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};






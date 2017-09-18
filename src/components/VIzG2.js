import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    Hint,
    SearchableDiscreteColorLegend,
    FlexibleWidthXYPlot,
    HorizontalBarSeries,
    VerticalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalRectSeries,
    VerticalRectSeries,
    ArcSeries,
    LineMarkSeries,
    MarkSeries,
    AreaSeries,
    Crosshair,
    DiscreteColorLegend
} from 'react-vis';
import * as _ from 'lodash';


export default class VIzG2 extends React.Component{

    constructor(props){
        super(props);

        this.state={
            height:props.height,
            width:props.width,
            dataSets:{},
            chartArray:[],
            initialized:false
        }


    }


    componentDidMount(){
        this._populateDataSet(this.props);
    }

    componentWillReceiveProps(nextProps){
        this._populateDataSet(nextProps);
    }


    _populateDataSet(props){
        let {config,metadata,data} =props;
        let {dataSets,chartArray,initialized}=this.state;
        if(config.x){
            config.charts.map((chart,chartIndex)=>{
               if(chart.color){

               }



            });
        }else {
            //TODO: scatter plot and stuff

        }

        initialized=true;


        this.setState({
            dataSets:dataSets,
            chartArray:chartArray,
            initialized:initialized
        })

    }


    render(){
        return(
            <div>

            </div>
        );
    }
}
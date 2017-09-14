/**
 * Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/**
 * Copyright (c) 2016 Uber Technologies, Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


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
    Crosshair
} from 'react-vis';

import * as d3 from 'd3';
import '../../node_modules/react-vis/dist/style.css';
import PropTypes from 'prop-types';


export default class VizG extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataSets: {},
            width: props.config.width-100,
            height: props.config.height,
            chartArray: [],
            initialized: false,
            orientation:'bottom',
            stacked:false,
            animation:props.config.animation || false,
            multiDimensional:false,
            crosshairValues:[],
            hintValue:null
        };

        this._sortAndPopulateDataSet(props);
    }

    componentWillReceiveProps(nextProps) {
        this._sortAndPopulateDataSet(nextProps);
    }
    
    componentWillUnmount() {
        this.setState({});
    }


    /**
     * will sort and populate the dataSet that's defined in the state according to the given config
     * @param props Props that received
     */
    _sortAndPopulateDataSet(props){
        let {metadata,config,data} =props;
        let {dataSets,chartArray,initialized,orientation,stacked,multiDimensional}=this.state;

        //if x is defined it could be either a Line,Bar, Area or Geographical chart
        if(config.x){
            let xIndex=metadata.names.indexOf(config.x);//independant variable won't change between charts
            config.charts.map((chart,chartIndex)=>{
                let x0Index=metadata.names.indexOf(chart.x0);//x0 is defined for time series bar charts
                let yIndex=metadata.names.indexOf(chart.y);//index of y

                stacked=(chart.mode==='stacked');

                if (!initialized) {

                    chartArray.push({

                        type: chart.type,
                        categories: {},
                        mode: chart.mode || null,
                        colorIndex: 0,
                        orientation: chart.orientation || 'vertical'
                    });

                    let colorScale=chart.colorScale || 'category10';
                    let maxColorIndex=Array.isArray(colorScale)?
                        colorScale.length:parseInt(colorScale.substring(8,10));

                    let categoryIndex=metadata.names.indexOf(chart.color);
                    let dataSetName;

                    if(!chart.color){
                       dataSetName=metadata.names[yIndex];
                       multiDimensional=true;
                    }

                    data.map((datum,datIndex)=>{
                        if(categoryIndex>-1){
                            dataSetName=datum[categoryIndex];
                        }

                        if(!dataSets.hasOwnProperty(dataSetName)){
                            dataSets[dataSetName]=[];
                        }

                        //if the bar chart's orientation is horizontal the xy axis should be switched
                        if (chart.type === 'bar' && chart.orientation === 'left') {
                            dataSets[dataSetName].push({x: datum[yIndex], y: datum[xIndex]});
                            orientation='left';
                        } else {
                            dataSets[dataSetName].push({x: datum[xIndex], y: datum[yIndex],x0:datum[x0Index],y0:0});
                        }


                        if (dataSets[dataSetName].length > config.maxLength) {
                            dataSets[dataSetName].shift();
                        }

                        if (chart.colorDomain && !chartArray[chartIndex].categories.hasOwnProperty(dataSetName)) {
                            let colorID = chart.colorDomain.indexOf(dataSetName);
                            if (colorID > -1) {
                                chartArray[chartIndex]
                                    .categories[datum[categoryIndex]] = Array.isArray(colorScale) ?
                                    colorScale[colorID] :
                                    this._getColorFromSchema(colorScale, colorID);
                            }
                        }

                        if (!chartArray[chartIndex].categories.hasOwnProperty(dataSetName)) {
                            chartArray[chartIndex].categories[datum[categoryIndex]] = Array.isArray(colorScale) ?
                                colorScale[chartArray[chartIndex].colorIndex] :
                                this._getColorFromSchema(colorScale, chartArray[chartIndex].colorIndex);

                            // chartArray[chartIndex].colorIndex+=1;

                            if (chartArray[chartIndex].colorIndex > maxColorIndex) {
                                chartArray[chartIndex].colorIndex = 0;
                            }

                            chartArray[chartIndex].colorIndex = chartArray[chartIndex].colorIndex + 1;


                        }
                    });



                }


            });
        }else{
            //ToDo: scatter plots and pie charts
        }


    }

    
    /**
     * will return a string color based on the scema and index provided
     * @param schema Name of the d3 ordinal color scale schema (default: category10)
     * @param index Index of the color in the array
     * @private 
     */
    _getColorFromSchema(schema, index) {
        let length = 20, schemeCat;
    
        switch (schema) {
            case 'category10':
                schemeCat = d3.schemeCategory10;
                length = 10;
                break;
            case 'category20':
                schemeCat = d3.schemeCategory20;
                break;
            case 'category20b':
                schemeCat = d3.schemeCategory20b;
                break;
            case 'category20c':
                schemeCat = d3.schemeCategory20c;
                break;
    
        }
    
        return d3.scaleOrdinal().range(schemeCat).domain(Array.apply(null, {length: length}).map(Number.call, Number))(index);
    }

    render(){
        return(
            <div>

            </div>
        );
    }
}

VizG.propTypes = {
    config: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};
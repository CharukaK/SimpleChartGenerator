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
    AreaSeries
} from 'react-vis';

import * as d3 from 'd3';
import '../../node_modules/react-vis/dist/style.css';
import PropTypes from 'prop-types';


export default class ChartWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSets: {},
            width: props.config.width-100,
            height: props.config.height,
            categoryColorMap: [],
            initialized: false,
            orientation:'bottom',
            stacked:false,
            animation:props.config.animation || false,
            multiDimensional:false,
            crosshairValues:[]
        };

        this._onNearestX=this._onNearestX.bind(this);
        this._onMouseLeave=this._onMouseLeave.bind(this);
    }

    /**
     * Will run every time a component receives new props or change of props and this will sort out the data
     * into categories if it is specified in the config
     * @param nextProps - next set of props received by the Component
     */
    componentWillReceiveProps(nextProps) {
        let {metadata, config, data} = nextProps;

        let {dataSets, categoryColorMap, initialized,orientation,stacked,multiDimensional} = this.state;


        //if config has x attribute then it's either Line Chart, Bar Chart, Area Chart or a Geographical Map
        if (config.x) {
            //dependant axis and the independent axis is same in all of the charts

            let xIndex = metadata.names.indexOf(config.x);
            let yIndex = metadata.names.indexOf(config.charts[0].y);

            //loop through all the chart types in the chart config
            config.charts.map((chart, chartIndex) => {

                let x0index=chart.x0;
                stacked=chart.mode==='stacked';
                if (!initialized) {

                    categoryColorMap.push({

                        type: chart.type,
                        categories: {},
                        mode: chart.mode || null,
                        colorIndex: 0,
                        orientation: chart.orientation || 'vertical'
                    });
                }
                let colorScale = chart.colorScale || 'category10';
                let maxColorIndex = Array.isArray(colorScale) ?
                    colorScale.length : parseInt(colorScale.substring(8, 10));

                if (chart.color) {
                    let categoryIndex = metadata.names.indexOf(chart.color);
                    data.map((datum, datIndex) => {
                        if (!dataSets.hasOwnProperty(datum[categoryIndex])) {
                            dataSets[datum[categoryIndex]] = [];
                        }


                        //if the bar chart's orientation is horizontal the xy axis should be switched
                        if (chart.type === 'bar' && chart.orientation === 'left') {
                            dataSets[datum[categoryIndex]].push({x: datum[yIndex], y: datum[xIndex]});
                            orientation='left';
                        } else {
                            dataSets[datum[categoryIndex]].push({x: datum[xIndex], y: datum[yIndex],x0:datum[x0index],y0:0});
                        }


                        if (dataSets[datum[categoryIndex]].length > config.maxLength) {
                            dataSets[datum[categoryIndex]].shift();
                        }

                        if (chart.colorDomain && !categoryColorMap[chartIndex].categories.hasOwnProperty(datum[categoryIndex])) {
                            let colorID = chart.colorDomain.indexOf(datum[categoryIndex]);
                            if (colorID > -1) {
                                categoryColorMap[chartIndex]
                                    .categories[datum[categoryIndex]] = Array.isArray(colorScale) ?
                                    colorScale[colorID] :
                                    getColorFromSchema(colorScale, colorID);
                            }
                        }

                        if (!categoryColorMap[chartIndex].categories.hasOwnProperty(datum[categoryIndex])) {
                            categoryColorMap[chartIndex].categories[datum[categoryIndex]] = Array.isArray(colorScale) ?
                                colorScale[categoryColorMap[chartIndex].colorIndex] :
                                getColorFromSchema(colorScale, categoryColorMap[chartIndex].colorIndex);

                            // categoryColorMap[chartIndex].colorIndex+=1;

                            if (categoryColorMap[chartIndex].colorIndex > maxColorIndex) {
                                categoryColorMap[chartIndex].colorIndex = 0;
                            }

                            categoryColorMap[chartIndex].colorIndex = categoryColorMap[chartIndex].colorIndex + 1;


                        }
                    });
                } else {
                    //ToDo: plot two variables in the same dataset
                    yIndex=metadata.names.indexOf(chart.y);
                    multiDimensional=true;
                    data.map((datum, datIndex) => {
                        if (!dataSets.hasOwnProperty(metadata.names[yIndex])) {
                            dataSets[metadata.names[yIndex]] = [];
                        }
                        stacked=chart.mode==='stacked';
                        //if the bar chart's orientation is horizontal the xy axis should be switched
                        if (chart.type === 'bar' && chart.orientation === 'left') {
                            dataSets[metadata.names[yIndex]].push({x: datum[yIndex], y: datum[xIndex]});
                            orientation='left';
                        } else {
                            dataSets[metadata.names[yIndex]].push({x: datum[xIndex], y: datum[yIndex],x0:datum[x0index],y0:0});
                        }

                        if (dataSets[metadata.names[yIndex]].length > config.maxLength) {
                            dataSets[metadata.names[yIndex]].shift();
                        }


                        if (!categoryColorMap[chartIndex].categories.hasOwnProperty(metadata.names[yIndex])) {
                            categoryColorMap[chartIndex].categories[metadata.names[yIndex]] = chart.fill || getColorFromSchema(colorScale, categoryColorMap[chartIndex].colorIndex);

                            // categoryColorMap[chartIndex].colorIndex+=1;

                            if (categoryColorMap[chartIndex].colorIndex > maxColorIndex) {
                                categoryColorMap[chartIndex].colorIndex = 0;
                            }

                            categoryColorMap[chartIndex].colorIndex = categoryColorMap[chartIndex].colorIndex + 1;


                        }

                    });
                }




            });
            initialized = true;


        } else {
            //ToDo:PieCharts and scatterplots
        }


        this.setState({
            dataSets: dataSets,
            categoryColorMap: categoryColorMap,
            initialized: initialized,
            orientation:orientation,
            stacked:stacked,
            multiDimensional:multiDimensional
        });

    }

    componentWillUnmount() {
        // this.setState({});
    }

    /**
     * Event handler for onNearestX
     *
     * @param value Selected Value
     * @param info
     *
     * @private
     */
    _onNearestX(value,info){
        console.info(value,info);
    }

    /**
     * Event handler for on Mouse Leave
     *
     * @private
     */
    _onMouseLeave(){

    }

    render() {
        let {metadata, config} = this.props;
        let {categoryColorMap, dataSets,orientation,stacked,animation} = this.state;
        let chartComponents = [];
        let legendItems=[];
        // console.info(dataSets);
        categoryColorMap.map((chart, chartIndex) => {
            switch (chart.type) {
                case 'line':
                    Object.keys(chart.categories).forEach((name) => {
                        legendItems.push({title:name,color:chart.categories[name]});
                        chartComponents.push(
                            <LineMarkSeries
                                nullAccessor={(d) => d.y !== null}
                                data={dataSets[name]}
                                color={chart.categories[name]}
                                opacity={0.7}
                                curve={chart.mode}
                                onNearestX={this._onNearestX}
                            />
                        );
                    });
                    break;
                case 'bar':
                    if (chart.orientation === 'vertical') {
                        Object.keys(chart.categories).forEach((name) => {
                            legendItems.push({title:name,color:chart.categories[name]});
                            chartComponents.push(
                                <VerticalBarSeries
                                    data={dataSets[name].filter((d) => d.y !== null)}
                                    color={chart.categories[name]} opacity={0.7}
                                    onNearestX={this._onNearestX}
                                />
                            );
                        });
                    } else if (chart.orientation === 'left') {
                        Object.keys(chart.categories).forEach((name) => {
                            legendItems.push({title:name,color:chart.categories[name]});
                            chartComponents.push(
                                <HorizontalBarSeries
                                    data={dataSets[name].filter((d) => d.y !== null)}
                                    color={chart.categories[name]} opacity={0.7}
                                    onNearestX={this._onNearestX}
                                />
                            );
                        });
                    }
                    break;

                case 'area':
                    Object.keys(chart.categories).forEach((name) => {
                        legendItems.push({title:name,color:chart.categories[name]});
                        chartComponents.push(
                            <AreaSeries
                                nullAccessor={(d) => d.y !== null}
                                data={dataSets[name]}
                                color={chart.categories[name]}
                                opacity={0.7}
                                curve={chart.mode}
                                onNearestX={this._onNearestX}
                            />
                        );
                    });
                    break;
            }
        });


        return (
            <div>
                <div style={{float:'left',width:'80%',display:'inline'}}>
                    <FlexibleWidthXYPlot
                        height={this.state.height}

                        animation={animation}
                        xType={metadata.types[metadata.names.indexOf(config.x)]}
                        stackBy={stacked? 'y':null}

                    >

                        <HorizontalGridLines/>
                        <VerticalGridLines/>

                        {chartComponents}
                        <XAxis title={orientation==='left'?config.charts[0].y:config.x}/>
                        <YAxis title={orientation==='left'?config.x:config.charts[0].y}/>
                    </FlexibleWidthXYPlot>
                </div>

                <div style={{float:'right',width:'20%',display:'inline'}}>
                    <SearchableDiscreteColorLegend
                        width={100}
                        height={this.state.height}
                        items={legendItems}
                    />
                </div>
            </div>
        );
    }


}


export function getColorFromSchema(schema, index) {
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

ChartWrapper.propTypes = {
    config: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};


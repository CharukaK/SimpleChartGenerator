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
    Crosshair,
    DiscreteColorLegend
} from 'react-vis';
import AreaMarkSeries from './AreaMarkSeries';


import * as d3 from 'd3';
import '../../node_modules/react-vis/dist/style.css';
import PropTypes from 'prop-types';


export default class VizG extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            dataSets: {},
            width: props.config.width - 100,
            height: props.config.height,
            chartArray: [],
            initialized: false,
            orientation: 'bottom',
            stacked: false,
            animation: props.config.animation || false,
            multiDimensional: false,
            crosshairValues: [],
            hintValue: null
        };

        this._sortAndPopulateDataSet = this._sortAndPopulateDataSet.bind(this);
        this._onValueMouseOver=this._onValueMouseOver.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this._sortAndPopulateDataSet(nextProps);
    }

    componentDidMount() {
        this._sortAndPopulateDataSet(this.props);
    }

    componentWillUnmount() {
        this.setState({});
    }

    /**
     * function for on Value mouse over of the charting library
     * @param value Value associated with the mark
     * @param info
     * @private
     */
    _onValueMouseOver(value,info){

    }


    /**
     * will sort and populate the dataSet that's defined in the state according to the given config
     * @param props Props that received
     * @private
     */
    _sortAndPopulateDataSet(props) {
        let {metadata, config, data} = props;
        let {dataSets, chartArray, initialized, orientation, stacked, multiDimensional} = this.state;

        //if x is defined it could be either a Line,Bar, Area or Geographical chart
        if (config.x) {

            let xIndex = metadata.names.indexOf(config.x);


            config.charts.map((chart, chartIndex) => {
                let colorScale = chart.colorScale || 'category10';
                let yIndex = metadata.names.indexOf(chart.y);
                let x0index = metadata.names.indexOf(chart.x0);
                let categoricalIndex = metadata.names.indexOf(chart.color) || -1;
                let dataSetName = '';
                let maxColorIndex=Array.isArray(colorScale)?
                    colorScale.length:parseInt(colorScale.substring(8, 10));
                if (!initialized) {
                    chartArray.push({
                        type: chart.type,
                        categories: {},
                        mode: chart.mode || null,
                        colorIndex: 0,
                        orientation: chart.orientation || 'bottom'

                    });
                }


                data.map((datum, datIndex) => {

                    if (categoricalIndex > -1) {
                        dataSetName = datum[categoricalIndex];
                    } else {
                        dataSetName = metadata.names[yIndex];
                        multiDimensional = true;
                    }

                    if (!dataSets.hasOwnProperty(dataSetName)) {
                        dataSets[dataSetName] = [];
                    }

                    // console.info(config.maxLength);
                    if (dataSets[dataSetName].length > config.maxLength) {
                        dataSets[dataSetName].shift();
                    }

                    if (chart.type === 'bar' && chart.orientation === 'left') {
                        dataSets[dataSetName].push({x: datum[yIndex], y: datum[xIndex], y0: datum[x0index]});
                        orientation = 'left';
                    } else {
                        dataSets[dataSetName].push({x: datum[xIndex], y: datum[yIndex], x0: datum[x0index]});
                    }


                    if (!chartArray[chartIndex].categories.hasOwnProperty(dataSetName)) {
                        if (!chart.fill) {
                            if (chart.colorDomain) {
                                let colorId = chart.colorDomain.indexOf(datum[categoricalIndex]);

                                if (colorId > -1) {
                                    chartArray[chartIndex].categories[dataSetName] = Array.isArray(colorScale) ?
                                        colorScale[colorId]:VizG._getColorFromSchema(colorScale,colorId);
                                }
                            }

                            if(!chartArray[chartIndex].categories[dataSetName]){
                                chartArray[chartIndex].categories[dataSetName] = Array.isArray(colorScale) ?
                                    colorScale[chartArray[chartIndex].colorIndex]:
                                    VizG._getColorFromSchema(colorScale, chartArray[chartIndex].colorIndex++);
                            }


                            if(chartArray[chartIndex].colorIndex>maxColorIndex){
                                chartArray[chartIndex].colorIndex=0;
                            }

                        } else {
                            chartArray[chartIndex].categories[dataSetName] = chart.fill;
                        }
                    }


                });


            });

        } else {
            //ToDo: scatter plots and pie charts
        }

        initialized = true;


        this.setState({
            dataSets: dataSets,
            chartArray: chartArray,
            initialized: initialized,
            orientation: orientation,
            stacked: stacked,
            multiDimensional: multiDimensional
        });


    }


    /**
     * will return a string color based on the scema and index provided
     * @param schema Name of the d3 ordinal color scale schema (default: category10)
     * @param index Index of the color in the array
     * @private
     */
    static _getColorFromSchema(schema, index) {
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

    render() {
        let {metadata, config} = this.props;
        let {chartArray, dataSets, orientation, stacked, animation} = this.state;
        let chartComponents = [];
        let legendItems = [];

        chartArray.map((chart, chartIndex) => {
            switch (chart.type) {
                case 'line':
                    Object.keys(chart.categories).forEach((name) => {
                        legendItems.push({title: name, color: chart.categories[name]});
                        chartComponents.push(
                            <LineMarkSeries
                                key={`line-${chartIndex}-${chart.categories[name]}`}
                                nullAccessor={(d) => d.y !== null}
                                data={dataSets[name]}
                                color={chart.categories[name]}
                                opacity={0.7}
                                curve={chart.mode}
                            />
                        );
                       });
                    break;
                case 'bar':
                    if (chart.orientation === 'left') {
                        Object.keys(chart.categories).forEach((name) => {
                            legendItems.push({title: name, color: chart.categories[name]});
                            chartComponents.push(
                                <HorizontalBarSeries
                                    key={`bar-${chartIndex}-${chart.categories[name]}`}

                                    data={dataSets[name].filter((d) => d.y !== null)}
                                    color={chart.categories[name]}
                                    opacity={0.7}
                                    curve={chart.mode}
                                />
                            );
                        });
                    } else {
                        Object.keys(chart.categories).forEach((name) => {
                            legendItems.push({title: name, color: chart.categories[name]});
                            chartComponents.push(
                                <VerticalBarSeries
                                    key={`bar-${chartIndex}-${chart.categories[name]}`}

                                    data={dataSets[name].filter((d) => d.y !== null)}
                                    color={chart.categories[name]}
                                    opacity={0.7}
                                    curve={chart.mode}
                                />
                            );
                        });
                    }
                    break;
                case 'area':
                    Object.keys(chart.categories).forEach((name) => {
                        // console.info(name);
                        legendItems.push({title: name, color: chart.categories[name]});
                        chartComponents.push(
                            <AreaMarkSeries
                                key={`area-${chartIndex}-${chart.categories[name]}`}
                                nullAccessor={(d) => d.y !== null}
                                data={dataSets[name]}
                                color={chart.categories[name]}
                                opacity={0.7}
                                curve={chart.mode}
                            />
                        );
                    });
                    break;


            }
        });

        return (
            <div>
                <div style={{float: 'left', width: '80%', display: 'inline'}}>
                    <FlexibleWidthXYPlot
                        height={this.state.height}
                        animation={animation}
                        xType={metadata.types[metadata.names.indexOf(config.x)]}
                        stackBy={stacked ? 'y' : null}

                    >

                        <HorizontalGridLines/>
                        <VerticalGridLines/>

                        {chartComponents}
                        <XAxis title={orientation === 'left' ? config.charts[0].y : config.x}/>
                        <YAxis title={orientation === 'left' ? config.x : config.charts[0].y}/>
                        <Crosshair values={this.state.crosshairValues}/>

                        {
                            this.state.hintValue ?
                                <Hint value={this.state.hintValue}/> :
                                null
                        }
                    </FlexibleWidthXYPlot>
                </div>
                <div style={{float: 'right', width: '20%', display: 'inline'}}>
                    <DiscreteColorLegend
                        width={100}
                        height={this.state.height}
                        items={legendItems}
                    />
                </div>

            </div>
        );
    }
}

VizG.propTypes = {
    config: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};
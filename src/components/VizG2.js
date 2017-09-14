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


class VizG extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: props.config.height,
            dataSets: {},
            chartArray: [],
            initialized: false,
            orientation: 'bottom',
            stacked: false,
            animation: props.config.animation || false,
            multiDimensional: false,
            crosshairValues: [],
            hintValue: null
        };


        this._populateDataSet = this._populateDataSet.bind(this);
    }





    /**
     * will sort and populate the dataSet that's defined in the state according to the given config
     * @private
     * @param currentProps
     */
    _populateDataSet(currentProps) {
        let {metadata, data, config} = currentProps;
        let {dataSets, chartArray, initialized, orientation, stacked, multiDimensional} = this.state;

        //check what kind of chart
        if (config.x) {//if it's line,area,bar or map
            config.charts.map((chart, chartIndex) => {

                if(!initialized){
                    chartArray.push({
                       type:chart.type,
                       categories:{},
                    });
                }

                if (config.color) {//if the color is defined it's a categorical chart

                } else {
                    //ToDo: multidimentional Charts
                }
            });
        }
    }





    render() {
        return (
            <div>

            </div>
        );
    }

}

VizG.propTypes({
    config: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
});

export default VizG;
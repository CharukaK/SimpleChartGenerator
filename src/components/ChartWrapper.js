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
    HorizontalBarSeries,
    VerticalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalRectSeries,
    VerticalRectSeries,
    ArcSeries,
    LineMarkSeries,
    MarkSeries
} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';


export default class ChartWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            data:{},
            width:props.width,
            height:props.height,
            categoryColorMap:new Map()
        };
    }

    /**
     * Will run every time a component receives new props or change of props and this will sort out the data
     * into categories if it is specified in the config
     * @param nextProps - next set of props received by the Component
     */
    componentWillReceiveProps(nextProps){
        let {metadata,config,data}=nextProps;
        //if config has x attribute then it's either Line Chart, Bar Chart, Area Chart or a map
        if(config.x){

        }else{

        }

    }

    componentWillUnmount(){
        this.setState({});
    }


    render(){
        let {metadata,config}=this.props;
        return(
            <div>

            </div>
        );
    }


    colorPallete=['#12939A','#79C7E3','#1A3177','#FF9833','#EF5D28','#a789ff','#776E57']
}


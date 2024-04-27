import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const IncomeChart = ({ SpendGraphData }) => {

    const options = {
        animationEnabled: true,
        title: {
            text: "Income Chart"
        },
        axisY: {
            prefix: "₹ "
        },
        data: [{
            type: "spline",
            dataPoints: SpendGraphData
        }]
    }

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    )
}
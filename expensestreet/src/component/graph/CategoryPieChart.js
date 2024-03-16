import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CategoryPieChart = ({ CategoryData }) => {

    const options = {
        animationEnabled: true,
        showInLegend: true,
        title: {
            text: "Payment Mode Pie Chart"
        },
        data: [{
            type: "pie",
            showInLegend: "true",
            legendText: "{label}",
            indexLabel: "{label} - {y}%",
            toolTipContent: "<b>{label}</b>: {y}%<br>{amount} ₹",
            dataPoints: CategoryData,
        }]
    }

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    )
}

export default CategoryPieChart
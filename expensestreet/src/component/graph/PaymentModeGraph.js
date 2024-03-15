import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PaymentModeGraph = ({ PaymentModeData }) => {

    const options = {
        animationEnabled: true,
		showInLegend: true,
        title: {
            text: "Income Chart"
        },
        axisY: {
            prefix: "₹ "
        },
        data: [{
            type: "pie",
            dataPoints: PaymentModeData
            // dataPoints: [
            //     { y: 26, name: "School Aid", exploded: true },
            //     { y: 20, name: "Medical Aid" },
            //     { y: 5, name: "Debt/Capital" },
            //     { y: 3, name: "Elected Officials" },
            //     { y: 7, name: "University" },
            //     { y: 17, name: "Executive" },
            //     { y: 22, name: "Other Local Assistance" }
            // ]
        }]
    }

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    )
}

export default PaymentModeGraph
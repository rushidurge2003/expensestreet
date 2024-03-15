import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData,type }) {
  return (
    <div className="chart-container" style={{width:"800px"}}>
      <h2 style={{ textAlign: "center" }}>Total {type}</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Total ${type}`
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;
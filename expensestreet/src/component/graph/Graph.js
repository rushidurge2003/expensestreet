import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);


const Graph = () => {

  const state = useSelector((state) => state.RecordSliceReducer.expenseData)

  console.log("Main graph data : ", state)

  const gdata = [...new Set(state?.map((i) => i.date))]
  gdata.sort()

  console.log("Gdata : ", gdata)

  const SpendGraphData = []
  // const IncomeGraphData = []

  for (let i = 0; i < gdata.length; i++) {
    let amtTemp = 0
    for (let j = 0; j < state.length; j++) {
      // if ((gdata[i] === state[j].date) && state[j].exptype === "Spend") {
      //   amtTemp += state[j].expamt
      // }
      if ((gdata[i] === state[j].date)) {
        // amtTemp += state[j].amount
        amtTemp += Number(state[j].amount)
      }
    }
    SpendGraphData.push({ date: gdata[i], amount: amtTemp })
  }

  // for (let i = 0; i < gdata.length; i++) {
  //   let amtTemp = 0
  //   for (let j = 0; j < state.length; j++) {
  //     if ((gdata[i] === state[j].expdate) && state[j].exptype === "Income") {
  //       amtTemp += state[j].expamt
  //     }
  //   }
  //   if (amtTemp > 0) {
  //     IncomeGraphData.push({ date: gdata[i], amt: amtTemp })
  //   }
  // }

  const [spendChartData, setSpendChartData] = useState({
    labels: SpendGraphData.map((data) => data.date),
    datasets: [
      {
        label: "Total Spend ",
        data: SpendGraphData.map((data) => data.amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  // const [incomeChartData, setIncomeChartData] = useState({
  //   labels: IncomeGraphData.map((data) => data.date),
  //   datasets: [
  //     {
  //       label: "Total Income ",
  //       data: IncomeGraphData.map((data) => data.amt),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "&quot;#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0"
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2
  //     }
  //   ]
  // });

  return (
    <>
      <div className="d-flex justify-content-between px-3 py-3">
        <LineChart chartData={spendChartData} type={"Spend"} />
        {/* <LineChart chartData={incomeChartData} type={"Income"} /> */}
      </div>
    </>
  );
}

export default Graph

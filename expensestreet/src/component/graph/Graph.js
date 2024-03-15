import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);


const Graph = () => {

  const state1 = useSelector((state) => state.RecordSliceReducer.expenseData)
  const state2 = useSelector((state) => state.RecordSliceReducer.incomeData)

  const edata = [...new Set(state1?.map((i) => (i.date).slice(0, 10)))]
  edata.sort()

  const idata = [...new Set(state2?.map((i) => (i.date).slice(0, 10)))]
  idata.sort()

  const SpendGraphData = []
  const IncomeGraphData = []

  for (let i = 0; i < edata.length; i++) {
    let amtTemp = 0
    for (let j = 0; j < state1.length; j++) {
      if ((edata[i] === (state1[j].date).slice(0, 10))) {
        amtTemp += Number(state1[j].amount)
      }
    }
    SpendGraphData.push({ date: edata[i], amount: amtTemp })
  }

  for (let i = 0; i < idata.length; i++) {
    let amtTemp = 0
    for (let j = 0; j < state2.length; j++) {
      if ((idata[i] === (state2[j].date).slice(0, 10))) {
        amtTemp += Number(state2[j].amount)
      }
    }
    IncomeGraphData.push({ date: idata[i], amount: amtTemp })
  }

  // for (let i = 0; i < edata.length; i++) {
  //   let amtTemp = 0
  //   for (let j = 0; j < state2.length; j++) {
  //     if ((edata[i] === state2[j].expdate) && state[j].exptype === "Income") {
  //       amtTemp += state2[j].expamt
  //     }
  //   }
  //   if (amtTemp > 0) {
  //     IncomeGraphData.push({ date: edata[i], amt: amtTemp })
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

  const [incomeChartData, setIncomeChartData] = useState({
    labels: IncomeGraphData.map((data) => data.date),
    datasets: [
      {
        label: "Total Income ",
        data: IncomeGraphData.map((data) => data.amount),
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

  return (
    <>
      <div className="d-flex justify-content-between px-3 py-3">
        <LineChart chartData={spendChartData} type={"Spend"} />
        <LineChart chartData={incomeChartData} type={"Income"} />
      </div>
      {/* <div>
        <LineChart chartData={spendChartData} type={"Spend"} />
        <LineChart chartData={incomeChartData} type={"Income"} />
      </div> */}
    </>
  );
}

export default Graph

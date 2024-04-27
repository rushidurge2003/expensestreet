import Chart from "chart.js/auto";
import { CategoryScale, elements } from "chart.js"
import { ExpenseChart } from "./ExpenseChart";
import { IncomeChart } from "./IncomeChart";
import PaymentModeGraph from "./PaymentModeGraph"
import CategoryPieChart from "./CategoryPieChart";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Select } from "antd";

import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

Chart.register(CategoryScale);


const Graph = () => {

  const [contentNum, setContentNum] = useState("Expense Chart")
  const [totalExpAmt, setTotalExpAmt] = useState(0)

  useEffect(() => {
    state1.forEach(element => {
      setTotalExpAmt((totalExpAmt) => totalExpAmt + Number(element.amount))
    });
  }, [])

  const state1 = useSelector((state) => state.RecordSliceReducer.expenseData)
  const state2 = useSelector((state) => state.RecordSliceReducer.incomeData)

  const edata = [...new Set(state1?.map((i) => (i.date).slice(0, 10)))]
  edata.sort()

  const idata = [...new Set(state2?.map((i) => (i.date).slice(0, 10)))]
  idata.sort()

  const SpendGraphData = []
  const IncomeGraphData = []
  const PaymentModeData = {
    Cash: {
      y: 0,
      label: "Cash",
      amount: 0,
    },
    Online: {
      y: 0,
      label: "Online",
      amount: 0,
    },
    Card: {
      y: 0,
      label: "Card",
      amount: 0,
    }
  }

  const CategoryDataObj = {
    Utilities: {
      y: 0,
      label: "Utilities",
      amount: 0,
    },
    Food: {
      y: 0,
      label: "Food",
      amount: 0,
    },
    Entertainment: {
      y: 0,
      label: "Entertainment",
      amount: 0,
    },
    Tax: {
      y: 0,
      label: "Tax",
      amount: 0,
    }
  }

  for (let i = 0; i < edata.length; i++) {
    let amtTemp = 0
    for (let j = 0; j < state1.length; j++) {
      if ((edata[i] === (state1[j].date).slice(0, 10))) {
        amtTemp += Number(state1[j].amount)
      }
    }
    SpendGraphData.push({ y: amtTemp, label: "" + edata[i] })
  }

  for (let i = 0; i < idata.length; i++) {
    let amtTemp = 0
    for (let j = 0; j < state2.length; j++) {
      if ((idata[i] === (state2[j].date).slice(0, 10))) {
        amtTemp += Number(state2[j].amount)
      }
    }
    IncomeGraphData.push({ y: amtTemp, label: "" + idata[i] })
  }

  for (let i = 0; i < state1.length; i++) {
    if (state1[i].payment_mode === "Cash") {
      PaymentModeData.Cash.amount += Number(state1[i].amount)
      PaymentModeData.Cash.y = Math.round(((PaymentModeData.Cash.amount / totalExpAmt) * 100))
    }
    if (state1[i].payment_mode === "Online") {
      PaymentModeData.Online.amount += Number(state1[i].amount)
      PaymentModeData.Online.y = Math.round(((PaymentModeData.Online.amount / totalExpAmt) * 100))
    }
    if (state1[i].payment_mode === "Card") {
      PaymentModeData.Card.amount += Number(state1[i].amount)
      PaymentModeData.Card.y = Math.round(((PaymentModeData.Card.amount / totalExpAmt) * 100))
    }
  }
  const PaymentModeGraphData = Object.values(PaymentModeData)

  for (let i = 0; i < state1.length; i++) {
    if (state1[i].category === "Utilities") {
      CategoryDataObj.Utilities.amount += Number(state1[i].amount)
      CategoryDataObj.Utilities.y = Math.round(((CategoryDataObj.Utilities.amount / totalExpAmt) * 100))
    }
    if (state1[i].category === "Food") {
      CategoryDataObj.Food.amount += Number(state1[i].amount)
      CategoryDataObj.Food.y = Math.round(((CategoryDataObj.Food.amount / totalExpAmt) * 100))
    }
    if (state1[i].category === "Entertainment") {
      CategoryDataObj.Entertainment.amount += Number(state1[i].amount)
      CategoryDataObj.Entertainment.y = Math.round(((CategoryDataObj.Entertainment.amount / totalExpAmt) * 100))
    }
    if (state1[i].category === "Tax") {
      CategoryDataObj.Tax.amount += Number(state1[i].amount)
      CategoryDataObj.Tax.y = Math.round(((CategoryDataObj.Tax.amount / totalExpAmt) * 100))
    }
  }

  const CategoryData = Object.values(CategoryDataObj)



  const DisplayGraph = ({ contentNum }) => {
    if (contentNum === "Expense Chart") {
      return (
        <ExpenseChart SpendGraphData={SpendGraphData} />
      )
    }
    if (contentNum === "Income Chart") {
      return (
        <IncomeChart SpendGraphData={IncomeGraphData} />
      )
    }
    if (contentNum === "Payment Mode") {
      return (
        <PaymentModeGraph PaymentModeData={PaymentModeGraphData} />
      )
    }
    if (contentNum === "Category") {
      return (
        <CategoryPieChart CategoryData={CategoryData} />
      )
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <Select value={contentNum} onChange={(_, opt) => setContentNum(opt.value)} style={{ width: 180 }}>
          <Select.Option value="Expense Chart">Expense Chart</Select.Option>
          <Select.Option value="Income Chart">Income Chart</Select.Option>
          <Select.Option value="Payment Mode">Payment Mode</Select.Option>
          <Select.Option value="Category">Category</Select.Option>
        </Select>
      </div>
      <DisplayGraph contentNum={contentNum} />
    </>
  );
}

export default Graph

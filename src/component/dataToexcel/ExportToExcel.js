import React, { useState } from "react";
import axios from "axios";
import ReactExcelExport from "react-export-excel";

const ExportToExcel = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllExpense/rushidurge`);
    setData(response.data);
  };

  const exportToExcel = () => {
    const excelExport = new ReactExcelExport({
      filename: "data.xlsx",
      sheetName: "Data",
      data,
    });

    excelExport.export();
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExportToExcel;
import React, { useState } from "react";

import Chart from "react-apexcharts";

import "./BarChart.css";

const BarChart = () => {
  const [chartState, setChartState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },

      plotOptions: {
        bar: {
          s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
          e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
          borderRadius: 0,
          columnWidth: "30%",
          barHeight: "70%",
          distributed: false,
          rangeBarOverlap: true,
          rangeBarGroupRows: false,
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "white",
              },
            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
          dataLabels: {
            position: "top",
            maxItems: 100,
            hideOverflowingLabels: true,
            orientation: "horizontal",
          },
        },
      },
    },

    series: [
      {
        name: "series-1",
        data: [90, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <div className="bar_chart background-blue">

      <Chart
      className="chart_block"
        options={chartState.options}
        series={chartState.series}
        type="bar"
        width="500"
      />

      <div className="chart_desc">

        <h6 className="chart_label text-muted mt-2 mb-4">Students Today's Attendance</h6>

        <div className="chart_values">
          <div className="chart_val border_rig">
            <h6 className="text-muted mb-2">Total present student</h6>
            <h3>151</h3>
          </div>
          <div className="chart_val">
            <h6 className="text-muted mb-2">Total absent student</h6>
            <h3>151</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BarChart;

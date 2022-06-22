import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { loadSchoolAttendance } from "../../App/Redux/Action/attendanceAction";
import moment from "moment";

import "./BarChart.css";

const BarChart = () => {
  const { all: attendance } = useSelector((state) => state.attendance);

  const [presnetStd, setPresnetStd] = useState([]);
  const [absentStd, setAbsentStd] = useState([]);

  const [weeklyPresent, setweeklyPresent] = useState([]);
  const [weeklyAbsent, setweeklyAbsent] = useState([]);

  const [chartState, setChartState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },

      xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"],
        labels: {
          show: true,
          style: {
            colors: "#FFFFFF",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 500,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },

      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            colors: "#FFFFFF",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },

      legend: {
        show: true,
        fontSize: "15px",
        fontWeight: 500,
        labels: {
          colors: "#FFFFFF",
        },
      },

      plotOptions: {
        bar: {
          columnWidth: "30%",
          endingShape: "rounded",
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },

      fill: {
        opacity: 1,
      },

      colors: ["#FEB019", "#00E396"],
    },

    series: [
      {
        name: "Present Student",
        data: weeklyPresent,
      },
      {
        name: "Absent Student",
        data: weeklyAbsent,
      },
    ],
  });

  useEffect(() => {
    let presentArr = [];
    let absentArr = [];

    let weeklyPres = [];
    let weeklyAbs = [];

    const today = moment(new Date()).format("DD-MM-YYYY");

    if (moment().day() === 6) {
      const thisWeek = moment().startOf("isoWeek");
      setWeeklyAtt(thisWeek);
      console.log("this");
    } else {
      let prevWeek = moment().subtract(1, "weeks");
      prevWeek.startOf("isoWeek");
      console.log("prev");
      console.log(prevWeek);

      setWeeklyAtt(prevWeek);
    }

    function setWeeklyAtt(week) {
      for (let i = 0; i < 5; i++) {
        let presCont = 0;
        let absCont = 0;

        attendance?.forEach((stdRec) => {
          stdRec?.school_attendence?.forEach((attend) => {
            let stdDate = moment(stdRec?.date).format("DD/MM/YYYY");

            if (week.format("DD/MM/YYYY") === stdDate) {
              switch (attend?.att_remarks) {
                case "Present":
                  presCont++;
                  break;
                case "Absent":
                  absCont++;
                  break;
                default:
                  break;
              }
            }
          });
        });

        weeklyPres[i] = presCont;
        weeklyAbs[i] = absCont;

        week.add(1, "days").format("DD/MM/YYYY");

      }

      setweeklyPresent(weeklyPres);
      setweeklyAbsent(weeklyAbs);
    }

    attendance?.forEach((stdRec) => {
      stdRec?.school_attendence?.forEach((attend) => {
        let stdDate = moment(stdRec?.date).format("DD-MM-YYYY");
        if (today === stdDate) {
          switch (attend?.att_remarks) {
            case "Present":
              presentArr.push({
                attendence_id: attend?.attendence_id,
                date: stdRec?.date,
                remarks: attend?.att_remarks,
                student: attend?.school_student,
              });
              break;
            case "Absent":
              absentArr.push({
                attendence_id: attend?.attendence_id,
                date: stdRec?.date,
                remarks: attend?.att_remarks,
                student: attend?.school_student,
              });
              break;
            default:
              break;
          }
        }
      });
    });

    setPresnetStd(presentArr);
    setAbsentStd(absentArr);
  }, []);

  useEffect(() => {
    setChartState({
      ...chartState,
      series: [
        {
          name: "Present Student",
          data: weeklyPresent,
        },
        {
          name: "Absent Student",
          data: weeklyAbsent,
        },
      ],
    });
  }, [weeklyPresent, weeklyAbsent]);

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
        <h6 className="chart_label text-muted mt-2 mb-4">
          Students Today's Attendance
        </h6>

        <div className="chart_values">
          <div className="chart_val border_rig">
            <h6 className="text-muted mb-2">Total present student</h6>
            <h3>{presnetStd.length}</h3>
          </div>
          <div className="chart_val">
            <h6 className="text-muted mb-2">Total absent student</h6>
            <h3>{absentStd.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;

import { GanttChart } from "./components/ganttChart/ganttChart.js";
document.addEventListener("DOMContentLoaded", () => {
  const names = [
    { id: 1, name: "Name 1"},
    { id: 2, name: "Name 2"},
    { id: 3, name: "Name 3"},
    { id: 4, name: "Name 4"},
    { id: 5, name: "Name 5"},
    { id: 6, name: "Name 6"}
  ];

  const shiftDurations = [
    {
      id: "1",
      start: new Date("2024/11/28"),
      end: new Date("2022/11/29"),
    }
  ];

  const ganttCharts = document.querySelectorAll("[role=gantt-chart]");
  ganttCharts.forEach(ganttChart => {
    new GanttChart(ganttChart, names, shiftDurations);
  });
});
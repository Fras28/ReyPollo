

import React from "react";
import Chart from "react-apexcharts";
import "./DashBoard.css";
import ReactApexChart from "react-apexcharts";


// Modifica el componente Dashboard para incluir ApexChart
const Dashboard = () => {
  // Datos de ejemplo para las gráficas
  const seriesData = [
    {
      name: "Ventas",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
    {
      name: "Gastos",
      data: [20, 35, 40, 45, 50, 55, 60, 65, 70],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2022-01-01",
        "2022-01-02",
        "2022-01-03",
        "2022-01-04",
        "2022-01-05",
        "2022-01-06",
        "2022-01-07",
        "2022-01-08",
        "2022-01-09",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    colors: ["#008FFB", "#00E396"],
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  return (
    <div className="containerDash">
      <div className="row">
        <div className="contCharts">
          <div className="card-body">
        <h5 className="card-title">Ventas</h5>
            <Chart options={options} series={seriesData} type="area" height={350} width={350} />
          </div>
          <div className="card-body">
          <h5 className="card-title">Gastos</h5>
            <Chart options={options} series={seriesData} type="area" height={350} width={350} />
          </div>
          <div className="card-body">
          <h5 className="card-title">Ganancias </h5>
            <Chart options={options} series={seriesData} type="area" height={350} width={350} />
          </div>
    
        </div>
        <div className="contCharts">
          <div className="card-body">
            <Chart options={options} series={seriesData} type="bar" height={350} width={350} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;





// // import React from "react";
// import Chart from "react-apexcharts";
// import "./DashBoard.css";

// const Dashboard = () => {
//   // Datos de ejemplo para las gráficas
//   const seriesData = [
//     {
//       name: "Ventas",
//       data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
//     },
//     {
//       name: "Gastos",
//       data: [20, 35, 40, 45, 50, 55, 60, 65, 70],
//     },
//   ];

//   const options = {
//     chart: {
//       type: "area",
//       height: 350,
//       stacked: false,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "smooth",
//     },
//     xaxis: {
//       type: "datetime",
//       categories: [
//         "2022-01-01",
//         "2022-01-02",
//         "2022-01-03",
//         "2022-01-04",
//         "2022-01-05",
//         "2022-01-06",
//         "2022-01-07",
//         "2022-01-08",
//         "2022-01-09",
//       ],
//     },
//     tooltip: {
//       x: {
//         format: "dd/MM/yy",
//       },
//     },
//     colors: ["#008FFB", "#00E396"],
//     legend: {
//       position: "top",
//       horizontalAlign: "left",
//     },
//   };

//   const optionsPie = {
//     series: [30, 40, 45, 50, 49], // Estos son los datos para el gráfico de tipo "pie"
//     chart: {
//       width: 380,
//       type: "pie",
//     },
//     labels: ["2022-01-01", "2022-01-02", "2022-01-03", "2022-01-04", "2022-01-05"], // Etiquetas para las categorías
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//   };





  
//   return (
//     <div className="containerDash">
//       <div className="row">
//         <h5 className="card-title">Ventas y Gastos</h5>
//         <div className="conrCharts">
//           <div className="card-body">
//             <Chart options={options} series={seriesData} type="area" height={350} width={350} />
//           </div>
//           <div className="card-body">
//             <Chart options={options} series={seriesData} type="bar" height={350} width={350} />
//           </div>
//           <div className="card-body">
//             <Chart options={optionsPie} type="pie" height={350} width={350} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

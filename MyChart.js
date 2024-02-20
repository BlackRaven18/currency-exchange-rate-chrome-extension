export function createChart(xValues, yValues, min, max) {
    return new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          y: {
            min: min,
            max: max
          }
        }
        // scales: {
        //   yAxes: [{ticks: {min: 6, max:16}}],
        // }
      }
    });
}


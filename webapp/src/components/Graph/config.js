const humidityGraphOptions = {
    label: 'Humidity',
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 4,
    pointRadius: 1,
    pointHitRadius: 10
}

const temperatureGraphOptions = {
    label: 'Temperature',
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(230,140,140,0.4)',
    borderColor: 'rgba(230,140,140,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(230,140,140,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(230,140,140,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 4,
    pointRadius: 1,
    pointHitRadius: 10,
}

const graphOptions = {
    responsive: true,
    width: '80%',
    height: '80%',
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 20,
        bottom: 50
      }
    },
    scales: {
      yAxes: [
        {
          beginAtZero: true,
          suggestedMin: 0,
          ticks: {
            min: 0,
            max: 100
          }
        }
      ]
    }
  }

export {
    temperatureGraphOptions,
    humidityGraphOptions,
    graphOptions
}
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { measuresEndpoint } from '../../config';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [],
      options: {
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
    };
  }

  _fetch_data() {
    fetch(measuresEndpoint)
    .then((request) => {
      return request.json()
    })
    .then((result) => {
      let labels = result.map((r) => moment(r.date).format('DD-MM HH:mm'));
      let temperatureData = result.map((r) => r.temperature);
      let humidityData = result.map((r) => r.humidity);
      let datasets = [
        {
          label: 'Temperature',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(230,140,140,1)',
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
          data: temperatureData
        },
        {
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
          pointHitRadius: 10,
          data: humidityData
        }
      ]
      this.setState({
        labels,
        datasets
      })
    })
  }

  componentWillMount() {
    this._fetch_data()
  }

  render() {
    return (
      <div>
        <Line
          data={this.state}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default Graph;

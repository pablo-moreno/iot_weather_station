import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { measuresEndpoint } from '../../config';
import { 
  humidityGraphOptions, 
  temperatureGraphOptions, 
  graphOptions
} from './config';
import { onPostMeasure, emit } from '../../socketio';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [],
      options: graphOptions
    };
    onPostMeasure(null, (data) => {
      console.log('receiving', data);
      this._updateState(data)
    });
  }

  _fetch_data() {
    fetch(measuresEndpoint)
    .then((request) => {
      return request.json()
    })
    .then((result) => {
      let labels = result.map((r) => {
        return moment(r.date).format('DD-MM HH:mm');
      });
      let temperatureData = result.map((r) => r.temperature);
      let humidityData = result.map((r) => r.humidity);
      let datasets = [
        {
          ...temperatureGraphOptions,
          data: temperatureData
        },
        {
          ...humidityGraphOptions,
          data: humidityData
        }
      ]
      this.setState({
        labels,
        datasets
      })
    })
  }

  _updateState(data) {
    let labels = this.state.labels;
    labels.push(moment(data.date).format('DD-MM HH:mm'));
    labels.shift();

    let temperatureData = this.state.datasets[0].data;
    temperatureData.shift();
    temperatureData.push(data.temperature);

    let humidityData = this.state.datasets[1].data;
    humidityData.shift();
    humidityData.push(data.humidity);

    let datasets = [
      {
        ...temperatureGraphOptions,
        data: temperatureData
      },
      {
        ...humidityGraphOptions,
        data: humidityData
      }
    ]
    this.setState({
      labels,
      datasets
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

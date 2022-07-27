import React from 'react'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Series } from '../NewUI/types'

class ApexChart extends React.Component<{ series: Series[] }, { options: ApexOptions; series: Series[] }> {
  constructor(props) {
    super(props)

    this.state = {
      series: props.series,

      options: {
        chart: {
          id: 'basic-area',
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: '<img src="./images/icons/refresh-ccw.svg" />',
            },
          },
        },
        xaxis: {
          categories: ['03/15', '03/16', '03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23'],
        },
        markers: {
          size: 5,
          colors: ['#000524'],
          strokeColors: ['#00BAEC'],
          strokeWidth: 3,
        },
        dataLabels: {
          enabled: false,
        },
        // yaxis:{
        //   labels:{
        //     style:{
        //       colors:[theme.colors.text]
        //     }
        //   }
        // }
      },
    }
  }

  render() {
    const { options, series } = this.state
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ReactApexChart options={options} series={series} type="area" height={300} width="100%" />
      </div>
    )
  }
}

const options: ApexOptions = {
  chart: {
    id: 'basic-area',
    events: {
      mounted: (chart) => {
        chart.windowResizeHandler()
      },
    },
    height: '100%',
    width: '100%',
  },
  xaxis: {
    categories: [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009],
  },
}

export default ApexChart

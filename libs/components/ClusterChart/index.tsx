import React, { FC, Fragment, useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from 'highcharts/modules/heatmap';
import { clusterChart } from '../../types/components/clusterChart';
import { chartResponse } from '../../types/components/chartResponse';

console.log(typeof Highcharts);

if (typeof Highcharts === 'object') {
  HC_heatmap(Highcharts);
  HighchartsExporting(Highcharts)
}

const ClusterChart: FC<clusterChart> = ({ _id }) => {

  const [options, setOptions] = useState({
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1,
      height: (9 / 16 * 100) + '%',
      backgroundColor: 'transparent',
      style: {
        letterSpacing: 'unset',
      }
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      categories: [],
      labels: {
        formatter: function () {
          return this.value.toFixed(2);
        }
      },
      tickLength: 150,
      opposite: false,
      title: null,
    },
    colorAxis: {
      min: 0,
      minColor: 'rgba(167,167,167,0.1)',
      maxColor: 'rgba(167,167,167,1)'
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'middle',
      y: 25,
      symbolHeight: 350
    },
    tooltip: {
      formatter: function () {
        return `T: ${this.series.xAxis.categories[this.point.x]}<br>
                        Q: ${(this.point.value).toLocaleString('ru-RU')}<br>
                        P: ${this.series.yAxis.categories[this.point.y]}+<br>
                        O: ${this.point.orders}<br>
                        OI: ${parseInt(this.point.oi).toLocaleString('ru-RU')}`
      }
    },
    series: [{
      borderWidth: 0,
      clip: false,
      data: [],
      dataLabels: {
        enabled: true,
        crop: true,
        shadow: true,
        formatter: function () {
          if (this.point.value !== 0) {
            return this.point.value.toLocaleString('ru-RU');
          }
        },
        style: {
          fontFamily: 'Roboto',
          color: '#242424',
          fontSize: '14px',
          fontWeight: 'normal',
          textOutline: '0px',
        }
      }
    }]
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/dma/item/chart?_id=${_id}`)
      .then(response => response.json())
      .then(({ xAxis, yAxis, dataset }: chartResponse) => {
        setOptions({
          chart: {
            type: 'heatmap',
            plotBorderWidth: 1,
            height: (9 / 16 * 100) + '%',
            backgroundColor: 'transparent',
            style: {
              letterSpacing: 'unset',
            }
          },
          title: {
            text: undefined
          },
          xAxis: {
            categories: xAxis,
          },
          yAxis: {
            categories: yAxis,
            labels: {
              formatter: function () {
                return this.value.toFixed(2);
              }
            },
            tickLength: 150,
            opposite: false,
            title: null,
          },
          colorAxis: {
            min: 0,
            minColor: 'rgba(167,167,167,0.1)',
            maxColor: 'rgba(167,167,167,1)'
          },
          legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'middle',
            y: 25,
            symbolHeight: 350
          },
          tooltip: {
            formatter: function () {
              return `T: ${this.series.xAxis.categories[this.point.x]}<br>
                        Q: ${(this.point.value).toLocaleString('ru-RU')}<br>
                        P: ${this.series.yAxis.categories[this.point.y]}+<br>
                        O: ${this.point.orders}<br>
                        OI: ${parseInt(this.point.oi).toLocaleString('ru-RU')}`
            }
          },
          series: [{
            borderWidth: 0,
            clip: false,
            data: dataset,
            dataLabels: {
              enabled: true,
              crop: true,
              shadow: true,
              formatter: function () {
                if (this.point.value !== 0) {
                  return this.point.value.toLocaleString('ru-RU');
                }
              },
              style: {
                fontFamily: 'Roboto',
                color: '#242424',
                fontSize: '14px',
                fontWeight: 'normal',
                textOutline: '0px',
              }
            }
          }]
        });
      });
  }, []);

  return (
    <Fragment>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </Fragment>
  )
}

export default ClusterChart;

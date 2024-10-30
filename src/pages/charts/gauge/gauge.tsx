import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

// Initialize Highcharts modules
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

// Gauge chart options
interface GCProps {
  score: string;
}

const GaugeChart: React.FC<GCProps> = ({ score }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'gauge',
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%',
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    pane: {
      center: ['50%', '75%'],
      size: '110%',
      startAngle: -90,
      endAngle: 90,
      background: undefined,
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false, // Disable the center value display
        },
        linecap: 'round', // Rounded needle edge
        stickyTracking: false,
        rounded: true,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickColor: '#FFFFFF',
      tickLength: 15,
      tickWidth: 0,
      minorTickInterval: 0,
      labels: {
        enabled: false,
        distance: 5,
        style: {
          fontSize: '14px',
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 33,
          color: '#F2590D',
          thickness: 30,
        },
        {
          from: 33,
          to: 66,
          color: '#FFD400',
          thickness: 30,
        },
        {
          from: 66,
          to: 100,
          color: '#24A871',
          thickness: 30,
        },
      ],
    },
    series: [
      {
        type: 'gauge',
        name: 'Speed',
        data: [Number(score)],
        dataLabels: {
          enabled: false,
          format: '{y}',
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            '#333333',
          style: {
            fontSize: '24px',
            fontWeight: 'bold',
          },
        },
        dial: {
          radius: '70%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%',
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6,
        },
      },
    ],
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GaugeChart;

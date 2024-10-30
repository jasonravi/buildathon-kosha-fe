import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options: Highcharts.Options = {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Financial Breakdown',
  },
  plotOptions: {
    pie: {
      innerSize: '50%', // This makes it a donut chart
      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.percentage:.1f} %',
      },
    },
  },
  series: [
    {
      type: 'pie',
      name: 'Financial Data',
      data: [
        { name: 'Assets', y: 60, color: 'blue' }, // Option 1: Assets (Blue)
        { name: 'Liabilities', y: 25, color: 'aqua' }, // Option 2: Liabilities (Aqua)
        { name: 'Spends', y: 15, color: 'yellow' }, // Option 3: Spends (Yellow)
      ],
    },
  ],
  credits: {
    enabled: false,
  },
};

function PieChart() {
  // Highcharts configuration for the donut chart

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default PieChart;

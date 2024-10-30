import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { getMonthlyData } from '../../../network/controller/HomeController';
import { Convert, MonthlyData } from '../../../network/models/ProfileModel';
// Define the type for the data
// interface Data {
//   categories: string[];
//   assets: number[];
//   liabilities: number[];
//   spends: number[];
// }

// const data: Data = {
//   categories: [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ],
//   assets: [
//     45000, 47000, 48000, 50000, 51000, 53000, 55000, 56000, 58000, 59000, 60000,
//     61000,
//   ],
//   liabilities: [
//     28000, 29000, 29500, 30000, 31000, 32000, 33000, 33500, 34000, 34500, 35000,
//     36000,
//   ],
//   spends: [
//     12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000,
//     17500,
//   ],
// };

function LineChart() {
  const [data, setData] = React.useState<MonthlyData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log('in react use effect');
    setIsLoading(true);
    getMonthlyData()
      .then((response) => {
        console.log('response is  ' + JSON.stringify(response));

        const monthlyData = Convert.toMonthlyData(JSON.stringify(response));
        setData(monthlyData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const options = {
    title: {
      text: 'My Net Worth',
    },
    xAxis: {
      categories: data?.months,
      title: {
        text: 'Months',
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'Assets',
        data: data?.assets,
        color: 'green', // Line 1 - Blue for "Assets"
        marker: {
          symbol: 'circle',
        },
      },
      {
        name: 'Liabilities',
        data: data?.liabilities,
        color: 'red', // Line 2 - Aqua blue for "Liabilities"
        marker: {
          symbol: 'circle',
        },
      },
      {
        name: 'Spends',
        data: data?.spends,
        color: 'blue', // Line 3 - Yellow for "Spends"
        marker: {
          symbol: 'circle',
        },
      },
    ],
    chart: {
      type: 'line', // Define the chart type as "line"
      backgroundColor: '#F8F9FA',
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            padding: 100,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#F8F9FA',
          }}>
          <Oval height={40} width={40} color="blue" ariaLabel="loading" />
        </div>
      )}
      {data !== undefined && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
}

export default LineChart;

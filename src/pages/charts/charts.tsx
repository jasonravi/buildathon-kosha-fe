import React, { useState } from 'react';
import { getMonthlyData } from '../../network/controller/HomeController';
import { Convert, MonthlyData } from '../../network/models/ProfileModel';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import LineChart from './line/lineChart';
import { Oval } from 'react-loader-spinner';

// Sample data for the chart
const Charts = () => {
  const [data, setData] = useState<MonthlyData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            padding: 100,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Oval height={40} width={40} color="blue" ariaLabel="loading" />
        </div>
      )}
      {/* HighchartsReact component renders the chart */}
      {data !== undefined && (
        <>
          <LineChart />
          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'black',
              margin: '2px 0',
            }}
          />
        </>
      )}
    </div>
  );
};

export default Charts;

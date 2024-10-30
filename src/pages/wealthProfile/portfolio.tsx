import React from 'react';
import { Convert, PortfolioData } from '../../network/models/ProfileModel';
import { getPortfolioData } from '../../network/controller/HomeController';
import { Oval } from 'react-loader-spinner';
import Portfoliocard from './PorfolioCard/portfoliocard';

function Portfolio() {
  const [portfolioData, setData] = React.useState<PortfolioData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log('in react use effect');
    setIsLoading(true);
    getPortfolioData()
      .then((response) => {
        console.log('response is  ' + JSON.stringify(response));

        const portfolioData = Convert.toPortfolio(JSON.stringify(response));
        setData(portfolioData);
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
      {portfolioData.length > 0 &&
        portfolioData.map((value) => {
          return <Portfoliocard key={value.category} {...value} />;
        })}
    </div>
  );
}

export default Portfolio;

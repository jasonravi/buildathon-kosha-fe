import React from 'react';
import AppLoader from '../../../components/AppLoader/AppLoader';
import { getFinancialScore } from '../../../network/controller/HomeController';
import { Convert, FinancialScore } from '../../../network/models/ProfileModel';
import GaugeChart from '../../charts/gauge/gauge';
import './financialScoreCard.scss';
import { Button } from '@mui/material';
import ScoreDeatilsCard from './scoreDetailsCard/ScoreDeatilsCard';

export const getScoreColor = (score: string): string => {
  const fs = Number(score) ?? 0;
  switch (true) {
    case fs >= 0 && fs < 33:
      return '#F2590D';
    case fs >= 33 && fs < 66:
      return '#FFD400';
    case fs >= 66 && fs <= 100:
      return '#24A871';
    default:
      return '#24A871';
  }
};

function FinancialScoreCard() {
  const [data, setData] = React.useState<FinancialScore>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  // Show the popup
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Hide the popup
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  React.useEffect(() => {
    console.log('in react use effect');
    setIsLoading(true);
    getFinancialScore()
      .then((response) => {
        console.log('response is ' + JSON.stringify(response));

        const score = Convert.toFinancialScore(JSON.stringify(response));
        setData(score);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="rootContainer debug11">
      {data !== undefined && (
        <div>
          <div className="scoreAndChartContainer flex-row">
            <div className="scoreCardContainer debug11 col-5">
              <h1 className="financialScoreTitle">Financial Score</h1>
              <h1
                style={{ color: getScoreColor(data.score) }}
                className="financialScoreValue">
                {data.score}
              </h1>
              <p
                style={{ color: getScoreColor(data.score) }}
                className="financialScoreDesc">
                {data.description}
              </p>
            </div>
            <div className="gauzeChartContainer debug11 col-7">
              <GaugeChart score={data.score} />
            </div>
          </div>
          <div className="divider separator" />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="text"
              onClick={showPopup}
              sx={{
                color: '#184734',
                paddingTop: '8px', // Change the text color
                //marginBottom: '12px',
              }}>
              How is this calculated???
            </Button>
          </div>
        </div>
      )}
      {/* Popup View */}
      {isPopupVisible && (
        <div className="scoreDetails">
          {data !== undefined && (
            <ScoreDeatilsCard details={data.details} desc={data.description} />
          )}
          <Button
            variant="text"
            sx={{ color: '#24A871' }}
            className="ok-btn"
            onClick={hidePopup}>
            Okay
          </Button>
        </div>
      )}
      <AppLoader isLoading={isLoading} />
    </div>
  );
}

export default FinancialScoreCard;

import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../../components/AppLoader/AppLoader';
import { getUserRecommendation } from '../../network/controller/HomeController';
import { Convert, KoshaGoals } from '../../network/models/KoshGoals';
import RecommendationCard from './recommendation-card/recommendationCard';
import './recommendation.scss';
function Recommendation() {
  const [recommendationsData, setData] = React.useState<KoshaGoals>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true);
    getUserRecommendation(false)
      .then((response) => {
        const monthlyData = Convert.toKoshaGoals(JSON.stringify(response));
        setData(monthlyData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppLoader isLoading={isLoading} />
      <div className="bgHeader">
        <img className="headerLogo" src="./logo.svg" alt="Legacy" />
        <div className="dataContainer">
          <div className="headerContainer">
            <p className="headerTitle">GOALS</p>
            <Button
              id="Build assets"
              className="addGoal"
              variant="contained"
              style={{
                borderRadius: 16,
                background: '#94FFD4',
                color: '#184734',
              }}
              onClick={() => {
                navigate('/goal', { state: { fromOnBoarding: false } });
              }}>
              Add more goals
            </Button>
          </div>
          {recommendationsData !== undefined &&
            recommendationsData.recommendations.map((recommendation, index) => {
              return <RecommendationCard {...recommendation} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;

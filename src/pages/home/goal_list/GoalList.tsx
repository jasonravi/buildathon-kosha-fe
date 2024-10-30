import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../../../components/AppLoader/AppLoader';
import { isDefined } from '../../../utils/utility';
import './GoalList.scss';
import GoalCard from './goal-card/goalCard';
import { getUserRecommendation } from '../../../network/controller/HomeController';
import { Convert, KoshaGoals } from '../../../network/models/KoshGoals';
const GoalList: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [recommendationsData, setData] = React.useState<KoshaGoals>();

  const navigation = useNavigate();
  const fetchGoals = () => {
    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    console.log('userId is ' + userId);
    if (isDefined(userId)) {
      getUserRecommendation()
        .then((response) => {
          const monthlyData = Convert.toKoshaGoals(JSON.stringify(response));
          setData(monthlyData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoalPressHandler = () => {
    navigation('/goal', { state: { fromOnBoarding: false } });
  };

  return (
    <div className="GoalListParentContainer m-t32">
      <div className="GoalListParent">
        <p className="goalHeader">Goals</p>
        <div className="GoalListScroll">
          {recommendationsData !== undefined &&
            recommendationsData.recommendations.map((recommendation, index) => {
              return (
                <GoalCard goal={recommendation} index={index} key={index} />
              );
            })}
        </div>
      </div>
      <div
        className="divider"
        style={{
          width: '100%',
          marginTop: '4px',
        }}
      />
      <div className="buttonAddMoreGoalContainer">
        <Button
          variant="text"
          sx={{
            color: '#184734', // Change the text color
          }}
          onClick={addGoalPressHandler}>
          Add more goals +
        </Button>
      </div>
      <AppLoader isLoading={isLoading} />
    </div>
  );
};

export default GoalList;

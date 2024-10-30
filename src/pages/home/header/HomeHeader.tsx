import React from 'react';
import GoalList from '../goal_list/GoalList';
import Networth from '../networth/networth';
import ScoreCard from '../score_card/ScoreCard';
import './HomeHeader.scss';

const HomeHeader: React.FC = () => {
  return (
    <div className="homeHeadercontainer">
      <div className="header"></div>
      <div className="scrollContainer">
        <img className="headerLogo" src="./logo.svg" alt="Legacy" />
        <Networth />
        <ScoreCard />
        <GoalList />
        <div className="homeFooterLogo">
          <img src="./home_footer.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;

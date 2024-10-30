import React from 'react';
import './ScoreCard.scss';
import FinancialScoreCard from '../../wealthProfile/financialScore/financialScoreCard';

const ScoreCard: React.FC = () => {
  return (
    <div className="ScoreCardParentContainer">
      <FinancialScoreCard />
    </div>
  );
};

export default ScoreCard;

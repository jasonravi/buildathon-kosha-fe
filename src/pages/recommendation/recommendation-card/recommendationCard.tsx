import { Button, LinearProgress } from '@mui/material';
import { Recommendations } from '../../../network/models/KoshGoals';
import './recommendationCard.scss';
import { formatPriceToLakhs } from '../../../utils/utility';
const RecommendationCard = (recommendation: Recommendations) => {
  const achivementRatio =
    recommendation.achievedAmount / recommendation.targetAmount;
  const achivementPercent = achivementRatio >= 1 ? 100 : achivementRatio * 100;

  return (
    <div className="RecommendationGoalCard">
      <img className="recGoalIcon" src={recommendation.logo} alt="Goal Icon" />
      <p className="recGoalTitle text-ellipsis">{recommendation.name}</p>
      <div className="recGoalProgressContainer">
        <p className="recGoalAchieveAmount">
          {formatPriceToLakhs(recommendation.achievedAmount)}
        </p>
        <p className="recGoalAmountSeparator">/</p>
        <p className="recGoalTargetAmount">
          {formatPriceToLakhs(recommendation.targetAmount)}
        </p>
      </div>
      <div
        style={{
          marginTop: '4px',
        }}>
        <LinearProgress
          variant="determinate"
          color="success"
          value={achivementPercent}
          style={{ width: '100%' }}
          sx={{
            height: 10,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#184734',
            },
            backgroundColor: '#E5E5E5',
          }}
        />
      </div>
      <p className="recTotalRecommendationLabel">
        {recommendation.recommendations.length} Recommendations
      </p>
      {recommendation.recommendations.map((instrument, index) => {
        return (
          <div className="recInstrumentContainer" key={index}>
            <div>
              <p className="recInstrumentName">{instrument.name}</p>
              <p className="recInstrumentDescription">
                {instrument.description}
              </p>
            </div>
            <div>
              <Button
                id="Build assets"
                className="recAddGoal"
                variant="contained"
                style={{ background: '#184734' }}
                onClick={() => {
                  alert(
                    'You can make the payment and upload this document directly to DigiLocker',
                  );
                }}>
                ADD
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationCard;

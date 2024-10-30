import { LinearProgress } from '@mui/material';
import { Recommendations } from '../../../../network/models/KoshGoals';
import { formatPriceToLakhs } from '../../../../utils/utility';
import './goalCard.scss';

interface GoalCardProps {
  goal: Recommendations;
  index: number;
}

function GoalCard(props: GoalCardProps) {
  const achivementRatio = props.goal.achievedAmount / props.goal.targetAmount;
  const achivementPercent = achivementRatio >= 1 ? 100 : achivementRatio * 100;

  return (
    <div
      className="GoalCard"
      style={
        props.index > 0
          ? {
              marginLeft: '4px',
            }
          : undefined
      }>
      <img className="goalIcon" src={props.goal.logo} alt="Goal Icon" />
      <p className="goalTitle text-ellipsis">{props.goal.name}</p>
      <div className="goalProgressContainer">
        <p className="goalAcheiveAmount">
          {formatPriceToLakhs(props.goal.achievedAmount)}
        </p>
        <p className="goalAmountSeperator">/</p>
        <p className="goalTargetAmount">
          {formatPriceToLakhs(props.goal.targetAmount)}
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
      {props.goal.recommendations.length > 0 && (
        <p className="goalRecommendations text-ellipsis">
          {props.goal.recommendations.length} Recommendations
        </p>
      )}
    </div>
  );
}

export default GoalCard;

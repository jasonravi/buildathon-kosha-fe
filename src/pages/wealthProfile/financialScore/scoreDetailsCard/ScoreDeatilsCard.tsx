import {
  FinancialScoreDetails,
  ScoreDetailMeta,
} from '../../../../network/models/ProfileModel';
import { getScoreColor } from '../financialScoreCard';
import './ScoreDetailCard.scss';

type DetailCardProps = {
  details: FinancialScoreDetails;
  desc: string;
};

const ScoreDeatilsCard = (props: DetailCardProps) => {
  return (
    <div className="card">
      {props.details.financialScore.length > 0 && (
        <h1 className="m-t16 categoryName">Financial Ratios</h1>
      )}
      <div
        className="divider"
        style={{
          width: '100%',
          marginTop: '8px',
          marginBottom: '6px',
        }}
      />
      {props.details.financialScore.map((item) => {
        return <ScoreCardRow key={item.category} rowDetails={item} />;
      })}
      <div
        className="divider"
        style={{
          width: '100%',
          marginTop: '8px',
          marginBottom: '6px',
        }}
      />

      {props.details.demographicScore.length > 0 && (
        <h1 className="categoryName">DemoGraphic Score</h1>
      )}
      {props.details.demographicScore.map((item) => {
        return <ScoreCardRow key={item.category} rowDetails={item} />;
      })}
      <div
        className="divider"
        style={{
          width: '100%',
          marginTop: '8px',
          marginBottom: '6px',
        }}
      />
      <div className="column center">
        <h1 className="categoryName">Final Score</h1>
        <h1 style={{ color: getScoreColor(props.details.finalScore) }}>
          {props.details.finalScore} (Financially secure)
        </h1>
      </div>
    </div>
  );
};
type ScoreRowProps = {
  rowDetails: ScoreDetailMeta;
};
const ScoreCardRow = (props: ScoreRowProps) => {
  return (
    <div
      className="cardRow"
      key={props.rowDetails.category}
      style={{
        marginTop: '8px',
      }}>
      <div className="itemName">
        {props.rowDetails.category} ({props.rowDetails.weightage}%)
      </div>
      <div>{props.rowDetails.score} </div>
    </div>
  );
};

export default ScoreDeatilsCard;

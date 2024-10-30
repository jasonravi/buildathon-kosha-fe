import LineChart from '../charts/line/lineChart';

import Portfolio from './portfolio';
import './wealthProfile.scss';

function WealthProfile() {
  return (
    <div className="wealthProfileContainer">
      <div className="wealthProfileHeader" />
      <div className="wealthProfileDataContainer">
        <LineChart />
        <Portfolio />
      </div>
    </div>
  );
}

export default WealthProfile;

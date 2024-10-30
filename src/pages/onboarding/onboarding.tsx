import ObBottom from './ObBottom/ObBottom';
import './onboarding.scss';

function OnBoarding() {
  return (
    <div className="obParent">
      <div className="obTop">
        <img className="obLogo" src="./logo_green.svg" alt="Not found" />
      </div>
      <div className="obBottom">
        <ObBottom />
      </div>
    </div>
  );
}

export default OnBoarding;

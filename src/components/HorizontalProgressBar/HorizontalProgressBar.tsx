import React from 'react';
import './HorizontalProgressBar.scss';

interface HorizontalProgressBarProps {
  progress: number;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({
  progress,
}) => {
  return (
    <div className="progressBarContainer">
      {/* <div className="progressBar" style={{ width: `50%` }}></div> */}
    </div>
  );
};

export default HorizontalProgressBar;

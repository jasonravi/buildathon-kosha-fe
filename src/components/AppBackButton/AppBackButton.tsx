import React from 'react';
import './AppBackButton.scss';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface AppBackButtonProps {
  onClick: () => void;
}
const AppBackButton: React.FC<AppBackButtonProps> = ({ onClick }) => {
  return (
    <div className="backButtonContainer">
      <IconButton onClick={onClick} className="back-button">
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

export default AppBackButton;

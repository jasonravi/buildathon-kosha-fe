import React, { useEffect } from 'react';
import './splash.scss';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, []);

  return (
    <div className="splashParent">
      <img className="splashLogo" src="./logo.svg" alt="not found" />
    </div>
  );
};

export default Splash;

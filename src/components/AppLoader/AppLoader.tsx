import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './loader.scss';
export interface IAppLoaderProps {
  isLoading: boolean;
}
const AppLoader: React.FC<IAppLoaderProps> = ({ isLoading }) => {
  return (
    <div className="loader-container">{isLoading && <CircularProgress />}</div>
  );
};

export default AppLoader;

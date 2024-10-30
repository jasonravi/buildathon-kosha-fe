import { Button, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import http from '../../utils/http';
import { isDefined } from '../../utils/utility';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const formatted = event.target.value
      .replace(/[^0-9.]/g, '')
      .substring(0, 10);
    setMobileNumber(formatted);
  };
  const handleContinue = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      return;
    }
    setIsLoading(true);
    setMobileNumberError('');
    http
      .get('user/onboardingDetail', {
        mobileNumber,
      })
      .then((res) => {
        localStorage.setItem('mobileNumber', mobileNumber);
        setMobileNumberError('');
        setIsLoading(false);
        console.log('res is ', res);

        localStorage.setItem('userId', res.userId);
        if (res.status) {
          navigate('/home', {
            replace: true,
          });
        } else {
          navigate('/onBoarding', {
            replace: true,
          });
        }
      })
      .catch((err) => {
        setMobileNumberError(err);
        setIsLoading(false);
      });
  };
  return (
    <div className="ht-100 kosh-logo flex-col flex-1">
      <div>
        <div className="center p-tb20">
          <img src="/logo.svg" alt="KOSH" />
        </div>
      </div>
      <div className="child-container">
        <div className="auth-container">
          <div className="title-container">
            <Typography variant="h5">Log In</Typography>
            {/*<Typography variant="body2">Get started for free</Typography>*/}
          </div>
          <form className="form-container" onSubmit={handleContinue}>
            <Input
              value={mobileNumber}
              placeholder="Enter mobile number"
              onChange={handleInputChange}
              startAdornment={mobileNumber.length > 0 ? '+91-' : ''}
              autoFocus
              type="number"
              className="login-input"
            />
            <div className="cta-container">
              <Button
                className="wd-100"
                variant="contained"
                onClick={handleContinue}
                sx={{
                  color: '#ECECEC',
                  backgroundColor: '#184734',
                }}
                disabled={mobileNumber.length !== 10 || isLoading}>
                Continue
              </Button>
              {isDefined(mobileNumberError) && (
                <Typography className="m-t8" color="error">
                  {mobileNumberError}
                </Typography>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

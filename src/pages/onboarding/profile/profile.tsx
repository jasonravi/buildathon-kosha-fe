import { Button, Input, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AppBackButton from '../../../components/AppBackButton/AppBackButton';
import AppLoader from '../../../components/AppLoader/AppLoader';
import { updateUser } from '../../../network/controller/UserController';
import {
  EmploymentType,
  Gender,
  User,
  UserResponse,
} from '../../../network/models/User';
import { isDefined } from '../../../utils/utility';
import './profile.scss';

const Profile: React.FC = () => {
  const cachedMobileNumber = localStorage.getItem('mobileNumber');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('MALE');
  const [mobileNumber, setMobileNumber] = useState(cachedMobileNumber || '');
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>('SALARIED');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const nameValid = /^[a-zA-Z ]{2,}$/.test(fullName);
    const ageValid = /^\d+$/.test(age);
    const mobileValid = /^\d{10}$/.test(mobileNumber);
    const genderValid = gender !== undefined;
    const employmentValid = isDefined(employmentType);

    setIsValid(
      nameValid && ageValid && mobileValid && genderValid && employmentValid,
    );
  }, [fullName, age, gender, mobileNumber, employmentType]);

  const onPressHandler = () => {
    setIsValid(true);
    const user: User = {
      firstName: fullName,
      age: parseInt(age),
      lastName: '',
      employmentType: employmentType,
      gender: isDefined(gender) ? gender : 'MALE',
      maritalStatus: 'SINGLE',
      mobileNumber: mobileNumber,
      numberOfDependents: 0,
      status: 1,
    };
    setIsLoading(true);
    updateUser(user)
      .then((response) => {
        setIsLoading(false);
        const userResponse: UserResponse = response as UserResponse;
        const redirectionUrl = userResponse.redirect_url;
        const userId = response.userId;
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('consent_handle', userResponse.consents[0].handle);
        window.location.href = redirectionUrl;
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const onBackPressHandler = () => {
    window.history.back();
  };

  return (
    <div className="profileContainer">
      <div className="profileTopContainer">
        <AppBackButton onClick={onBackPressHandler} />
        <h1 className="title">Let’s get to know you!</h1>
        <p className="subtitle">
          Enter your name, age, and a few key details to get started.
        </p>
        <form className="profile-form">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            className="form-input"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <Input
                type="number"
                id="age"
                name="age"
                className="form-input"
                value={age}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 3) {
                    setAge(value);
                  }
                }}
                placeholder="Enter your age"
                style={{ height: '40px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <Select
                id="gender"
                name="gender"
                className="form-input"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                style={{ height: '40px' }}>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <div className="mobile-input-group">
              <label className="country-code">+91</label>
              <Input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                className="form-input mobile-input"
                value={mobileNumber}
                disabled={isDefined(cachedMobileNumber)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 10) {
                    setMobileNumber(value);
                  }
                }}
                placeholder="Enter your mobile number"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="employmentType" className="form-label">
              Employment Type
            </label>
            <Select
              id="employmentType"
              name="employmentType"
              className="form-input"
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value as EmploymentType)
              }
              style={{ height: '40px' }}>
              <MenuItem value="SALARIED">Salaried Employee</MenuItem>
              <MenuItem value="SELF_EMPLOYED">Self Employed</MenuItem>
              <MenuItem value="RETIRED">Retired</MenuItem>
              <MenuItem value="UNEMPLOYED">Unemployed</MenuItem>
            </Select>
          </div>
        </form>
        <div />
      </div>

      <div className="profileButtonContainer">
        <Button
          variant="contained"
          className="button"
          disabled={!isValid}
          onClick={onPressHandler}
          sx={{
            color: '#ECECEC',
            backgroundColor: '#184734',
            marginTop: '20px',
            width: '100%',
          }}>
          {!isValid ? 'Get Started' : 'Next'}
        </Button>
        <AppLoader isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Profile;

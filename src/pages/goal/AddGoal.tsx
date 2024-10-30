import MicIcon from '@mui/icons-material/Mic';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLoader from '../../components/AppLoader/AppLoader';
import { saveGoal } from '../../network/controller/UserController';
import { Goal, Priority } from '../../network/models/User';
import './goal.scss';
import AppBackButton from '../../components/AppBackButton/AppBackButton';

const goals = [
  'Buy car',
  'Buy House',
  'Plan wedding',
  'Buy gadget',
  'Start business',
  'Home Renovation',
];

const AddGoal: React.FC = () => {
  const location = useLocation();
  const fromOnBoarding = location.state ? location.state.fromOnBoarding : false;
  const [goalValue, setGoalValue] = React.useState('');
  const [amountValue, setAmountValue] = React.useState<number>(0);
  const [durationValue, setDurationValue] = React.useState<number>(0);
  const [priorityValue, setPriorityValue] = React.useState<Priority>('LOW');
  const goalInputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const navigation = useNavigate();
  const [recordingGoal, setRecording] = useState(false);
  const [recordingAmount, setAmountRecording] = useState(false);
  const [recordingDuration, setDurationRecording] = useState(false);

  useEffect(() => {
    console.log('Add Goal Page');
    const userId = localStorage.getItem('userId');
    console.log('User Id', userId);
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const priorityPressHandler = (priority: Priority) => {
    setPriorityValue(priority);
  };

  const onBackPressHandler = () => {
    window.history.back();
  };

  const onGoalSavePressHandler = () => {
    setIsLoading(true);
    const goalModel: Goal = {
      achiveAmount: 0,
      description: goalValue,
      duration: durationValue,
      priority: priorityValue,
      targetAmount: amountValue,
      name: goalValue,
      logo: '',
    };
    const consentHandle = fromOnBoarding
      ? (localStorage.getItem('consent_handle') ?? '')
      : '';
    saveGoal(goalModel, userId, consentHandle)
      .then((response) => {
        setIsLoading(false);
        navigation('/home');
        console.log('Goal Saved', response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Error in saving goal', error);
      });
  };

  const goalHintPressHandler = (goal: string) => {
    setGoalValue(goal);
    if (goalInputRef.current) {
      goalInputRef.current.focus();
    }
  };

  const startRecording = (id: string) => {
    console.log('startRecording for ' + id);

    switch (id) {
      case 'goal':
        setGoalValue('');
        setRecording(true);
        break;
      case 'amount':
        setAmountValue(0);
        setAmountRecording(true);
        break;
      case 'duration':
        setDurationValue(0);
        setDurationRecording(true);
        break;
    }
    console.log('switch case break');

    recognition.start();

    // Handle the transcription result
    recognition.onresult = (event: any) => {
      console.log('onresult');
      setIsLoading(false);

      const speechToText = event.results[0][0].transcript;
      console.log('speechToText ' + speechToText);
      console.log(Number(speechToText));

      // Simulate a delay for loader
      setTimeout(() => {
        switch (id) {
          case 'goal':
            setGoalValue(speechToText);
            break;
          case 'amount':
            if (isNaN(Number(speechToText))) {
              setAmountValue(0);
            } else {
              setAmountValue(speechToText);
            }
            break;
          case 'duration':
            setDurationValue(Number(speechToText));
            break;
        }
        setRecording(false);
        setDurationRecording(false);
        setAmountRecording(false);
      }, 1500); // Adjust as per your preference
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      setRecording(false);
      setDurationRecording(false);
      setAmountRecording(false);
      setIsLoading(false);
    };
  };

  const stopRecording = () => {
    console.log('stop recording');
    recognition.stop();
    setRecording(false);
    setDurationRecording(false);
    setAmountRecording(false);
    if (recordingGoal || recordingDuration || recordingAmount) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const validAmount = amountValue > 0;
    const validDuration = durationValue > 0;
    const validGoal = goalValue.length > 0;
    setIsValid(validAmount && validDuration && validGoal);
  }, [amountValue, durationValue, goalValue]);
  return (
    <div className="addGoalContainer">
      <div className="addGoalTopContainer">
        <AppBackButton onClick={onBackPressHandler} />

        <p className="addGoalTitle">Your personal goal </p>
        <p className="addGoalSubtitle">
          Share the details and let&apos;s start working toward your financial
          success
        </p>
        <TextField
          id="goalInput"
          className="addGoalInput"
          label="Enter Goal"
          variant="outlined"
          value={goalValue}
          onChange={(e) => {
            const value = e.target.value;
            setGoalValue(value);
          }}
          inputRef={goalInputRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon
                  className={recordingGoal ? 'record-button' : ''}
                  onClick={
                    !recordingGoal
                      ? startRecording.bind(this, 'goal')
                      : stopRecording
                  }
                />
              </InputAdornment>
            ),
          }}
        />
        {recordingGoal ? 'Listening...' : ''}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            marginTop: '12px',
          }}
          className="goals-hide-scrollbar">
          {goals.map((goal) => (
            <div key={goal} style={{ marginRight: '8px' }}>
              <Button
                id={goal}
                variant="outlined"
                sx={{
                  borderRadius: '24px',
                  backgroundColor: '#F8F9FA',
                  border: '1px solid #2F2F2F',
                  color: '#2F2F2F',
                  padding: '4px',
                  minHeight: 'auto', // Ensure the button height is adjusted based on content
                  lineHeight: '1', // Control the vertical alignment of the text
                  height: '24px',
                }}
                onClick={() => goalHintPressHandler(goal)}>
                <p
                  className="text-ellipsis"
                  style={{
                    color: '#2F2F2F',
                    margin: 0, // Reset margin to ensure padding is applied correctly
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                  }}>
                  {goal}
                </p>
              </Button>
            </div>
          ))}
        </div>

        <TextField
          id="amountInput"
          className="addGoalInput"
          label="Enter Your amount"
          variant="outlined"
          value={amountValue}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 0) {
              setAmountValue(parseInt(value));
            } else {
              setAmountValue(0);
            }
          }}
          inputProps={{
            inputMode: 'numeric',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon
                  className={recordingAmount ? 'record-button' : ''}
                  onClick={
                    !recordingAmount
                      ? startRecording.bind(this, 'amount')
                      : stopRecording
                  }
                />
              </InputAdornment>
            ),
          }}
          style={{
            marginTop: '24px',
          }}
        />
        {recordingAmount ? 'Listening...' : ''}
        <TextField
          id="duartionInput"
          className="addGoalInput"
          label="Enter Your duration in years"
          variant="outlined"
          value={durationValue}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 0) {
              setDurationValue(parseInt(value));
            } else {
              setDurationValue(0);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon
                  className={recordingDuration ? 'record-button' : ''}
                  onClick={
                    !recordingDuration
                      ? startRecording.bind(this, 'duration')
                      : stopRecording
                  }
                />
              </InputAdornment>
            ),
          }}
          style={{
            marginTop: '24px',
          }}
        />
        {recordingDuration ? 'Listening...' : ''}

        <p className="label"> Goal Priority</p>
        <Box
          style={{
            marginTop: '12px',
          }}
          display="flex"
          justifyContent="space-between">
          <div
            className="addGoalPriority"
            onClick={priorityPressHandler.bind(this, 'LOW')}>
            <p
              className="addGoalLabelPriority"
              style={{
                color: '#24A871',
              }}>
              Low
            </p>

            <div
              className="addGoalPriorityBar"
              style={{
                backgroundColor: '#24A871',
              }}
            />
            {priorityValue === 'LOW' && (
              <img src="./drop-up.svg" alt="Legacy" />
            )}
          </div>
          <div
            className="addGoalPriority"
            onClick={priorityPressHandler.bind(this, 'MEDIUM')}>
            <p
              className="addGoalLabelPriority"
              style={{
                color: '#FFD400',
              }}>
              Medium
            </p>
            <div
              className="addGoalPriorityBar"
              style={{
                backgroundColor: '#FFD400',
              }}
            />
            {priorityValue === 'MEDIUM' && (
              <img src="./drop-up.svg" alt="Legacy" />
            )}
          </div>
          <div
            className="addGoalPriority"
            onClick={priorityPressHandler.bind(this, 'HIGH')}>
            <p
              className="addGoalLabelPriority"
              style={{
                color: '#F2590D',
              }}>
              High
            </p>
            <div
              className="addGoalPriorityBar"
              style={{
                backgroundColor: '#F2590D',
              }}
            />
            {priorityValue === 'HIGH' && (
              <img src="./drop-up.svg" alt="Legacy" />
            )}
          </div>
        </Box>
      </div>
      <div className="addGoalButtonContainer">
        <Button
          variant="contained"
          className="addGoalButton"
          disabled={!isValid}
          onClick={onGoalSavePressHandler}
          sx={{
            color: '#ECECEC',
            backgroundColor: '#184734',
            marginTop: '20px',
            width: '100%',
          }}>
          Continue
        </Button>

        <AppLoader isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddGoal;

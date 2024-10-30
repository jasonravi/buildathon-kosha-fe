import { useState } from 'react';
import './ObBottom.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ObMessageContainer from './ObMessageContainer/ObMessageContainer';

function ObBottom() {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const navigate = useNavigate();

  const onPressHandler = () => {
    if (pageIndex < 4) {
      setPageIndex(pageIndex + 1);
    } else {
      navigate('/profile');
    }
  };
  return (
    <div className="obBottomContainer">
      <div>
        <ObMessageContainer currentIndex={pageIndex} pageCount={3} />
      </div>
      <Button
        variant="contained"
        onClick={onPressHandler}
        sx={{
          color: '#ECECEC',
          backgroundColor: '#184734',
          marginTop: '20px',
          width: '100%',
        }}>
        {pageIndex === 4 ? 'Get Started' : 'Next'}
      </Button>
    </div>
  );
}
export default ObBottom;

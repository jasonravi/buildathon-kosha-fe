//import { Button } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import HomeHeader from './header/HomeHeader';
import './home.scss';
//import GoalList from './goal_list/GoalList';

function Home() {
  //const navigate = useNavigate();
  return (
    <div className="homeParent">
      <HomeHeader />
      {/* <GoalList /> */}

      {/* <div className="footer">
        <Button onClick={() => navigate('/about')}>Go to about</Button>
        <Button onClick={() => navigate('/voice')}>Go to voice-to-text</Button>
        <Button onClick={() => navigate('/charts')}>Go to Charts</Button>
        <Button onClick={() => navigate('/about')}>Go to about</Button>
        <Button onClick={() => navigate('/voice')}>Go to voice-to-text</Button>
        <Button onClick={() => navigate('/wealthProfile')}>
          Go to Profile
        </Button>
      </div> */}
    </div>
  );
}

export default Home;

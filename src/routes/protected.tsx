import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { isDefined } from '../utils/utility';
import { Home, CurrencyRupee } from '@mui/icons-material';

const SCREENS_WITHOUT_NAV = ['/login', '/onBoarding', '/goal', '/profile', '/'];
const LOCATION_NAV_ACTION_MAP: {
  [key: string]: number;
} = {
  '/home': 0,
  '/recommendation': 1,
  '/wealthProfile': 2,
};

function Protected() {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [showBottomNav, setShowBottomNav] = useState(true);
  useEffect(() => {
    const actionIndex = LOCATION_NAV_ACTION_MAP[location.pathname];
    if (isDefined(actionIndex)) {
      setValue(actionIndex);
    } else {
      setValue(0);
    }
    setShowBottomNav(!SCREENS_WITHOUT_NAV.includes(location.pathname));
  }, [location]);
  // TODO: use login token here
  const token = true;
  return token ? (
    <div className="ht-100 flex flex-column">
      <div className="flex flex-1 flex-column overflow-y-auto">
        <Outlet />
      </div>
      {showBottomNav && (
        <BottomNavigation
          showLabels
          value={value}
          style={{
            zIndex: 500,
          }}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="Home"
            icon={<Home sx={{ color: value === 0 ? '#184734' : '' }} />}
          />
          <BottomNavigationAction
            component={Link}
            to="/recommendation"
            label="My Goals"
            icon={
              <img
                height={24}
                width={24}
                src={value === 1 ? 'goal.svg' : 'goal.svg'}
                alt=""
              />
            }
          />
          <BottomNavigationAction
            component={Link}
            to="/wealthProfile"
            label="My Net Worth"
            icon={
              <CurrencyRupee sx={{ color: value === 2 ? '#184734' : '' }} />
            }
          />
        </BottomNavigation>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Protected;

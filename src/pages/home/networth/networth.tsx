import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../../../components/AppLoader/AppLoader';
import { getNetWorth } from '../../../network/controller/UserController';
import { FinancialData } from '../../../network/models/User';
import { isDefined } from '../../../utils/utility';
import './networth.scss';

const Networth: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [netWorthData, setNetWorthData] = React.useState<FinancialData>();
  const navigation = useNavigate();
  const fetchUserNetWorth = () => {
    const userId = localStorage.getItem('userId');
    console.log('User Id', userId);
    setIsLoading(true);
    if (isDefined(userId)) {
      getNetWorth(userId)
        .then((response) => {
          console.log('response is ' + JSON.stringify(response));

          setIsLoading(false);
          setNetWorthData(response as FinancialData);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchUserNetWorth();
  }, []);

  const viewMorePressed = () => {
    navigation('/wealthProfile');
  };

  return (
    <div id="divNetworth" className="networth">
      <p className="networthHeader">MY NETWORTH</p>
      <p className="networthValue">{netWorthData?.totalWealth ?? ''}</p>
      <Box
        style={{
          marginTop: '12px',
        }}
        display="flex"
        justifyContent="space-between">
        <div className="networthFacet">
          <div className="networthFacetHeader">
            <img src="./rupee.svg" alt="up" />
            <p className="networthFacetHeaderTitle">ASSETS</p>
          </div>
          <p className="networthFacetHeaderSubTitle">
            {netWorthData?.assets ?? ''}
          </p>
        </div>
        <div className="networthFacet">
          <div className="networthFacetHeader">
            <img src="./liabilities.svg" alt="up" />
            <p className="networthFacetHeaderTitle">Liabilities</p>
          </div>
          <p className="networthFacetHeaderSubTitle">
            {netWorthData?.liabilities ?? ''}
          </p>
        </div>
        <div className="networthFacet">
          <div className="networthFacetHeader">
            <img src="./spends.svg" alt="up" />
            <p className="networthFacetHeaderTitle">Spends</p>
          </div>
          <p className="networthFacetHeaderSubTitle">
            {netWorthData?.spends ?? ''}
          </p>
        </div>
      </Box>
      <div className="divider separator" />
      <Button
        variant="text"
        onClick={viewMorePressed}
        sx={{
          color: '#184734',
          paddingTop: '8px', // Change the text color
          //marginBottom: '12px',
        }}>
        View more details
      </Button>
      <AppLoader isLoading={isLoading} />
    </div>
  );
};

export default Networth;

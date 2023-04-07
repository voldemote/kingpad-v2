import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { KingstarterStatusCard } from 'src/Components/Cards/KingstarterStatusCard';
import { KingpassholderCard } from 'src/Components/Cards/KingpassholderCard';
import { KingStarterContributeCard } from 'src/Components/Cards/KingStarterContributeCard';
import { coinDataProps } from 'src/Constant/interface';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { getUserPassActive } from 'src/Contracts/kingPad';

export const CoinDetailCards = (props: { data: coinDataProps }) => {
  const { data } = props;
  const [status, setStatus] = useState(''); // 1: Upcoming 2: KingStarter 3: KingSale 4: Ended

  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [hasKing, setHasKing] = useState(false);
  const [currency, setCurrency] = useState('BNB');
  const [timestamp, setTimeStamp] = useState(0);

  const getUserActive = async () => {
    if (address !== undefined) {
      const _hasKing = await getUserPassActive(address);
      setHasKing(_hasKing);
    }
  };

  useEffect(() => {
    console.log({ data });
    getKingStarterStatus();
    setCurrency(data.currency);
  }, [data]);

  const getKingStarterStatus = () => {
    const now = new Date(Date.now()).getTime();
    const kingpass_start = new Date(data.kingpass_start).getTime();
    const kingpass_end = new Date(data.kingpass_end).getTime();
    let _status = '';
    if (kingpass_start < now) {
      _status = 'Upcoming';
    }
    if (kingpass_start < now && kingpass_end > now) {
      _status = 'Ongoing';
    }
    if (kingpass_end < now) {
      _status = 'Ended';
    }
    setStatus(_status);
  };

  const getTimeStamp = () => {
    console.log('getTimeStamp');
    console.log(data.kingpass_start, data.kingpass_end);
    const now = new Date(Date.now()).getTime();

    const kingpass_start = new Date(data.kingpass_start).getTime();
    const kingpass_end = new Date(data.kingpass_end).getTime();

    let _timeStamp = 0;
    if (status === 'Upcoming') {
      _timeStamp = kingpass_start;
    } else if (status === 'Ongoing') {
      _timeStamp = kingpass_end;
    } else if (status === 'Ended') {
      _timeStamp = now;
    }
    console.log(_timeStamp);
    setTimeStamp(_timeStamp);
  };

  useEffect(() => {
    getTimeStamp();
  }, [status]);

  useEffect(() => {
    if (isConnected) {
      getUserActive();
    }
  }, [isInitialized, isConnected]);

  return (
    <CoinDetailCardsBox>
      <KingstarterStatusCard
        status={status}
        currency={currency}
        timeStamp={timestamp}
        addressToken={data.token_address}
      />
      <KingpassholderCard status={status} isKing={hasKing} />
      <KingStarterContributeCard
        status={!hasKing ? 'NoKing' : status}
        minBuy={data.kingpass_min_contribution}
        maxBuy={data.kingpass_max_contribution}
        currency={data.currency}
        tokenAddress={data.token_address}
      />
    </CoinDetailCardsBox>
  );
};

const CoinDetailCardsBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  width: '100%',
  gap: '14px',
  paddingTop: '17px',
  [theme.breakpoints.down(1390)]: {
    gridTemplateColumns: 'repeat(2, 2fr)',
    '&>*:nth-of-type(1)': {
      gridColumn: '1 / 3'
    }
  },
  [theme.breakpoints.down(720)]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

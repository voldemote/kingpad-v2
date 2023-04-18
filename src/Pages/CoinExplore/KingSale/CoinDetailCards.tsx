import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { coinDataProps } from 'src/Constant/interface';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { SoftHardCard } from 'src/Components/Cards/SoftHardCard';
import { KingsaleStatusCard } from 'src/Components/Cards/KingsaleStatusCard';
import { KingSaleContributeCard } from 'src/Components/Cards/KingsaleContributeCard';
import { getMaxBuy, getMinBuy, getUserPassActive } from 'src/Contracts/kingPad';
import { UTCTimePrinter, currentTimeStamp } from 'src/Utils/utcTimePrinter';
import { CradleOfSinsProjectName } from 'src/Components/Cards/KingstarterStatusCard';

export const CoinDetailCards = (props: { data: coinDataProps }) => {
  const { data } = props;

  const [status, setStatus] = useState(''); // 1: ongoing 2: upcoming 3: ended

  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [hasKing, setHasKing] = useState(false);
  const [currency, setCurrency] = useState('BNB');
  const [timestamp, setTimeStamp] = useState(0);
  const [minBuy, setMinBuy] = useState(0);
  const [maxBuy, setMaxBuy] = useState(0);

  const getUserActive = async () => {
    if (address !== undefined) {
      const _hasKing = await getUserPassActive(address);
      setHasKing(_hasKing);
    }
  };

  const setBuyLimitValue = async () => {
    const _minBuy = await getMinBuy();
    const _maxBuy = await getMaxBuy();
    setMinBuy(_minBuy ?? 0);
    setMaxBuy(_maxBuy ?? 0);
  };

  useEffect(() => {
    getKingStarterStatus();
    getTimeStamp();
    setCurrency(data.currency ?? 'BNB');
  }, [data]);

  const getKingStarterStatus = () => {
    const now = currentTimeStamp();
    const presale_start = UTCTimePrinter(data.presale_start);
    const presale_end = UTCTimePrinter(data.presale_end);
    let _status = '';
    if (presale_start > now) {
      _status = 'Upcoming';
    }
    if (presale_start < now && presale_end > now) {
      _status = 'Ongoing';
    }
    if (presale_end < now) {
      _status = 'Ended';
    }
    setStatus(_status);
  };

  const getTimeStamp = () => {
    const now = currentTimeStamp();
    const presale_start = UTCTimePrinter(data.presale_start);
    const presale_end = UTCTimePrinter(data.presale_end);

    let _timeStamp = 0;
    if (status === 'Upcoming') {
      _timeStamp = presale_start;
    } else if (status === 'Ongoing') {
      _timeStamp = presale_end;
    } else if (status === 'Ended') {
      _timeStamp = now;
    }
    setTimeStamp(_timeStamp);
  };

  useEffect(() => {
    getTimeStamp();
  }, [status]);

  useEffect(() => {
    setBuyLimitValue();
    if (isConnected) {
      getUserActive();
    }
  }, [isInitialized, isConnected]);

  return (
    <CoinDetailCardsBox>
      <KingsaleStatusCard
        isCOS={data.project_name === CradleOfSinsProjectName}
        status={status}
        currency={currency}
        timeStamp={timestamp}
      />
      <SoftHardCard
        isCOS={data.project_name === CradleOfSinsProjectName}
        minValue={minBuy}
        maxValue={maxBuy}
        softcap={data.soft_cap}
        hardcap={data.hard_cap}
        currency={currency}
      />
      <KingSaleContributeCard
        status={status}
        minBuy={minBuy}
        maxBuy={maxBuy}
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

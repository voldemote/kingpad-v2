/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useState } from 'react';
import { Circle } from '@mui/icons-material';
import { Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { KingFilterButton } from '../Button/KingFilterButton';
import { toast } from 'react-toastify';
import { ButtonLoader } from '../Button/ButtonLoader';
import { ethers } from 'ethers';
import { finalize, getTotalDeposited } from 'src/Contracts/kingPad';
import { currentTimeStamp } from 'src/Utils/utcTimePrinter';

export const KingsaleStatusCard = (props: { isCOS: boolean; status: string; currency: string; timeStamp: number }) => {
  const { status, currency, timeStamp, isCOS } = props;
  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [raisedValue, setRaisedValue] = useState('0');
  const [isAdmin, setAdmin] = useState(false);
  const [isLoad, setLoad] = useState(false);

  const handleFinalize = async () => {
    await finalize();
  };

  const getTotalDepositValue = async () => {
    const total = await getTotalDeposited();
    if (total !== undefined) {
      setRaisedValue(total);
    }
  };

  useEffect(() => {
    getTotalDepositValue();
  }, [isConnected, isInitialized]);

  return (
    <CardBox about="Ends-In-Card">
      <CardButtonGroup>
        <KingFilterButton name="kingsale" />
        <OngoingButton>
          {status === 'Ongoing' && (
            <>
              <Circle sx={{ width: '18px', height: '18px', color: '#00FE9A' }} />
              On going
            </>
          )}
          {status === 'Upcoming' && (
            <>
              <Circle sx={{ width: '18px', height: '18px', color: '#fdac52' }} />
              Upcoming
            </>
          )}
          {status === 'Ended' && (
            <>
              <Circle sx={{ width: '18px', height: '18px', color: '#fc1e42' }} />
              Ended
            </>
          )}
        </OngoingButton>
      </CardButtonGroup>
      <RaisedContainer>
        <RaisedLabel>Raised</RaisedLabel>

        {isCOS ? (
          <RaisedValue>{`1800 ${currency}`}</RaisedValue>
        ) : (
          <RaisedValue>{status === 'Ongoing' || status === 'Ended' ? `${raisedValue} ${currency}` : '-'}</RaisedValue>
        )}
      </RaisedContainer>
      <EndInContainer>
        <CardLabel>
          {status === 'Ongoing' && 'Ends In'}
          {status === 'Upcoming' && 'Starts in'}
          {status === 'Ended' && 'Kingsale ended'}
        </CardLabel>
        {status === 'Ended' && isAdmin && (
          <Kingsale onClick={handleFinalize}>{isLoad ? <ButtonLoader /> : 'Finalize'}</Kingsale>
        )}
        {status !== 'Ended' && <CountDown timestamp={timeStamp} />}
      </EndInContainer>
    </CardBox>
  );
};

const CountDown = (props: { timestamp: number }) => {
  const { timestamp } = props;
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(timestamp));

  function getTimeLeft(timestamp: number) {
    const now = currentTimeStamp();
    if (timestamp < now) {
      timestamp = now;
    }
    const totalSeconds = timestamp === 0 ? timestamp : Math.floor((timestamp - now) / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft(timestamp));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <EndInTimeContainer>
      <EndInTime name="Days" value={timeLeft.days < 10 ? '0' + timeLeft.days : timeLeft.days} />
      <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6' }} />
      <EndInTime name="Hours" value={timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours} />
      <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6' }} />
      <EndInTime name="Minutes" value={timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes} />
      <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6' }} />
      <EndInTime name="Seconds" value={timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds} />
    </EndInTimeContainer>
  );
};

const CardBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '35px',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  gap: '20px'
}));

const CardButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2.5px'
}));

const KingStarterButton = styled(Button)(({ theme }) => ({
  fontSize: '12px',
  borderRadius: '20px',
  textTransform: 'uppercase',
  height: '27px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2px',
  backgroundColor: '#8462F6',
  color: '#FFFFFF',
  fontFamily: 'gotham-book',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down(370)]: {
    fontSize: '10px'
  }
}));

const OngoingButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  color: theme.palette.primary.contrastText,
  fontFamily: 'gotham-bold',
  fontSize: '13px',
  height: '27px',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  textTransform: 'none',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  border: `1px solid ${theme.palette.primary.contrastText}`,
  [theme.breakpoints.down(370)]: {
    fontSize: '9px'
  }
}));

const EndInTimeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
  paddingTop: '18px',
  color: '#8462F6',
  [theme.breakpoints.down('sm')]: {
    gap: '9px'
  }
}));

const EndInTime = (props: EndInTimeProps) => {
  return (
    <EndInTimeWrapper>
      <EndInTimeValue>{props.value}</EndInTimeValue>
      <EndInTimeName>{props.name}</EndInTimeName>
    </EndInTimeWrapper>
  );
};

interface EndInTimeProps {
  name: string;
  value: number | string;
}

const EndInTimeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const EndInTimeValue = styled(Box)(({ theme }) => ({
  fontSize: '26px',
  color: theme.palette.primary.contrastText,
  fontWeight: '600',
  letterSpacing: '-0.26px',
  lineHeight: '25px'
}));

const EndInTimeName = styled(Box)(({ theme }) => ({
  fontSize: '8px',
  color: '#8462F6',
  textTransform: 'uppercase'
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontWeight: '600'
}));

const RaisedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px'
}));

const RaisedLabel = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const RaisedValue = styled(Box)(({ theme }) => ({
  fontSize: '25px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));

const EndInContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
}));

const Kingsale = styled(Box)(({ theme }) => ({
  fontSize: '19px',
  color: theme.palette.dark.contrastText,
  fontFamily: 'gotham-bold'
}));

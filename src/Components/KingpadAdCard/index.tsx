/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useState, useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { KingpadAdBackground, KingpadAdLogo } from 'src/Config/Images';
import { getAdCardId, getProjectDetailsById } from 'src/Contracts';
import { useNavigate } from 'react-router-dom';
import { coinDataProps } from 'src/Constant/interface';

export const KingpadAdCard = () => {
  const [adId, setAdId] = useState(-1);
  const [timestamp, setTimestamp] = useState(0);
  const [project, setProject] = useState<coinDataProps>();
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const getKingpadAdCard = async () => {
    const id = await getAdCardId();
    const _project: coinDataProps = await getProjectDetailsById(id);
    setProject(_project);
    getKingStarterStatus(_project);
    // getTimeStamp(_project);
    setAdId(id);
  };

  const getKingStarterStatus = (data: coinDataProps) => {
    const now = new Date(Date.now()).getTime();
    const kingpass_start = new Date(data.kingpass_start).getTime();
    const presale_start = new Date(data.presale_start).getTime();
    const presale_end = new Date(data.presale_end).getTime();
    let _status = '';
    if (kingpass_start > now) {
      _status = 'Upcoming';
    }
    if (kingpass_start < now) {
      _status = 'KingStarter';
    }
    if (presale_start < now && presale_end < now) {
      _status = 'KingSale';
    }
    if (presale_end < now) {
      _status = 'Ended';
    }
    setStatus(_status);
  };

  const getTimeStamp = (data: coinDataProps) => {
    const kingpass_start = new Date(data.kingpass_start).getTime();
    let _timeStamp = 0;
    if (status === 'Upcoming') {
      _timeStamp = kingpass_start;
    }
    setTimestamp(_timeStamp);
  };

  useEffect(() => {
    getKingpadAdCard();
  }, []);

  useEffect(() => {
    if (project !== undefined) {
      getTimeStamp(project);
    }
  }, [status]);

  return (
    <KingpadAdCardContainer>
      <KingpadAdImage src={KingpadAdBackground} alt="kingpad-ad-image" />
      <KingpadAdContent>
        <AdContentTitle>Don’t miss the upcoming launch on Kingpad</AdContentTitle>
        {/* <AdContentImage src={KingpadAdLogo} alt="ad-image" /> */}
        <EndInContainer>
          <CardLabel>Starts in</CardLabel>
          <CountDown timestamp={timestamp} />
        </EndInContainer>
        <TokenExplorer
          // onClick={() => navigate(`/${status === 'KingSale' ? 'kingsale-explore' : 'kingstarter-explore'}?id=${adId}`)}
          onClick={() => navigate(`/${status === 'KingSale' ? 'kingsale-explore' : 'kingstarter-explore'}?id=1`)}
        >
          Explore
        </TokenExplorer>
      </KingpadAdContent>
    </KingpadAdCardContainer>
  );
};

const CountDown = (props: { timestamp: number }) => {
  const { timestamp } = props;
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(timestamp));

  function getTimeLeft(timestamp: number) {
    if (timestamp < Date.now()) {
      timestamp = Date.now();
    }
    const totalSeconds = timestamp === 0 ? timestamp : Math.floor((timestamp - Date.now()) / 1000);
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
      <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6', height: '35px' }} />
      <EndInTime name="Hours" value={timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours} />
      <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6', height: '35px' }} />
      <EndInTime name="Minutes" value={timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes} />
      <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6', height: '35px' }} />
      <EndInTime name="Seconds" value={timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds} />
    </EndInTimeContainer>
  );
};

const KingpadAdCardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#1E0041 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  marginTop: '17px',
  display: 'flex',
  [theme.breakpoints.down(860)]: {
    flexDirection: 'column'
  }
}));

const KingpadAdImage = styled('img')(({ theme }) => ({
  width: '50%',
  background: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  objectFit: 'cover',
  borderRadius: '15px 0 0 15px',
  [theme.breakpoints.down(860)]: {
    width: '100%',
    height: '300px',
    borderRadius: '15px 15px 0px 0px'
  }
}));

const KingpadAdContent = styled(Box)(({ theme }) => ({
  width: '50%',
  //   height: '408px',
  padding: '41px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '25px',
  justifyContent: 'space-between',
  [theme.breakpoints.down(860)]: {
    width: '100%',
    // height: '350px',
    padding: '20px',
    gap: '30px'
  }
}));

const AdContentTitle = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF',
  textAlign: 'center',
  width: '410px',
  [theme.breakpoints.down(1396)]: {
    fontSize: '24px',
    width: '320px'
  },
  [theme.breakpoints.down(1260)]: {
    fontSize: '22px'
  },
  [theme.breakpoints.down(350)]: {
    width: '270px'
  }
}));

const AdContentImage = styled('img')(({ theme }) => ({
  width: '110px',
  height: '62px'
}));

const EndInContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontWeight: '600'
}));

const EndInTimeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
  paddingTop: '18px',
  color: '#8462F6',
  [theme.breakpoints.down('sm')]: {
    gap: '12px'
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
  value: number | string | undefined;
}

const EndInTimeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const EndInTimeValue = styled(Box)(({ theme }) => ({
  fontSize: '26px',
  color: '#FFFFFF',
  fontWeight: '600',
  letterSpacing: '-0.26px',
  lineHeight: '25px'
}));

const EndInTimeName = styled(Box)(({ theme }) => ({
  fontSize: '8px',
  color: '#8462F6',
  textTransform: 'uppercase'
}));

const TokenExplorer = styled(Button)(({ theme }) => ({
  width: '84px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '19px',
  backgroundColor: '#8462F6',
  color: '#FFFFFF',
  textTransform: 'none',
  '&.MuiButtonBase-root:hover': {
    backgroundColor: '#8462F6'
  }
}));

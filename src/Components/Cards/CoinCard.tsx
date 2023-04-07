/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useState, useEffect } from 'react';
import { Language, Twitter, Telegram, YouTube, Instagram } from '@mui/icons-material';
import { FaFacebookF, FaDiscord } from 'react-icons/fa';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { CircularProgressBar } from '../Progress/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { CoinCardProps } from 'src/Constant/interface';
import { KingFilterButton } from '../Button/KingFilterButton';
import { StatusFilterButton } from '../Button/StatusFilterButton';
import { CoinStatusOnlyIcon } from '../CoinStatus';
import { RaisedCircle } from '../Progress/RaisedCircle';
import { useWeb3Store } from 'src/Context/Web3Context';
import { ethers } from 'ethers';
import { getTotalDeposited } from 'src/Contracts/kingPad';

// status 1: upcoming, 2: ongong, 3: ended

export const CoinCard = (props: CoinCardProps) => {
  const {
    id,
    isKingStarter,
    status,
    token_address,
    coinImg,
    coinName,
    softCap,
    hardCap,
    time,
    website,
    twitter,
    telegram,
    youtube,
    discord,
    facebook
  } = props;

  const navigate = useNavigate();

  const [totalContribution, setTotalContribution] = useState(0);
  const { isConnected, isInitialized } = useWeb3Store();
  const [raisedValue, setRaisedValue] = useState(0);

  const getTotalDepositValue = async () => {
    const total = await getTotalDeposited();
    if (total !== undefined) {
      setTotalContribution(total);
      setRaisedValue(total);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getTotalDepositValue();
    }
  }, [isConnected, isInitialized]);

  return (
    <CardContainer>
      <StatusContainer>
        <KingStatus>
          {isKingStarter ? (
            <KingFilterButton name="kingstarter" />
          ) : (
            <KingFilterButton name="kingsale" isDisabled={true} isOpacity={false} />
          )}
          {status === 'Upcoming' && <StatusFilterButton name="Upcoming" color="#FFB060" />}
          {/* {status === 'KingStarter' && <StatusFilterButton name="KingStarter" color="#00FE9A " />}
          {status === 'KingSale' && <StatusFilterButton name="KingSale" color="#00FE9A " />} */}
          {status === 'Ongoing' && <StatusFilterButton name="Ongoing" color="#00FE9A " />}
          {status === 'Ended' && <StatusFilterButton name="Ended" color="#FF4056" />}
        </KingStatus>
        <CoinStatusOnlyIcon projectId={id} />
      </StatusContainer>
      <TokenInfo>
        <TokenLogo>
          <Img src={coinImg} alt="coin-image" />
        </TokenLogo>
        <TokenDetails>
          <TokenName>{coinName}</TokenName>
          <TokenLinks>
            <TokenLink href={website} rel="noopener noreferrer" target="_blank">
              <Language sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href={twitter} rel="noopener noreferrer" target="_blank">
              <Twitter sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href={telegram} rel="noopener noreferrer" target="_blank">
              <Telegram sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href={youtube} rel="noopener noreferrer" target="_blank">
              <YouTube sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href={discord} rel="noopener noreferrer" target="_blank">
              <FaDiscord style={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href={facebook} rel="noopener noreferrer" target="_blank">
              <FaFacebookF style={{ width: '14px', height: '14px' }} />
            </TokenLink>
          </TokenLinks>
        </TokenDetails>
      </TokenInfo>
      <TokenProgress>
        <TokenProgressGraph>
          {isKingStarter ? (
            <RaisedCircle raised={parseFloat(raisedValue.toString())} />
          ) : (
            <CircularProgressBar percentage={parseFloat(((totalContribution / hardCap) * 100).toFixed(1))} />
          )}
        </TokenProgressGraph>
        {!isKingStarter && (
          <CapContainer>
            <ShowCap isSoft={true} value={softCap ?? 0} />
            <ShowCap isSoft={false} value={hardCap ?? 0} />
          </CapContainer>
        )}
      </TokenProgress>
      <TokenAction>
        <TokenLaunch>
          {status === 'Upcoming' ? (
            <TokenLaunchTitle>Sale starts in</TokenLaunchTitle>
          ) : status === 'Ongoing' ? (
            <TokenLaunchTitle>Sale ends in</TokenLaunchTitle>
          ) : (
            <TokenLaunchTitle>Sale ended</TokenLaunchTitle>
          )}
          {time != null ? <CountDown timestamp={time} /> : '-'}
        </TokenLaunch>
        {isKingStarter ? (
          <TokenExplorer onClick={() => navigate(`/kingstarter-explore?id=${id}`)}>Explore</TokenExplorer>
        ) : (
          <TokenExplorer onClick={() => navigate(`/kingsale-explore?id=${id}`)}>Explore</TokenExplorer>
        )}
      </TokenAction>
    </CardContainer>
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

  const days = timeLeft.days < 10 ? '0' + timeLeft.days : timeLeft.days;
  const hours = timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours;
  const minutes = timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes;
  const seconds = timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds;

  return <TokenLaunchTime>{days + ':' + hours + ':' + minutes + ':' + seconds}</TokenLaunchTime>;
};

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  padding: '22px 25px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  maxWidth: '390px',
  [theme.breakpoints.down('desktop')]: {
    padding: '15px'
  },
  [theme.breakpoints.down(840)]: {
    maxWidth: '340px'
  }
}));

const StatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '30px',
  height: '70px',
  [theme.breakpoints.down(840)]: {
    gap: '15px'
  },
  [theme.breakpoints.down(385)]: {
    flexDirection: 'column',
    gap: '15px'
  }
}));

const TokenInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '9px',
  alignItems: 'center'
}));

const TokenLogo = styled(Box)(({ theme }) => ({
  width: '87px',
  height: '87px',
  backgroundColor: '#00AEF0',
  borderRadius: '50%'
}));

const TokenDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
}));

const TokenName = styled(Box)(({ theme }) => ({
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  fontSize: '20px'
}));

const TokenLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  flexWrap: 'wrap'
}));

const TokenLink = styled('a')(({ theme }) => ({
  color: '#8462F6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const TokenProgress = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '70px',
  [theme.breakpoints.down(390)]: {
    gap: '30px'
  }
}));

const TokenProgressGraph = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '180px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}));

const TokenAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const TokenLaunch = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}));

const TokenLaunchTitle = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const TokenLaunchTime = styled(Box)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.dark.contrastText,
  fontFamily: 'gotham-bold'
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

const KingStatus = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4.5px'
}));

const CapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
}));

const ShowCap = (props: { isSoft: boolean; value: number }) => {
  const { isSoft, value } = props;

  return (
    <ShowCapContainer>
      <ShowCapText>{isSoft ? 'Soft Cap' : 'Hard Cap'}</ShowCapText>
      <ShowCapValue>{value}</ShowCapValue>
      <BNBText>BNB</BNBText>
    </ShowCapContainer>
  );
};

const ShowCapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const ShowCapText = styled(Box)(({ theme }) => ({
  color: '#8462F6',
  fontSize: '12px'
}));

const ShowCapValue = styled(Box)(({ theme }) => ({
  fontFamily: 'gotham-bold',
  fontSize: '30px'
}));

const BNBText = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  fontFamily: 'gotham-bold'
}));

const Img = styled('img')(({ theme }) => ({
  width: '87px',
  height: '87px',
  borderRadius: '50%'
}));

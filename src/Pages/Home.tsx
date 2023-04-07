import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { KingFilterButton } from 'src/Components/Button/KingFilterButton';
import { StatusFilterButton } from 'src/Components/Button/StatusFilterButton';
import { CoinCard } from 'src/Components/Cards/CoinCard';
import { KingpadCard } from 'src/Components/Cards/KingpadCard';
import { SafePlaceCard } from 'src/Components/Cards/SafePlaceCard';
import { KingpadAdCard } from 'src/Components/KingpadAdCard';
import { KingLogoIcon, HelmetIcon } from 'src/Config/Images';
import { coinCardData } from 'src/Constant/arrayData';
import { CoinCardProps } from 'src/Constant/interface';
import { useStore } from 'src/Context/StoreContext';

export const Home = () => {
  const [tabs, setTabs] = useState('all');
  const [isKingStarter, setKingStarter] = useState(true);
  const { setPage } = useStore();
  const params = new URLSearchParams(window.location.search);
  const [kingData, setKingData] = useState<CoinCardProps[]>();
  const location = useLocation();

  const filterRef = useRef<HTMLDivElement>(null);

  const getKingData = async () => {
    const data = await coinCardData();
    console.log({ data });
    setKingData(data);
  };

  useEffect(() => {
    setPage(0);
    getKingData();
  }, []);

  const filterData =
    tabs !== 'all'
      ? kingData?.filter((item) => item.isKingStarter === isKingStarter && item.status === tabs)
      : kingData?.filter((item) => (isKingStarter ? item.isKingStarter : !item.isKingStarter));

  useEffect(() => {
    if (params.get('kingstarter') !== null) {
      if (filterRef.current !== null) {
        filterRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      if (params.get('kingstarter') === 'true') {
        setKingStarter(true);
      } else {
        setKingStarter(false);
      }
    }
  }, [filterRef, location]);

  return (
    <>
      <SafePlaceCard />
      <KingpadCards>
        <KingpadCard
          title="Driven by $KING"
          content="Kingpad is one of the branches of King Finance, allowing our currency King to keep its deflationary nature."
          btnTitle="Discover"
          link="https://kingworld.finance"
          icon={KingLogoIcon}
        />
        <KingpadCard
          title="Want to launch on KingPad?"
          content="Make sure to go through our vetting processes if you wish to launch with us."
          btnTitle="Apply now"
          link="mailto:info@kingpad.finance"
          icon={HelmetIcon}
        />
      </KingpadCards>
      <KingpadAdCard />
      <CoinCardFilter id="filter" ref={filterRef}>
        <KingFilter>
          <KingFilterButton name="kingstarter" onClick={() => setKingStarter(true)} isDisabled={!isKingStarter} />
          <KingFilterButton name="kingsale" onClick={() => setKingStarter(false)} isDisabled={isKingStarter} />
        </KingFilter>
        <StatusFilter>
          <StatusFilterButton name="All" onClick={() => setTabs('all')} isDisabled={tabs !== 'all'} />
          <StatusFilterButton
            name="Upcoming"
            color="#FFB060"
            onClick={() => setTabs('Upcoming')}
            isDisabled={tabs !== 'Upcoming'}
          />
          <StatusFilterButton
            name="On going"
            color="#00FE9A"
            onClick={() => setTabs('Ongoing')}
            isDisabled={tabs !== 'Ongoing'}
          />
          <StatusFilterButton
            name="Ended"
            color="#FF4056"
            onClick={() => setTabs('Ended')}
            isDisabled={tabs !== 'Ended'}
          />
        </StatusFilter>
      </CoinCardFilter>
      <CoinCards>
        {filterData?.map((card: CoinCardProps) => (
          <CoinCard
            isKingStarter={card.isKingStarter}
            status={card.status}
            token_address={card.token_address}
            coinImg={card.coinImg}
            coinName={card.coinName}
            softCap={card.softCap}
            hardCap={card.hardCap}
            time={card.time}
            website={card.website}
            twitter={card.twitter}
            telegram={card.telegram}
            youtube={card.youtube}
            discord={card.discord}
            facebook={card.facebook}
            key={card.id}
            id={card.id}
          />
        ))}
      </CoinCards>
      <CardActions>
        <ShowmoreButton variant="outlined">Show more</ShowmoreButton>
      </CardActions>
    </>
  );
};

const KingpadCards = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: '14px',
  marginTop: '17px',
  [theme.breakpoints.down('mobile')]: {
    gridTemplateColumns: 'auto'
  }
}));

const CoinCardFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '23px',
  margin: '17px 0',
  padding: '8px',
  [theme.breakpoints.down(1120)]: {
    padding: '0px',
    gap: '5px'
  },
  [theme.breakpoints.down(768)]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '15px',
    gap: '16px'
  }
}));

const CardTab = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontFamily: 'gotham-bold',
  fontSize: '16px',
  cursor: 'pointer',

  [theme.breakpoints.down('ls')]: {
    fontSize: '14px'
  }
}));

const CoinCards = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '12px',
  [theme.breakpoints.down(1470)]: {
    gridTemplateColumns: 'auto auto'
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'auto',
    justifyContent: 'center'
  }
}));

const CardActions = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  margin: '50px 0'
}));

const ShowmoreButton = styled(Button)(({ theme }) => ({
  borderRadius: '19px',
  width: '155px',
  height: '40px',
  // display: 'flex',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',
  fontSize: '15px',
  fontFamily: 'gotham-bold',
  color: theme.palette.secondary.contrastText,
  borderColor: theme.palette.secondary.contrastText,
  '&:hover': {
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.contrastText
  },
  [theme.breakpoints.down('md')]: {
    width: '120px',
    height: '30px',
    fontSize: '13px'
  }
}));

const KingFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5.5px'
}));

const StatusFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5.5px',
  [theme.breakpoints.down(460)]: {
    display: 'grid',
    gridTemplateColumns: 'auto auto'
  }
}));

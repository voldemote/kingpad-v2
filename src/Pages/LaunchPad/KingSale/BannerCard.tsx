import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { KingStarterImg, KingSaleSvg } from 'src/Config/Images';

export const BannerCard = () => {
  return (
    <BannerCardContainer>
      <BannerCardWrapper>
        <BannerCardTitle>
          <PrimaryTitle>Welcome to</PrimaryTitle>
          <SecondaryTitle>
            <BannerCardIcon src={KingSaleSvg} alt="bannercard-icon" />
            <span>King</span>
            Sale
          </SecondaryTitle>
        </BannerCardTitle>
        <BannerCardImg src={KingStarterImg} alt="bannercard-image" />
        <BannerCardDetail>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </BannerCardDetail>
      </BannerCardWrapper>
    </BannerCardContainer>
  );
};
const BannerCardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '264px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  backgroundColor: '#1A003E',
  color: '#FFFFFF',
  fontFamily: 'gotham-bold',
  fontSize: '30px',
  [theme.breakpoints.down(768)]: {
    height: 'auto'
  }
}));

const BannerCardWrapper = styled(Box)(({ theme }) => ({
  padding: '16px 45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down(768)]: {
    flexDirection: 'column'
  }
}));

const BannerCardIcon = styled('img')(({ theme }) => ({
  width: 'auto',
  height: '26px',
  marginTop:'auto',
  marginBottom:'auto',
  [theme.breakpoints.down(1390)]: {
    height: '31px'
  },
  [theme.breakpoints.down(1270)]: {
    height: '26px'
  },
  [theme.breakpoints.down(768)]: {
    height: '36px'
  },
  [theme.breakpoints.down(510)]: {
    height: '26px'
  }
}));

const BannerCardTitle = styled(Box)(({ theme }) => ({
  width: '261px',
  textAlign: 'left',
  [theme.breakpoints.down(1024)]: {
    width: '220px'
  },
  [theme.breakpoints.down(768)]: {
    textAlign: 'center',
    width: 'auto',
    paddingTop: '30px'
  }
}));

const PrimaryTitle = styled(Box)(({ theme }) => ({
  fontFamily: 'gotham-bold',
  fontSize: '31px',
  [theme.breakpoints.down(1390)]: {
    fontSize: '26px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '22px'
  },
  [theme.breakpoints.down(1024)]: {
    fontSize: '31px'
  },
  [theme.breakpoints.down(510)]: {
    fontSize: '26px'
  }
}));

const SecondaryTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  textTransform: 'uppercase',
  fontFamily: 'gotham-book',
  fontSize: '36px',
  '& span': {
    fontFamily: 'gotham-bold'
  },
  [theme.breakpoints.down(1390)]: {
    fontSize: '31px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '26px'
  },
  [theme.breakpoints.down(768)]: {
    fontSize: '36px'
  },
  [theme.breakpoints.down(510)]: {
    fontSize: '26px'
  }
}));

const BannerCardImg = styled('img')(({ theme }) => ({
  width: '304px',
  height: 'auto',
  [theme.breakpoints.down(1390)]: {
    width: '260px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '220px'
  },
  [theme.breakpoints.down(768)]: {
    width: '242px'
  }
}));

const BannerCardDetail = styled(Box)(({ theme }) => ({
  fontSize: '11px',
  maxWidth: '274px',
  textAlign: 'left',
  fontFamily: 'gotham-book',
  [theme.breakpoints.down(1270)]: {
    maxWidth: '294px'
  },
  [theme.breakpoints.down(1150)]: {
    fontSize: '10px'
  },
  [theme.breakpoints.down(1024)]: {
    fontSize: '11px'
  },
  [theme.breakpoints.down(900)]: {
    fontSize: '10px'
  },
  [theme.breakpoints.down(768)]: {
    fontSize: '12px',
    paddingTop: '28px',
    paddingBottom: '40px',
    maxWidth: '350px'
  },
  [theme.breakpoints.down(510)]: {
    fontSize: '11px',
    maxWidth: '274px'
  }
}));

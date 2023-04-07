import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { AuditImage, KingpadSvg, CertikSvg } from 'src/Config/Images';

export const BannerCard = () => {
  return (
    <BannerCardContainer>
      <BannerCardWrapper>
        <BannerCardImg src={AuditImage} alt="bannercard-image" />
        <BannerLogos>
          <BannerLogo src={KingpadSvg} alt="kingpad-logo" />
          <Mutiplied>X</Mutiplied>
          <BannerLogo src={CertikSvg} alt="assure-logo" />
        </BannerLogos>
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
  position: 'relative',
  [theme.breakpoints.down(768)]: {
    height: '350px',
    alignItems: 'flex-start'
  },
  [theme.breakpoints.down(500)]: {
    height: '320px',
    alignItems: 'flex-start'
  }
}));

const BannerCardWrapper = styled(Box)(({ theme }) => ({
  padding: '40px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down(768)]: {
    flexDirection: 'column-reverse'
  }
}));

const BannerCardImg = styled('img')(({ theme }) => ({
  width: '450px',
  height: 'auto',
  [theme.breakpoints.down(1320)]: {
    width: '380px'
  },
  [theme.breakpoints.down(768)]: {
    position: 'absolute',
    bottom: '-50px'
  },
  [theme.breakpoints.down(500)]: {
    width: '320px'
  }
}));

const BannerLogos = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '45px',
  width: '450px',
  [theme.breakpoints.down(1450)]: {
    width: '400px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '300px',
    gap: '45px'
  },
  [theme.breakpoints.down(768)]: {
    width: 'auto'
  },
  [theme.breakpoints.down(500)]: {
    gap: '30px'
  }
}));

const BannerLogo = styled('img')(({ theme }) => ({
  width: '90px',
  height: 'auto',
  [theme.breakpoints.down(1270)]: {
    width: '75px'
  },
  [theme.breakpoints.down(768)]: {
    width: '90px'
  },
  [theme.breakpoints.down(500)]: {
    width: '75px'
  }
}));

const Mutiplied = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  color: '#ffffff',
  fontFamily: 'gotham-book'
}));

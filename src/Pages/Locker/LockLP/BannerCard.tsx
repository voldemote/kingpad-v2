import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { KingLockPng } from 'src/Config/Images';
import { LockOutlined } from '@mui/icons-material';

export const BannerCard = () => {
  return (
    <BannerCardContainer>
      <BannerCardWrapper>
        <BannerCardTitle>
          <PrimaryTitle>Welcome to</PrimaryTitle>
          <SecondaryTitle>
            <span>King</span>
            Locker
          </SecondaryTitle>
        </BannerCardTitle>
        <BannerCardImg src={KingLockPng} alt="bannercard-image" />
        <MobileLock>
          <LockOutlined sx={{ width: '45px', height: 'auto', color: '#FFFFFF' }} />
          <CreateLockButton>Create Lock</CreateLockButton>
        </MobileLock>
      </BannerCardWrapper>
      <BannerCardLock>
        <LockOutlined sx={{ width: '45px', height: 'auto', color: '#FFFFFF' }} />
        <CreateLockButton>Create Lock</CreateLockButton>
      </BannerCardLock>
    </BannerCardContainer>
  );
};
const BannerCardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '264px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '14px',
  color: '#FFFFFF',
  fontFamily: 'gotham-bold',
  fontSize: '30px',
  [theme.breakpoints.down(1450)]: {
    height: '240px'
  },
  [theme.breakpoints.down(1390)]: {
    height: '210px'
  },
  [theme.breakpoints.down(1024)]: {
    height: '240px'
  },
  [theme.breakpoints.down(840)]: {
    height: '210px'
  },
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
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  backgroundColor: '#1A003E',
  height: '100%',
  [theme.breakpoints.down(1080)]: {
    padding: '16px 24px'
  },
  [theme.breakpoints.down(768)]: {
    flexDirection: 'column',
    gap: '25px'
  }
}));

const BannerCardLock = styled(Box)(({ theme }) => ({
  boxShadow: '0px 3px 6px #00000029',
  backgroundColor: '#1A003E',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '22px',
  width: '241px',
  minWidth: '241px',
  padding: '16px 45px',
  height: '100%',
  [theme.breakpoints.down(1200)]: {
    width: '200px',
    minWidth: '200px',
    padding: '16px 24px'
  },
  [theme.breakpoints.down(1040)]: {
    width: '180px',
    minWidth: '180px',
    padding: '16px 24px'
  },
  [theme.breakpoints.down(1024)]: {
    width: '200px',
    minWidth: '200px',
    padding: '16px 24px'
  },
  [theme.breakpoints.down(768)]: {
    display: 'none'
  }
}));

const BannerCardTitle = styled(Box)(({ theme }) => ({
  width: '261px',
  textAlign: 'left',
  [theme.breakpoints.down(1340)]: {
    width: '220px'
  },
  [theme.breakpoints.down(1250)]: {
    width: '180px'
  },
  [theme.breakpoints.down(1024)]: {
    width: '220px'
  },
  [theme.breakpoints.down(840)]: {
    width: '180px'
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
    fontSize: '26px'
  }
}));

const SecondaryTitle = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down(1024)]: {
    fontSize: '31px'
  },
  [theme.breakpoints.down(840)]: {
    fontSize: '26px'
  },
  [theme.breakpoints.down(768)]: {
    fontSize: '36px'
  }
}));

const BannerCardImg = styled('img')(({ theme }) => ({
  width: '400px',
  height: 'auto',
  [theme.breakpoints.down(1450)]: {
    width: '350px'
  },
  [theme.breakpoints.down(1390)]: {
    width: '300px'
  },
  [theme.breakpoints.down(1300)]: {
    width: '240px'
  },
  [theme.breakpoints.down(1024)]: {
    width: '350px'
  },
  [theme.breakpoints.down(940)]: {
    width: '300px'
  },
  [theme.breakpoints.down(840)]: {
    width: '240px'
  },
  [theme.breakpoints.down(768)]: {
    width: '251px'
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

const CreateLockButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '32px',
  backgroundColor: '#8462F6',
  color: '#FFFFFF',
  textTransform: 'none',
  fontFamily: 'gotham-bold',
  fontSize: '15px',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down(768)]: {
    width: '142px'
  }
}));

const MobileLock = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '22px',
  [theme.breakpoints.down(768)]: {
    display: 'flex'
  }
}));

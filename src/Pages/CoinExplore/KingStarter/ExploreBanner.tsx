/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Language, Twitter, Telegram, YouTube } from '@mui/icons-material';
import { FaDiscord } from 'react-icons/fa';
import { CoinStatus } from 'src/Components/CoinStatus';
import { coinDataProps } from 'src/Constant/interface';

export const ExploreBanner = (props: { data?: coinDataProps; projectId: number }) => {
  const { data, projectId } = props;
  return (
    <ExploreBannerContainer>
      <BannerImg>
        <Img src={data?.cover_image} alt="banner-img" />
      </BannerImg>
      <CoinDetail>
        <CoinImg src={data?.logo} alt="coin-image" />
        <CoinInfoContainer>
          <CoinInfo>
            <CoinName>{data?.name}</CoinName>
            <CoinLinks>
              <CoinLink href={data?.website} rel="noopener noreferrer" target={'_blank'}>
                <Language sx={{ width: '100%', height: '100%' }} />
              </CoinLink>
              <CoinLink href={data?.twitter} rel="noopener noreferrer" target={'_blank'}>
                <Twitter sx={{ width: '100%', height: '100%' }} />
              </CoinLink>
              <CoinLink href={data?.telegram} rel="noopener noreferrer" target={'_blank'}>
                <Telegram sx={{ width: '100%', height: '100%' }} />
              </CoinLink>
              <CoinLink href={data?.youtube} rel="noopener noreferrer" target={'_blank'}>
                <YouTube sx={{ width: '100%', height: '100%' }} />
              </CoinLink>
              <CoinLink href={data?.discord} rel="noopener noreferrer" target={'_blank'}>
                <FaDiscord style={{ width: '100%', height: '100%' }} />
              </CoinLink>
            </CoinLinks>
          </CoinInfo>
          <CoinStatus isMobile={false} projectId={projectId} />
        </CoinInfoContainer>
      </CoinDetail>
    </ExploreBannerContainer>
  );
};

const ExploreBannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '307px',
  [theme.breakpoints.down('tablet')]: {
    height: '190px'
  }
}));

const BannerImg = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '237px',
  backgroundColor: '#1A003E',
  color: '#1A003E',
  borderRadius: '15px',
  boxShadow: '0px 3px 6px #00000029',
  [theme.breakpoints.down('tablet')]: {
    height: '142px'
  }
}));

const CoinDetail = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '26px',
  width: '100%',
  paddingLeft: '30px',
  position: 'absolute',
  bottom: '0',
  [theme.breakpoints.down('tablet')]: {
    paddingLeft: '10px'
  }
}));

const CoinInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '300px',
  flexDirection: 'column',
  gap: '4px',
  [theme.breakpoints.down(1280)]: {
    width: '180px'
  }
}));

const CoinImg = styled('img')(({ theme }) => ({
  width: '158px',
  minWidth: '158px',
  minHeight: '158px',
  height: '158px',
  borderRadius: '50%',
  boxShadow: '0px 3px 6px #00000029',
  border: `8px solid ${theme.palette.success.main}`,
  color: '#00AEEF',
  backgroundColor: '#00AEEF',
  [theme.breakpoints.down(1076)]: {
    width: '125px',
    minWidth: '125px',
    minHeight: '125px',
    height: '125px'
  },
  [theme.breakpoints.down(350)]: {
    width: '93px',
    minWidth: '93px',
    minHeight: '93px',
    height: '93px'
  }
}));

const CoinName = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down(1280)]: {
    fontSize: '24px'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '24px'
  },
  [theme.breakpoints.down('tablet')]: {
    fontSize: '17px'
  }
}));

const CoinLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  paddingRight: '20px'
}));

const CoinLink = styled('a')(({ theme }) => ({
  color: '#8462F6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  cursor: 'pointer'
  // [theme.breakpoints.down('md')]: {
  //   width: '20px',
  //   height: '20px'
  // },
  // [theme.breakpoints.down('tablet')]: {
  //   width: '15px',
  //   height: '15px'
  // }
}));

const CoinInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
}));

const CoinStatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '450px',
  flexWrap: 'wrap',
  gap: '15px',
  [theme.breakpoints.down(1280)]: {
    width: '275px'
  },
  [theme.breakpoints.down(768)]: {
    display: 'none'
  }
}));

const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '15px'
}));

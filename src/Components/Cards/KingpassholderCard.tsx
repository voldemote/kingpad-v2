import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { MenuKingPass } from 'src/Config/Images';

export const KingpassholderCard = (props: { status: string; isKing: boolean }) => {
  const { status, isKing } = props;
  return (
    <KingpassholderCardContainer status={status}>
      <KingpassLogo src={MenuKingPass} alt="kingpass-logo" />
      <PrimaryLabel>
        {!isKing && status === 'Ongoing' && 'Sorry you need a Kingpass'}
        {isKing && status === 'Ongoing' && 'Congratulations!'}
        {status === 'Upcoming' && 'This sale will start soon'}
        {status === 'Ended' && 'This sale is ended'}
      </PrimaryLabel>
      <SecondaryLabel>
        {!isKing && status === 'Ongoing' && 'To be eligible to join this sale you have to be a Kingpass holder'}
        {isKing && status === 'Ongoing' && 'You are a Kingpass holder and you are eligible to join this sale'}
        {status === 'Upcoming' && 'Remember that only Kingpass holders can join this sale. Do you have yours?'}
        {status === 'Ended' && "Don't miss next sales on kingpad and be sure to have a kingpass to join it"}
      </SecondaryLabel>
      {!isKing && status === 'Ongoing' && (
        <Discover onClick={() => window.open('https://kingpass.finance')}>Discover</Discover>
      )}
      {status === 'Upcoming' && <Discover onClick={() => window.open('https://kingpass.finance')}>Discover</Discover>}
      {status === 'Ended' && <Discover onClick={() => window.open('https://kingpass.finance')}>Discover</Discover>}
    </KingpassholderCardContainer>
  );
};

const KingpassholderCardContainer = styled(Box)<{ status: string }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  flexDirection: 'column',
  justifyContent: status !== 'Upcoming' ? 'space-between' : 'normal',
  padding: '35px',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px'
}));

const KingpassLogo = styled('img')(({ theme }) => ({
  width: '72px',
  height: 'auto'
}));

const PrimaryLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  textAlign: 'center',
  lineHeight: '35px',
  [theme.breakpoints.down(1480)]: {
    fontSize: '25px'
  },
  [theme.breakpoints.down(370)]: {
    fontSize: '20px'
  }
}));

const SecondaryLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '15px',
  textAlign: 'center',
  width: '310px',
  fontFamily: 'gotham-bold',
  [theme.breakpoints.down(370)]: {
    fontSize: '13px',
    width: '240px'
  }
}));

const Discover = styled(Button)(({ theme }) => ({
  borderRadius: '32px',
  fontSize: '15px',
  backgroundColor: '#8462F6',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  }
}));

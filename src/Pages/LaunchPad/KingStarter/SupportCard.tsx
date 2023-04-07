import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { MenuKingPass } from 'src/Config/Images';

interface supportcardProps {
  totalSupply: string;
}

export const SupportCard = (props: supportcardProps) => {
  return (
    <SupportCardContainer>
      <NeedSupportCard>
        Need support?
        <ContactButton>Contact us</ContactButton>
      </NeedSupportCard>
      <ActivePassCard>
        Active Kingpass
        <KingPassPart>
          <KingPassImg src={MenuKingPass} alt="kingpass-img" />
          <KingpassNumber>{props.totalSupply}</KingpassNumber>
        </KingPassPart>
      </ActivePassCard>
    </SupportCardContainer>
  );
};

const SupportCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  color: '#FFFFFF',
  gap: '12px'
}));

const NeedSupportCard = styled(Box)(({ theme }) => ({
  background: '#1A003E 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  minHeight: '208px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down(720)]: {
    minHeight: '166px'
  }
}));

const ContactButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  fontSize: '14px',
  backgroundColor: '#8462F6',
  color: '#FFF',
  padding: '10px 15px',
  height: '36px',
  width: '104px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#8462F6'
  }
}));

const ActivePassCard = styled(Box)(({ theme }) => ({
  background: '#1A003E 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '50px',
  [theme.breakpoints.down(720)]: {
    height: '210px',
    gap: '10px'
  }
}));

const KingPassPart = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const KingPassImg = styled('img')(({ theme }) => ({
  width: '92px',
  height: 'auto'
}));

const KingpassNumber = styled(Box)(({ theme }) => ({
  fontSize: '25px'
}));

import { Box } from '@mui/material';
import { styled } from '@mui/system';
import './index.css';

interface RaisedProps {
  raised: number;
}

export const RaisedCircle = (props: RaisedProps) => {
  const { raised } = props;
  return (
    <RaisedCircleContainer>
      <RaisedText>Raised</RaisedText>
      <RaisedValue>{raised}</RaisedValue>
      <BNBText>BNB</BNBText>
    </RaisedCircleContainer>
  );
};

const RaisedCircleContainer = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  border: '9px solid #D7CBFF',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px'
}));

const RaisedText = styled(Box)(({ theme }) => ({
  color: '#8462F6',
  fontSize: '16px'
}));

const RaisedValue = styled(Box)(({ theme }) => ({
  fontSize: '34px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));

const BNBText = styled(Box)(({ theme }) => ({
  fontSize: '15px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));

import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { MiniText } from '../Text/MiniText';
import { SmallText } from '../Text/SmallText';

interface RefundCardProps {
  isState: boolean;
}

interface RefundButtonProps {
  state: number;
}

export const RefundCard = (props: RefundCardProps) => {
  const { isState } = props;
  return (
    <RefundCardContainer>
      <SmallText>Refund</SmallText>
      <ButtonGroup>
        <RefundButton state={isState ? 1 : 0}>Burn</RefundButton>
        <RefundButton state={!isState ? 1 : 0}>Refund</RefundButton>
      </ButtonGroup>
      <MiniText>How do you want to use the unsold tokens?</MiniText>
    </RefundCardContainer>
  );
};

const RefundCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '15px',
  boxShadow: '0px 3px 6px #00000029',
  padding: '31px 26px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '26px',
  alignItems: 'center',
  gridColumn: 'span 2',
  [theme.breakpoints.down('md')]: {
    gridColumn: 'inherit'
  }
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '14px',
  paddingBottom: '11px',
  width: '100%'
}));

const RefundButton = styled(Box)<RefundButtonProps>(({ theme, state }) => ({
  borderRadius: '8px',
  boxShadow: '0px 3px 6px #00000029',
  width: '100%',
  backgroundColor: state === 1 ? '#8462F6' : '#F7F7F7',
  height: '45px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'gotham-bold',
  color: state === 1 ? '#F7F7F7' : '#1A023E',
  '&:hover': {
    backgroundColor: state === 1 ? '#8462F6' : '#F7F7F7'
  }
}));

import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TotalCards = () => {
  return (
    <TotalCardsContainer>
      <TotalCard name="Total locks" value={'145'} />
      <TotalCard name="Total Locked Token Value" value={'$ 145,987,765'} />
      <TotalCard name="Total Locked Liquidity Value" value={'$ 2,987,765'} />
    </TotalCardsContainer>
  );
};

const TotalCardsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: 'repeat(1, 3fr)',
    gap: '6px'
  }
}));

interface TotalCardProps {
  name: string;
  value: number | string;
}

const TotalCard = (props: TotalCardProps) => {
  const { name, value } = props;
  return (
    <TotalCardContainer>
      <TotalCardName>{name}</TotalCardName>
      <TotalCardValue>{value}</TotalCardValue>
    </TotalCardContainer>
  );
};

const TotalCardContainer = styled(Box)(({ theme }) => ({
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  backgroundColor: theme.palette.dark.main,
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '5px',
  [theme.breakpoints.down(768)]: {
    gap: 0
  }
}));

const TotalCardName = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: '#8462F6'
}));

const TotalCardValue = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  fontFamily: 'gotham-bold',
  color: theme.palette.dark.contrastText
}));

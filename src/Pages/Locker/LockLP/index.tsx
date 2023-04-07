import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { BannerCard } from './BannerCard';
import { LPTokenTable } from './LPTokenTable';
import { TotalCards } from './TotalCards';

export const LockLP = () => {
  return (
    <LockLPContainer>
      <BannerCard />
      <TotalCards />
      <LPTokenTable />
    </LockLPContainer>
  );
};

const LockLPContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '45px'
}));

import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { CoinStatus } from 'src/Components/CoinStatus';

export const MobileCoinStatus = (props: { projectId: number }) => {
  const { projectId } = props;
  return (
    <CoinStatusCointainer>
      <CoinStatus isMobile={true} projectId={projectId} />
    </CoinStatusCointainer>
  );
};

const CoinStatusCointainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end'
}));

const CoinStatusWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  width: '100%',
  paddingBottom: '15px',
  [theme.breakpoints.down(768)]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '250px',
    flexWrap: 'wrap',
    gap: '15px'
  }
}));

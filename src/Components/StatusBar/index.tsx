import { Circle } from '@mui/icons-material';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StatusBar = (props: { status: number; isMobile?: boolean }) => {
  const { status, isMobile } = props;
  return (
    <StatusBarContainer mobile={isMobile ?? false ? 1 : 0}>
      {status === 0 && (
        <>
          <Circle sx={{ width: '18px', height: '18px', color: '#ff004a' }} />
          <StatusText mobile={isMobile ?? false ? 1 : 0}>Inactive Kingpass</StatusText>
        </>
      )}
      {status === 1 && (
        <>
          <Circle sx={{ width: '18px', height: '18px', color: '#00FE9A' }} />
          <StatusText mobile={isMobile ?? false ? 1 : 0}>Active Kingpass</StatusText>
        </>
      )}
      {status === 2 && (
        <>
          <Circle sx={{ width: '18px', height: '18px', color: '#8b8d93' }} />
          <StatusText mobile={isMobile ?? false ? 1 : 0}>No Kingpass</StatusText>
        </>
      )}
    </StatusBarContainer>
  );
};

const StatusBarContainer = styled(Box)<{ mobile: number }>(({ theme, mobile }) => ({
  alignItems: 'center',
  gap: '5px',
  display: mobile === 1 ? 'none' : 'flex',
  [theme.breakpoints.down(1024)]: {
    display: 'flex'
  }
}));

const StatusText = styled(Box)<{ mobile: number }>(({ theme, mobile }) => ({
  textTransform: 'uppercase',
  fontSize: '12px',
  color: mobile === 1 ? theme.palette.primary.contrastText : '#FFFFFF'
}));

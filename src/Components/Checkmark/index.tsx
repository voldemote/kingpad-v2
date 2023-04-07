import { CheckCircle } from '@mui/icons-material';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface CheckmarkProps {
  children: React.ReactNode;
}

export const Checkmark = (props: CheckmarkProps) => {
  return (
    <CheckmarkContainer>
      <CheckCircle sx={{ width: '18px', height: '18px', color: '#09A0FF' }} />
      {props.children}
    </CheckmarkContainer>
  );
};

const CheckmarkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '6.5px',
  alignItems: 'center',
  fontSize: '13px',
  fontFamily: 'gotham-bold'
}));

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface StatusFilterButtonProps {
  name: string;
  color?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export const StatusFilterButton = (props: StatusFilterButtonProps) => {
  const { name, color, onClick, isDisabled } = props;
  return (
    <StatusFilterButtonContainer onClick={onClick} disable={isDisabled ?? false ? 1 : 0}>
      {color !== undefined && <Circle sx={{ backgroundColor: color }} />}
      <span style={{ textAlign: 'center' }}>{name}</span>
    </StatusFilterButtonContainer>
  );
};

const StatusFilterButtonContainer = styled(Box)<{ disable: number }>(({ theme, disable }) => ({
  borderRadius: '19px',
  border: `1px solid ${theme.palette.primary.contrastText}`,
  padding: '2px 8px',
  minWidth: '58px',
  display: 'flex',
  fontSize: '13px',
  fontFamily: 'gotham-bold',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '7px',
  cursor: 'pointer',
  opacity: disable === 1 ? 0.4 : 1
}));

const Circle = styled(Box)(({ theme }) => ({
  minWidth: '14px',
  minHeight: '14px',
  maxWidth: '14px',
  maxHeight: '14px',
  borderRadius: '50%'
}));

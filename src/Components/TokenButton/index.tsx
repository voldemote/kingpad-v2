import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

interface TokenButtonProps {
  darkIcon: string;
  lightIcon: string;
  name: string;
  isClicked: boolean;
  onClick?: () => void;
}

interface TokenProps {
  clicked: number;
}

export const TokenButton = (props: TokenButtonProps) => {
  const { darkIcon, lightIcon, name, isClicked, onClick } = props;
  return (
    <TokenButtonContainer onClick={onClick} clicked={isClicked ? 1 : 0}>
      <Img src={isClicked ? lightIcon : darkIcon} alt="token-icon" />
      <TokenName clicked={isClicked ? 1 : 0}>{name}</TokenName>
    </TokenButtonContainer>
  );
};

const TokenButtonContainer = styled(Button)<TokenProps>(({ clicked, theme }) => ({
  width: '98px',
  height: '86px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '9px',
  borderRadius: '8px',
  boxShadow: '0px 3px 6px #00000029',
  backgroundColor: clicked === 1 ? '#8462F6' : '#F7F7F7',
  '&:hover': {
    backgroundColor: clicked === 1 ? '#8462F6' : '#F7F7F7'
  }
}));

const TokenName = styled(Box)<TokenProps>(({ clicked, theme }) => ({
  fontSize: '15px',
  color: clicked === 1 ? '#FFFFFF' : '#1A023E',
  fontFamily: 'gotham-bold'
}));

const Img = styled('img')(({ theme }) => ({
  width: '22px',
  height: '22px'
}));

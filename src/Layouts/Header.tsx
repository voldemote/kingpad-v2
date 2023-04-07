import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, IconButton } from '@mui/material';
import { LOGO, MenuKing, MenuKingPass, BnbLogo } from 'src/Config/Images';
import { Menu } from '@mui/icons-material';
import { NavItem } from 'src/Components/NavItem';
import { CustomSwitch } from 'src/Components/Switch/ColorModeSwitch';
import { useNavigate } from 'react-router-dom';
import { NavModal } from 'src/Components/NavModal';
import { KingpadWalletConnectButton } from 'src/Components/WalletConnect/button';
import { StatusBar } from 'src/Components/StatusBar';
import { useAccount } from 'wagmi';
// import { getUserPassActive } from 'src/Contracts';
import { useWeb3Store } from 'src/Context/Web3Context';
import { getUserPassActive } from 'src/Contracts/kingPad';

export const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<number | undefined>(2); // 0: inActive, 1: active, 2: no kingpass
  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();

  const getUserHasKingpass = async () => {
    console.log('azazzzzazz_prima');
    const hasKing = await getUserPassActive(address);
    console.log('azazzzzazz_dopo', hasKing);
    setStatus(hasKing === true ? 1 : 0);
  };

  useEffect(() => {
    if (isConnected) {
      console.log('DIOINFIAMME');
      getUserHasKingpass();
    } else {
      setStatus(2);
    }
  }, [isInitialized, isConnected]);

  return (
    <Container>
      <KingPad>
        <MoreButton onClick={() => setOpen(!isOpen)}>
          <Menu />
        </MoreButton>
        <KingpadLogo src={LOGO} alt="kingpad-logo" onClick={() => navigate('/')} />
      </KingPad>
      <NavItems>
        <Navgroup>
          <NavItem icon={MenuKing} name="$KING" onClick={() => window.open('https://kingworld.finance')} />
          <NavItem icon={MenuKingPass} name="$KINGPASS" onClick={() => window.open('https://kingpass.finance')} />
          <StatusBar status={status ?? 2} />
          <CustomSwitch title={'toggle1'} />
        </Navgroup>
        <KingpadWalletConnectButton />
        <BinanceLogo src={BnbLogo} />
      </NavItems>
      <NavModal isOpen={isOpen} setOpen={setOpen} />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#1A003E',
  position: 'fixed',
  width: '100%',
  maxHeight: '75px',
  top: 0,
  zIndex: 1000000,
  padding: '20px 50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: '20px 30px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 12px'
  }
}));

const KingPad = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center'
}));

const MoreButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color: '#FFFFFF',
  [theme.breakpoints.down(1120)]: {
    minWidth: '24px',
    minHeight: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const KingpadLogo = styled('img')(({ theme }) => ({
  width: 'auto',
  height: '30px',
  [theme.breakpoints.down('mobile')]: {
    height: '25px'
  },
  cursor: 'pointer'
}));

const NavItems = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('mobile')]: {
    gap: '0.5rem'
  }
}));

const Navgroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  }
}));

const BinanceLogo = styled('img')(({ theme }) => ({
  width: '32px',
  height: 'auto'
}));

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect } from 'react';
import { SidebarItem } from '../SidebarItem';
import { SidebarLink } from '../SidebarItem/SidebarLink';
import {
  RocketLaunchOutlined,
  HealthAndSafetyOutlined,
  LockOutlined,
  DescriptionOutlined,
  StarBorder,
  DiamondOutlined
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useStore } from 'src/Context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBar } from '../StatusBar';
import { InfoModal } from '../InfoModal';
import { useWeb3Store } from 'src/Context/Web3Context';
// import { getUserPassActive } from 'src/Contracts';
import { useAccount } from 'wagmi';
import { getUserPassActive } from 'src/Contracts/kingPad';

interface SidebarItemProps {
  setOpen?: (value: boolean) => void;
}

export const SidebarItems = (props: SidebarItemProps) => {
  const { setOpen } = props;
  const { page, setPage } = useStore();
  const [status, setStatus] = useState<number | undefined>(2); // 0: inActive, 1: active, 2: no kingpass
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isKingSale, setKingSale] = useState(false);
  const navigate = useNavigate();
  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const media = window.matchMedia(`(max-width: 1024px)`);
  const handleLinkClicked = (val: number) => {
    if (setOpen != null) setOpen(false);
    setPage(val);
    switch (val) {
      case 3:
        navigate('/audit');
        break;
      case 4:
        navigate('/kyc');
        break;
      default:
        break;
    }
  };

  const handleInfoModal = (idx: number) => {
    if (media.matches) {
      setKingSale(idx === 1);
      setInfoModalOpen(true);
    }
  };

  const getUserHasKingpass = async () => {
    const hasKing = await getUserPassActive(address);
    setStatus(hasKing === true ? 1 : 0);
  };

  useEffect(() => {
    if (isConnected) {
      getUserHasKingpass();
    } else {
      setStatus(2);
    }
  }, [isInitialized, isConnected]);

  return (
    <>
      <StatusBar status={status ?? 2} isMobile={true} />
      <SidebarItem icon={<RocketLaunchOutlined />} title="Launchpad">
        <SidebarLinkContainer>
          <NavLink to={`/?kingstarter=true#filter`}>
            <SidebarLink active={page === 1} onClick={() => handleLinkClicked(1)}>
              Launches
              <StarBorder sx={{ width: '18px', height: '18px', color: '#FFD583' }} />
            </SidebarLink>
          </NavLink>
        </SidebarLinkContainer>
      </SidebarItem>
      <SidebarItem icon={<HealthAndSafetyOutlined />} title="Security">
        <SidebarLink active={page === 3} onClick={() => handleLinkClicked(3)}>
          Audit
        </SidebarLink>
        <SidebarLink active={page === 4} onClick={() => handleLinkClicked(4)}>
          KYC
        </SidebarLink>
      </SidebarItem>
      <SidebarItem icon={<LockOutlined />} title="Locker">
        <SidebarLink active={page === 5} onClick={() => handleLinkClicked(5)}>
          Lock LP
          <SoonBadge>Soon</SoonBadge>
        </SidebarLink>
        <SidebarLink active={page === 6} onClick={() => handleLinkClicked(6)}>
          Lock Token
          <SoonBadge>Soon</SoonBadge>
        </SidebarLink>
        <SidebarLink active={page === 7} onClick={() => handleLinkClicked(7)}>
          Create Lock
          <SoonBadge>Soon</SoonBadge>
        </SidebarLink>
      </SidebarItem>
      <SidebarItem
        icon={<DescriptionOutlined />}
        title="Doc"
        link={() => window.open('https://king-finance.gitbook.io/king-whitepaper/king-pad')}
      />
      <InfoModal isOpen={isInfoModalOpen} setOpen={setInfoModalOpen} isKingStarter={!isKingSale} />
    </>
  );
};

const KingStarterTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement="right-end" />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#8462F6'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#8462F6'
  }
}));

const KingSaleTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement="right-end" />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#1A003E'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1A003E'
  }
}));

interface KingTooltipBoxProps {
  name: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const KingTooltipBox = (props: KingTooltipBoxProps) => {
  const { name, icon, content } = props;
  return (
    <KingTooltipBoxContainer>
      <KingTooltipBoxTitle>
        {icon}
        {/* <StarBorder sx={{ width: '18px', height: '18px', color: '#FBD186' }} /> */}
        <KingPrimaryText>
          <span>King</span>
          {name === 'kingstarter' ? 'starter' : 'sale'}
        </KingPrimaryText>
      </KingTooltipBoxTitle>
      <KingContent>{content}</KingContent>
    </KingTooltipBoxContainer>
  );
};

const KingTooltipBoxContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  alignItems: 'flex-start'
}));

const KingTooltipBoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '3px'
}));

const KingPrimaryText = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  textTransform: 'uppercase',
  fontFamily: 'gotham-book',
  '& span': {
    fontFamily: 'gotham-bold'
  }
}));

const KingContent = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  fontFamily: 'gotham-book'
}));

const SoonBadge = styled(Box)({
  borderRadius: '19px',
  background: '#8462F6',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF',
  fontSize: '8px',
  padding: '1px',
  width: '37px',
  height: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase'
});

const InfoBadge = styled(Box)(({ theme }) => ({
  borderRadius: '19px',
  border: `1px solid ${theme.palette.danger.contrastText}`,
  background: theme.palette.danger.main,
  fontFamily: 'gotham-bold',
  color: theme.palette.danger.contrastText,
  fontSize: '8px',
  padding: '1px',
  width: '37px',
  height: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase'
}));

const SidebarLinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  alignItems: 'center'
}));

const NavLink = styled(Link)(({ theme }) => ({
  outline: 'none',
  textDecoration: 'none',
  color: 'inherit'
}));

const ALink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  outline: 'none',
  color: 'inherit'
}));

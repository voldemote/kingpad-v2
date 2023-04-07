import { styled } from '@mui/system';
import { Box } from '@mui/material';

interface SidebarItemProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  link?: () => void;
  children?: React.ReactNode;
}

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <SidebarItemContainer onClick={props.link}>
      <SidebarIcon>{props.icon}</SidebarIcon>
      <SidebarLinks>
        <Title>{props.title}</Title>
        {props.children}
      </SidebarLinks>
    </SidebarItemContainer>
  );
};

const SidebarItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  cursor: 'pointer'
}));

const SidebarIcon = styled(Box)(({ theme }) => ({
  color: '#8462F6'
}));

const SidebarLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
  // gap: '4px'
}));

const Title = styled(Box)(({ theme }) => ({
  fontSize: '17px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));

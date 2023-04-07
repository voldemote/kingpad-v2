import { useState } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import './style.css';

interface CustomSwitchProps {
  name1: string;
  name2: string;
  title: string;
}

export const TokenSwitch = (props: CustomSwitchProps) => {
  const [isToken, setToken] = useState(false);
  const { name1, name2, title } = props;

  return (
    <CustomSwitchContainer onClick={() => setToken(!isToken)}>
      <input type="checkbox" className="checkbox" checked={isToken} onChange={() => setToken(!isToken)} />
      <Label htmlFor={title} className="label">
        <Ball className="baller" token={isToken ? 1 : 0} />
        <SwitchName token={isToken ? 1 : 0} style={{ marginLeft: '5px' }}>
          {name1}
        </SwitchName>
        <SwitchName token={!isToken ? 1 : 0} style={{ marginRight: '5px' }}>
          {name2}
        </SwitchName>
      </Label>
    </CustomSwitchContainer>
  );
};

const CustomSwitchContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '140px'
  // [theme.breakpoints.down('md')]: {
  //   display: 'none'
  // }
}));

const SwitchName = styled(Box)<{ token: number }>(({ theme, token }) => ({
  color: theme.palette.mode === 'light' ? (token === 1 ? '#1E0041' : '#FFFFFF') : '#FFFFFF',
  fontSize: '13px',
  fontFamily: 'gotham-bold'
}));

const Label = styled('label')(({ theme }) => ({
  border: '1px solid #8462f6',
  borderRadius: '19px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 5.2px',
  position: 'relative',
  width: '137px',
  height: '34px',
  zIndex: 0
}));

const Ball = styled(Box)<{ token: number }>(({ theme, token }) => ({
  backgroundColor: '#8462f6',
  zIndex: -1,
  borderRadius: '19px',
  position: 'absolute',
  top: '3px',
  left: '4.4px',
  height: '25px',
  width: token === 0 ? '53px' : '70px',
  transform: 'translateX(0px)',
  transition: 'transform 0.2s linear'
}));

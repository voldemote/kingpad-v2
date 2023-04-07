import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { getProjectSetting } from 'src/Contracts';
import { tokenDataProps } from 'src/Constant/interface';

interface TokenStatusProps {
  color: string;
  amount: number;
  name: string;
}

export const TokenChartInfo = (props: { projectId: number }) => {
  const [tokenData, setTokenData] = useState<tokenDataProps[]>();
  const getChartData = async () => {
    const res = await getProjectSetting();
    if (res !== undefined) {
      setTokenData(res);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <InfoContainer>
      {tokenData?.map((token, index) => (
        <TokenStatus color={token.color} amount={token.value} name={token.id} key={index} />
      ))}
    </InfoContainer>
  );
};

const TokenStatus = (props: TokenStatusProps) => {
  const { color, amount, name } = props;
  return (
    <StatusContainer>
      <TokenColor style={{ backgroundColor: color }} />
      <TokenAmount>{amount}%</TokenAmount>
      <TokenName>{name}</TokenName>
    </StatusContainer>
  );
};

const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  width: '100%',
  justifyContent: 'center',
  gap: '15px',
  marginTop: '-20px',
  [theme.breakpoints.down('mobile')]: {
    gap: '8px'
  }
}));
const StatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  minWidth: '60px'
}));
const TokenColor = styled(Box)(({ theme }) => ({
  minWidth: '26px',
  minHeight: '26px',
  width: '26px',
  height: '26px',
  borderRadius: '50%'
}));

const TokenAmount = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  lineHeight: '15px',
  marginTop: '8px',
  color: theme.palette.dark.contrastText,
  [theme.breakpoints.down('mobile')]: {
    fontSize: '12px'
  }
}));

const TokenName = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  textAlign: 'center',
  color: theme.palette.dark.contrastText,
  [theme.breakpoints.down('mobile')]: {
    fontSize: '11px'
  }
}));

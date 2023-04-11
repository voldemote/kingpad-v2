import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useWeb3Store } from 'src/Context/Web3Context';
import { RaisedProgressBar } from '../Progress/RaisedProgress';
import { SmallText } from '../Text/SmallText';
import { ethers } from 'ethers';
import { getTotalDeposited } from 'src/Contracts/kingPad';

export const SoftHardCard = (props: {
  minValue: number;
  maxValue: number;
  softcap: number;
  hardcap: number;
  currency: string;
}) => {
  const { minValue, maxValue, softcap, hardcap, currency } = props;
  const [totalContribution, setTotalContribution] = useState(0);

  const { isConnected, isInitialized } = useWeb3Store();

  const getTotalDepositValue = async () => {
    const total = await getTotalDeposited();
    if (total !== undefined) {
      setTotalContribution(parseFloat(total));
    }
  };

  useEffect(() => {
    getTotalDepositValue();
  }, [isConnected, isInitialized]);

  return (
    <SoftHardCardContainer>
      <SoftHardText>
        <SmallText>Soft / Hard</SmallText>
        <SoftHardCardValue>
          {softcap} {currency} / {hardcap} {currency}
        </SoftHardCardValue>
      </SoftHardText>
      <SoftHardText>
        <SmallText>Min / Max contribution</SmallText>
        <SoftHardCardValue>
          {minValue} {currency} / {maxValue} {currency}
        </SoftHardCardValue>
      </SoftHardText>
      <RaisedProgressBar percentage={parseFloat(((totalContribution / hardcap) * 100).toFixed(2))} />
    </SoftHardCardContainer>
  );
};
const SoftHardCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '15px',
  boxShadow: '0px 3px 6px #00000029',
  padding: '31px 26px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '26px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridColumn: 'inherit'
  }
}));

const SoftHardCardValue = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));

const SoftHardText = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px'
}));

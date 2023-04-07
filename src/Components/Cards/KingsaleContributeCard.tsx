/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { useAccount, useNetwork } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { ethers } from 'ethers';
import { ButtonLoader } from '../Button/ButtonLoader';
import { deposit, getUserInfo, withdraw } from 'src/Contracts/kingPad';

interface CardProps {
  status: string;
  minBuy?: number;
  maxBuy?: number;
  currency?: string;
  tokenAddress?: string;
}

export const KingSaleContributeCard = (props: CardProps) => {
  const { status, minBuy, maxBuy, currency, tokenAddress } = props;
  const [buyVal, setBuyVal] = useState(1);
  const [contributeValue, setContributeValue] = useState(0);
  const [finalizedAndOk, setFinalizedAndOk] = useState(NaN); // 0 = fail 1 = ok 2 = not finalized
  const [tokenValue, setTokenValue] = useState(0);
  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [isLoad, setLoad] = useState(false);
  const { chain } = useNetwork();

  const [totalcontributeValue, setTotalContributeValue] = useState(0);
  const [totaltokenValue, setTotalTokenValue] = useState(0);

  const buyRef = useRef<HTMLInputElement>(null);
  const handleChangeValue = (val: string) => {
    setBuyVal(parseFloat(val));
  };

  const handleInputAreaClick = () => {
    buyRef.current?.focus();
  };

  const handleDeposit = async () => {
    if (minBuy !== undefined && maxBuy !== undefined && currency !== undefined) {
      if (buyVal < minBuy) {
        toast.error(`Amount should be more than ${minBuy} ${currency}`);
      } else if (buyVal > maxBuy) {
        toast.error(`Amount should be less than ${maxBuy} ${currency}`);
      } else {
        if (tokenAddress !== undefined && chain !== undefined) {
          setLoad(true);
          try {
            await deposit(ethers.utils.parseEther(buyVal.toString()).toString());
            await getUserInfos();
          } catch (err: any) {
            // toast.error(`you need to wait at least 24 hours to withdraw your $KING`, err);
            const revertData = err.reason || err.message;
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            toast.error(`Transaction failed: ${revertData}`);
            // errMsg !== "" ? toast.error(errMsg, err) :
            setLoad(false);
          }
          setLoad(false);
        }
      }
    }
  };

  const handleWithdraw = async () => {
    if (chain === undefined) return;
    setLoad(true);
    try {
      await withdraw();
      await getUserInfos();
      // if (address !== undefined) {
      //   getContributeValue(address);
      // }
    } catch (err: any) {
      // toast.error(`you need to wait at least 24 hours to withdraw your $KING`, err);
      const revertData = err.reason || err.message;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      toast.error(`Transaction failed: ${revertData}`);
      // errMsg !== "" ? toast.error(errMsg, err) :
      setLoad(false);
    }
    setLoad(false);
  };

  const getUserInfos = async () => {
    if (address !== undefined) {
      const res = await getUserInfo(address);
      setTotalContributeValue(res?.amount ?? 0);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getUserInfos();
    }
  }, [isConnected, isInitialized]);

  if (status === 'Upcoming') {
    return (
      <CardBox about="Contribute-Card" status={status}>
        <CardLabelGroup>
          <CardLabel>Your contribution</CardLabel>
          <ValueLabel>0 {currency}</ValueLabel>
        </CardLabelGroup>
        <CardLabelGroup>
          <CardLabel>You bought</CardLabel>
          <ValueLabel>0 COS</ValueLabel>
        </CardLabelGroup>
        <ClaimButtonGroup>
          <InputBox onClick={handleInputAreaClick}>
            <Input disabled={true} type="number" ref={buyRef} value={buyVal} />
          </InputBox>
          <ClaimButton disabled={true}>Buy now</ClaimButton>
          <ClaimButton disabled={true}>Withdraw {currency}</ClaimButton>
          <ClaimLabel>Wait for the sale to Start</ClaimLabel>
        </ClaimButtonGroup>
      </CardBox>
    );
  } else if (status === 'Ongoing') {
    return (
      <CardBox about="Contribute-Card" status={status}>
        <CardLabelGroup>
          <CardLabel>Your contribution</CardLabel>
          <ValueLabel>
            {contributeValue} {currency}
          </ValueLabel>
        </CardLabelGroup>
        <CardLabelGroup>
          <CardLabel>You bought</CardLabel>
          <ValueLabel>{tokenValue} COS</ValueLabel>
        </CardLabelGroup>
        <InputBox onClick={handleInputAreaClick}>
          <Input
            type="number"
            ref={buyRef}
            value={buyVal}
            onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeValue(e.currentTarget.value)}
          />
        </InputBox>
        <ClaimButton variant="contained" disabled={isLoad} onClick={handleDeposit}>
          {isLoad ? <ButtonLoader /> : 'Buy now'}
        </ClaimButton>
        <ClaimButton disabled={status !== 'Ongoing' || isLoad} onClick={handleWithdraw}>
          {isLoad ? <ButtonLoader /> : `Withdraw ${currency}`}
        </ClaimButton>
      </CardBox>
    );
  } else {
    return (
      <CardBox about="Contribute-Card" status={status}>
        <CardLabelGroup>
          <CardLabel>Your contribution</CardLabel>
          <ValueLabel>
            {totalcontributeValue} {currency}
          </ValueLabel>
        </CardLabelGroup>
        <CardLabelGroup>
          <CardLabel>You bought</CardLabel>
          <ValueLabel>{totaltokenValue} COS</ValueLabel>
        </CardLabelGroup>
        <CardLabelGroup>
          {/*           <CardLabel>Congratulations!</CardLabel>
          <ValueLabel>You already claimed Your token</ValueLabel> */}
        </CardLabelGroup>
        <ClaimButtonGroup>
          {finalizedAndOk === 2 ? (
            <ClaimButton disabled={contributeValue === 0 || isLoad}>
              {isLoad ? <ButtonLoader /> : 'Claim now'}
            </ClaimButton>
          ) : finalizedAndOk === 1 ? (
            <ClaimButton disabled={contributeValue === 0 || isLoad}>
              {isLoad ? <ButtonLoader /> : 'Withdraw'}
            </ClaimButton>
          ) : (
            <>
              <ClaimButton disabled={true}>Claim now</ClaimButton>
              <ClaimLabel>Wait the sale to be finalised</ClaimLabel>
            </>
          )}
        </ClaimButtonGroup>
      </CardBox>
    );
  }
};

const CardBox = styled(Box)<{ status: string }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '35px',
  width: '100%',
  gap: '26px',
  backgroundColor: '#1E0041',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  opacity: status === 'Ongoing' ? 1 : 0.6
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontWeight: '600'
}));

const CardButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  paddingTop: '11px'
}));

const InputBox = styled(Box)(({ theme }) => ({
  border: '1px solid #FFFFFF',
  color: '#FFFFFF',
  fontSize: '15px',
  borderRadius: '32px',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'text',
  '&:hover': {
    border: '1px solid #FFFFFF'
  },
  [theme.breakpoints.down(1200)]: {
    padding: '0px 25px'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(370)]: {
    fontSize: '9px'
  }
}));

const Input = styled('input')(({ theme }) => ({
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  textAlign: 'center',
  width: '30px',
  height: '34px',
  fontSize: '15px',
  padding: '5px 0',
  fontFamily: 'gotham-bold',
  color: '#ffffff'
}));

const CardButton = styled(Button)(({ theme }) => ({
  borderRadius: '32px',
  fontSize: '15px',
  backgroundColor: 'transparent',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  color: '#FFFFFF',
  border: '2px solid #00FE9A',
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&:disabled': {
    color: '#FFFFFF'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  }
}));

const PurchasedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '42px',
  padding: '16px 0 32px 0',
  [theme.breakpoints.down('xs')]: {
    gap: '20px'
  }
}));

interface PurchasedProps {
  name: string;
  value?: string | number;
  currency?: string;
}

const Purchased = (props: PurchasedProps) => {
  return (
    <PurchasedWrapper>
      <PurchasedName>{props.name}</PurchasedName>
      <PurchasedValue>
        {props.value} {props.currency}
      </PurchasedValue>
    </PurchasedWrapper>
  );
};

const PurchasedWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const PurchasedName = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const PurchasedValue = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF'
}));

const ValueLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF',
  padding: '5px 0',
  width: '160px',
  textAlign: 'center'
}));

const ClaimButton = styled(Button)(({ theme }) => ({
  borderRadius: '32px',
  fontSize: '15px',
  backgroundColor: '#8462F6',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  '&:disabled': {
    color: '#FFFFFF',
    opacity: 0.3
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  }
}));

const CardLabelGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ClaimButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px'
}));

const ClaimLabel = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: '#ffffff'
}));

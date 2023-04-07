/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { SupportCard } from './SupportCard';
import { SmallText } from 'src/Components/Text/SmallText';
import { TokenButton } from 'src/Components/TokenButton';
import {
  BnbIcon,
  BusdIcon,
  UsdtIcon,
  UsdcIcon,
  lightBnbIcon,
  lightBusdIcon,
  lightUsdtIcon,
  lightUsdcIcon
} from 'src/Config/Images';
import { toast } from 'react-toastify';
import { Dropdown } from 'src/Components/Dropdown';
import { RateCard } from 'src/Components/Cards/RateCard';
import { RefundCard } from 'src/Components/Cards/RefundCard';
import { PresaleCard } from 'src/Components/Cards/PresaleCard';
import dayjs, { Dayjs } from 'dayjs';
import { AboutToken } from './AboutToken';
import { TokenDescription } from './TokenDescription';
import { BannerCard } from './BannerCard';
import { getProjectDetails } from 'src/Contracts';
// import { createPresale, getTokenInfo } from 'src/Contracts/kingStarter';
import { useWeb3Store } from 'src/Context/Web3Context';
import { coinDataProps } from 'src/Constant/interface';
import { LaunchConnectButton } from 'src/Components/WalletConnect/LaunchButton';
import { useAccount } from 'wagmi';
import { handleContractFunction } from 'src/Utils/handleContractFunction';

export const KingSale = () => {
  const defaultState = {
    tokenAddress: '',
    name: '',
    symbol: '',
    decimal: 0,
    currency: 'BNB',
    kingPassTotalSupply: '0',
    itemValue: 'Pancakeswap',
    presaleRate: 0,
    listingRate: 0,
    softCap: 0,
    hardCap: 0,
    minPresale: 0,
    maxPresale: 0,
    liq: 0,
    liqLock: 0,
    isVesting: false,
    isBurn: true,
    releaseAmount: 0,
    vestPeriod: 0,
    tokenCycle: 0,
    logoUrl: '',
    coverImgUrl: '',
    youtubeVideoUrl: '',
    websiteUrl: '',
    telegramUrl: '',
    youtubeUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    discordUrl: '',
    instagramUrl: '',
    description: ''
  };

  const [state, setState] = useState(defaultState);

  const [dateTime1, setDateTime1] = useState<Dayjs | null>(null);
  const [dateTime2, setDateTime2] = useState<Dayjs | null>(null);

  const { address } = useAccount();

  const [isLoad, setLoad] = useState(false);

  const { isInitialized, isConnected } = useWeb3Store();

  const handleState = (prop: string, value: string | number | boolean) => {
    setState({ ...state, [prop]: value });
  };

  const getCoinData = async () => {
    const data: coinDataProps = await getProjectDetails(address ?? '');
    if (data !== undefined) {
      setState({
        ...state,
        tokenAddress: data.token_address ?? '',
        name: data.name ?? '',
        symbol: data.symbol ?? '',
        decimal: data.decimals ?? 0,
        currency: data.currency ?? 'BNB',
        kingPassTotalSupply: '',
        presaleRate: data.presale_rate ?? 0,
        listingRate: data.listing_rate ?? 0,
        softCap: data.soft_cap ?? 0,
        hardCap: data.hard_cap ?? 0,
        minPresale: data.min_contribution ?? 0,
        maxPresale: data.max_contribution ?? 0,
        liq: data.liquidity_percentage ?? 0,
        liqLock: data.liquidity_lock_days ?? 0,
        isBurn: data.refund_type !== 'refund',
        releaseAmount: data.vesting_first_release_amount ?? 0,
        vestPeriod: data.vesting_period_each_cycle_days ?? 0,
        tokenCycle: data.vesting_release_each_cycle_percentage ?? 0,
        logoUrl: data.logo ?? '',
        coverImgUrl: data.cover_image ?? '',
        youtubeUrl: data.youtube ?? '',
        websiteUrl: data.website ?? '',
        telegramUrl: data.telegram ?? '',
        twitterUrl: data.twitter ?? '',
        youtubeVideoUrl: data.youtube_video ?? '',
        facebookUrl: data.facebook ?? '',
        discordUrl: data.discord ?? '',
        instagramUrl: data.instagram ?? '',
        description: data.description ?? ''
      });

      setDateTime1(dayjs(data.kingpass_start));
      setDateTime2(dayjs(data.kingpass_end));
    }
  };

  useEffect(() => {
    if (isConnected) {
      getCoinData();
    }
  }, [isInitialized, isConnected]);

  const handleChangeCurrency = (cr: string) => {
    setState({ ...state, currency: cr });
  };

  return (
    <>
      <BannerCard />
      <TokenDetailsContainer>
        <TokenDetails>
          <TokenAddressCard>
            <SmallText>Token address</SmallText>
            <InputUrl
              placeholder="Insert contract address"
              value={state.tokenAddress}
              // onChange={async (e) => await handleTokenAddressChanged(e.currentTarget.value)}
              disabled={true}
            />
            <TokenInfo>
              <TokenUnit title="Name" content={state.name} name="name" setContent={handleState} disabled={true} />
              <TokenUnit title="Symbol" name="symbol" content={state.symbol} setContent={handleState} disabled={true} />
              <TokenUnit
                title="Decimal"
                name="decimal"
                type="number"
                content={state.decimal}
                setContent={handleState}
                disabled={true}
              />
            </TokenInfo>
          </TokenAddressCard>
          <TokenCurrencyCard>
            <CurrencyLabel>Currency</CurrencyLabel>
            <CurrencyButtons>
              <TokenButton
                darkIcon={BnbIcon}
                lightIcon={lightBnbIcon}
                name="BNB"
                onClick={() => {
                  handleChangeCurrency('BNB');
                }}
                isClicked={state.currency === 'BNB'}
              />
              <TokenButton
                darkIcon={BusdIcon}
                lightIcon={lightBusdIcon}
                name="BUSD"
                onClick={() => {
                  handleChangeCurrency('BUSD');
                }}
                isClicked={state.currency === 'BUSD'}
              />
              <TokenButton
                darkIcon={UsdtIcon}
                lightIcon={lightUsdtIcon}
                name="USDT"
                onClick={() => {
                  handleChangeCurrency('USDT');
                }}
                isClicked={state.currency === 'USDT'}
              />
              <TokenButton
                darkIcon={UsdcIcon}
                lightIcon={lightUsdcIcon}
                name="USDC"
                onClick={() => {
                  handleChangeCurrency('USDC');
                }}
                isClicked={state.currency === 'USDC'}
              />
            </CurrencyButtons>
            <CurrencySupport>Choose the currency you want to create the pair with</CurrencySupport>
          </TokenCurrencyCard>
          <TokenSwap>
            <TokenSwapLabel>Router</TokenSwapLabel>
            <Dropdown name="itemValue" itemValue={state.itemValue} setItemValue={handleState} isDisabled={true} />
          </TokenSwap>
        </TokenDetails>
        <SupportCard totalSupply={state.kingPassTotalSupply} />
      </TokenDetailsContainer>
      <RateCardContainer>
        <RateCard
          title="Presale rate"
          subTitle="(to define after kingstarter)"
          name="presaleRate"
          help={`If I spend 1 ${state.currency}, how many token will I receive?`}
          isDisabled={true}
          isOpacity={true}
          value={state.presaleRate}
          setValue={handleState}
        />
        <RateCard
          title="Listing rate"
          subTitle="(to define after kingstarter)"
          name="listingRate"
          help={`If I spend 1 ${state.currency}, how many token will I receive?`}
          isDisabled={true}
          isOpacity={true}
          value={state.listingRate}
          setValue={handleState}
        />
      </RateCardContainer>
      <BNBCardContainer>
        <RateCard
          title="Softcap"
          name="softCap"
          content={state.currency}
          help={`The minimum amount of allocated ${state.currency} in your presale.`}
          value={state.softCap}
          isDisabled={true}
          setValue={handleState}
        />
        <RateCard
          title="Hardcap"
          subTitle="(to define after kingstarter)"
          name="hardCap"
          content={state.currency}
          help={`The minimum amount of allocated ${state.currency} in your presale.`}
          isDisabled={true}
          isOpacity={true}
          value={state.hardCap}
          setValue={handleState}
        />
        <RateCard
          title="Min contribution"
          name="minPresale"
          content={state.currency}
          help="The minimum amount that must be contributed to your presale."
          value={state.minPresale}
          isDisabled={true}
          setValue={handleState}
        />
        <RateCard
          title="Max contribution"
          name="maxPresale"
          content={state.currency}
          help="The maximum contribution amount allowed per wallet."
          value={state.maxPresale}
          isDisabled={true}
          setValue={handleState}
        />
      </BNBCardContainer>
      <BNBCardContainer>
        <RateCard
          title="Liquidity %"
          name="liq"
          help="Enter the percentage of raised funds that should be allocated to Liquidity (Min 51% Max 100%)"
          value={state.liq}
          setValue={handleState}
          isDisabled={true}
        />
        <RateCard
          title="Liquidity lock"
          name="liqLock"
          content="DAYS"
          help="How long do you want to lock LP after launch?"
          value={state.liqLock}
          setValue={handleState}
          isDisabled={true}
        />
        <RefundCard isState={state.isBurn} />
      </BNBCardContainer>
      <PresaleContainer>
        <PresaleCard
          title="Kingstarter starts"
          content="Select start time (GMT Time Zone)"
          state={dateTime1}
          setState={setDateTime1}
          isDisabled={true}
        />
        <PresaleCard
          title="Kingstarter ends"
          content="Select end time (GMT Time Zone)"
          state={dateTime2}
          setState={setDateTime2}
          isDisabled={true}
        />
        {/* <KingpassCard /> */}
      </PresaleContainer>
      {/* <EnableVestButton
        onClick={() => setState({ ...state, isVesting: !state.isVesting })}
        status={state.isVesting ? 1 : 0}
      >
        {state.isVesting ? 'Disable' : 'Enable'} vesting for contributors
      </EnableVestButton> */}
      <VestingContainer>
        <VestingDetailsContainer>
          <RateCard
            title="First release Amount"
            name="releaseAmount"
            content="%"
            help="How many token do you want to unlock in the first release?"
            isDisabled={true}
            value={state.releaseAmount}
            setValue={handleState}
          />
          <RateCard
            title="Vesting period each cycle"
            name="vestPeriod"
            content="Days"
            help="How often do you want to unlock your tokens?"
            isDisabled={true}
            value={state.vestPeriod}
            setValue={handleState}
          />
          <RateCard
            title="Token release each cycle"
            name="tokenCycle"
            content="%"
            help="How many token do you want to unlock each cycle?"
            isDisabled={true}
            value={state.tokenCycle}
            setValue={handleState}
          />
        </VestingDetailsContainer>
      </VestingContainer>
      <AboutToken state={state} setState={handleState} />
      <TokenDescription name="description" value={state.description} setState={handleState} />
      {isConnected ? <LauchButton>LAUNCH YOUR KING STARTER</LauchButton> : <LaunchConnectButton />}
    </>
  );
};

interface TokenUnitProps {
  title: string;
  name: string;
  content?: string | number;
  type?: string;
  setContent: any;
  disabled?: boolean;
}

const TokenUnit = ({ title, name, content, type, setContent, disabled }: TokenUnitProps) => {
  return (
    <TokenUnitContainer>
      <SmallText>{title}</SmallText>
      <InputText
        placeholder="-"
        value={content === 0 ? '' : content}
        type={type}
        name={name}
        disabled={disabled}
        onChange={(e) => setContent(name, e.target.value)}
      />
    </TokenUnitContainer>
  );
};

const TokenDetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '14px',
  paddingTop: '26px',
  width: '100%',
  [theme.breakpoints.down(720)]: {
    flexDirection: 'column'
  }
}));

const TokenDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%'
}));

const TokenAddressCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '26px 70px',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: '26px 40px'
  }
}));

const InputText = styled('input')(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  background: 'none',
  outline: 'none',
  border: 'none',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  fontSize: '14px',
  height: '20px'
}));

const TokenInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  paddingTop: '18px'
}));

const TokenUnitContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center'
}));

const TokenCurrencyCard = styled(Box)(({ theme }) => ({
  padding: '20px 70px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '15px',
  boxShadow: '0px 3px 6px #00000029',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down(1250)]: {
    padding: '20px 30px'
  }
}));

const CurrencyLabel = styled(Box)(({ theme }) => ({
  color: '#8462F6',
  fontSize: '16px',
  fontFamily: 'gotham-bold'
}));

const CurrencyButtons = styled(Box)(({ theme }) => ({
  display: 'grid',
  justifyContent: 'center',
  width: '100%',
  gridTemplateColumns: 'auto auto auto auto',
  gap: '18px',
  marginTop: '13px',
  [theme.breakpoints.down(1440)]: {
    gridTemplateColumns: 'auto auto'
  }
}));

const CurrencySupport = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.primary.contrastText,
  paddingTop: '26px',
  textAlign: 'center'
}));

const TokenSwap = styled(Box)(({ theme }) => ({
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  background: theme.palette.primary.main,
  padding: '23px',
  textAlign: 'center'
}));

const TokenSwapLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const RateCardContainer = styled(Box)(({ theme }) => ({
  paddingTop: '25px',
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  gap: '14px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const BNBCardContainer = styled(Box)(({ theme }) => ({
  paddingTop: '18px',
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '14px',
  [theme.breakpoints.down('xl')]: {
    gridTemplateColumns: 'repeat(2, 2fr)'
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(1, 4fr)'
  }
}));

const PresaleContainer = styled(Box)(({ theme }) => ({
  paddingTop: '18px',
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '14px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

interface VestButtonProps {
  status: number;
}

const EnableVestButton = styled(Button)<VestButtonProps>(({ theme, status }) => ({
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  backgroundColor: status === 1 ? theme.palette.primary.main : '#8462F6',
  padding: '18px',
  textAlign: 'center',
  width: '100%',
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  textTransform: 'none',
  color: status === 1 ? '#8462F6' : '#FFFFFF',
  fontWeight: '700',
  [theme.breakpoints.down('xs')]: {
    fontSize: '14px'
  },
  '&:hover': {
    backgroundColor: status === 1 ? theme.palette.primary.main : '#8462F6'
  }
}));

const VestingContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  marginTop: '11px',
  width: '100%',
  justifyContent: 'center',
  gap: '16px',
  gridTemplateColumns: 'repeat(1, 4fr)'
}));

const VestingDetailsContainer = styled(Box)(({ theme }) => ({
  marginTop: '16px',
  gap: '16px',
  display: 'flex',
  width: '100%',
  flex: 4,
  [theme.breakpoints.down(1450)]: {
    flex: 'inherit',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [theme.breakpoints.down(571)]: {
    gridTemplateColumns: 'repeat(1, 4fr)'
  }
}));

const LauchButton = styled(Button)(({ theme }) => ({
  padding: '15px',
  fontSize: '18px',
  textAlign: 'center',
  backgroundColor: '#8462F6',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  color: '#FFFFFF',
  width: '100%',
  marginTop: '37px',
  fontFamily: 'gotham-bold',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px'
  }
}));

const InputUrl = styled('input')(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  background: 'none',
  outline: 'none',
  border: 'none',
  height: '30px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  '::placeholder': {
    color: theme.palette.primary.contrastText,
    opacity: 0.4
  },
  fontSize: '14px'
}));

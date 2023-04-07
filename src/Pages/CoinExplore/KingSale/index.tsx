import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ExploreBanner } from './ExploreBanner';
import { ProjectOverview } from './ProjectOverview';
import { CoinDetailCards } from './CoinDetailCards';
import { CoinInfos } from './CoinInfos';
import { MobileCoinStatus } from './MobileCoinStatus';
import { getProjectDetailsById } from 'src/Contracts';
import { coinDataProps } from 'src/Constant/interface';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { getKingState, kingpadIsActive } from 'src/Contracts/kingPad';

export const KingSaleExplore = () => {
  const [coinData, setCoinData] = useState<coinDataProps>();

  const params = new URLSearchParams(window.location.search); // Access the value of the "id" parameter

  const id = params.get('id');
  const { address } = useAccount();

  const { isConnected, isInitialized } = useWeb3Store();

  const getCoinData = async (addy: string) => {
    const data = await getProjectDetailsById(parseInt(id ?? '0'));
    setCoinData(data);
  };

  const isKingPadActive = async () => {
    const isActive = await kingpadIsActive();
    console.log('kingpadActive: ', isActive);
  };

  const getKingStatus = async () => {
    const state = await getKingState();
    console.log('kingState: ', state);
  };

  useEffect(() => {
    if (isConnected && address !== undefined) {
      getCoinData(address);

      isKingPadActive();
      getKingStatus();
    } else {
      getCoinData('');
    }
  }, [isInitialized, isConnected]);
  return coinData !== undefined ? (
    <CoinExploreContainer>
      <MobileCoinStatus projectId={parseInt(id ?? '0')} />
      <ExploreBanner data={coinData} projectId={parseInt(id ?? '0')} />
      <ProjectOverview data={coinData} />
      <CoinDetailCards data={coinData} />
      <CoinInfos data={coinData} projectId={parseInt(id ?? '0')} />
    </CoinExploreContainer>
  ) : (
    <></>
  );
};

const CoinExploreContainer = styled(Box)(({ theme }) => ({}));

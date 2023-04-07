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

export const KingStarterExplore = () => {
  const [coinData, setCoinData] = useState<coinDataProps>();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const getCoinData = async (id: number) => {
    const data = await getProjectDetailsById(id);
    console.log('getCoinData', data);
    setCoinData(data);
  };

  useEffect(() => {
    console.log({ id });
    getCoinData(parseInt(id ?? '0'));
  }, []);
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

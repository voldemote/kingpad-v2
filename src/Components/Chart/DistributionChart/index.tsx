import { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { getProjectSetting } from 'src/Contracts';
import { tokenDataProps } from 'src/Constant/interface';

export const DistributionChart = (props: { projectId: number }) => {
  const { projectId } = props;
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

  return tokenData !== undefined ? (
    <ResponsivePie
      data={tokenData}
      startAngle={-35}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.8}
      padAngle={5}
      cornerRadius={6}
      activeOuterRadiusOffset={10}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['brighter', 0.2]]
      }}
      colors={(prop) => prop.data.color}
      arcLinkLabelsSkipAngle={5}
      arcLinkLabelsTextColor="#ffffff"
      arcLinkLabelsDiagonalLength={5}
      arcLinkLabelsThickness={2}
      arcLinkLabelsStraightLength={10}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['brighter', 4]]
      }}
      theme={{ fontSize: 10 }}
      enableArcLinkLabels={false}
      tooltip={() => <></>}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 10,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 20
        }
      ]}
    />
  ) : (
    <></>
  );
};

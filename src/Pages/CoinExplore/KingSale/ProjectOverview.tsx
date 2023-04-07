import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { coinDataProps } from 'src/Constant/interface';
import { YoutubeEmbed } from 'src/Components/YoutubeEmbed';

export const ProjectOverview = (props: { data: coinDataProps }) => {
  const { data } = props;
  return (
    <ProjectOverviewContainer>
      <ProjectOverViewBox>
        <OverViewTitle>Project Overview</OverViewTitle>
        <OverViewDescription>{data.description}</OverViewDescription>
      </ProjectOverViewBox>
      <ProjectMovie>
        <YoutubeEmbed embedId={data.youtube_video} />
      </ProjectMovie>
    </ProjectOverviewContainer>
  );
};

const ProjectOverviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '80px',
  padding: '45px',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  marginTop: '18px',
  [theme.breakpoints.down('xl')]: {
    gap: '20px'
  },
  [theme.breakpoints.down('desktop')]: {
    flexDirection: 'column',
    padding: '20px'
  }
}));

const ProjectOverViewBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '7px'
}));

const OverViewTitle = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  [theme.breakpoints.down('desktop')]: {
    fontSize: '14px'
  }
}));

const OverViewDescription = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  height: '129px',
  [theme.breakpoints.down('desktop')]: {
    fontSize: '10px'
  }
}));

const ProjectMovie = styled(Box)(({ theme }) => ({
  width: '288px',
  minWidth: '288px',
  height: '160px',
  borderRadius: '15px',
  backgroundColor: '#8462F6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('desktop')]: {
    width: '100%',
    minWidth: '100%'
  }
}));

import { styled } from '@mui/system';

interface embedProps {
  embedId: string;
}

export const YoutubeEmbed = (props: embedProps) => {
  const { embedId } = props;
  return (
    <IFrame
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
};

const IFrame = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '100%'
}));

import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { LargeText } from '../Text/LargeText';
import { MiniText } from '../Text/MiniText';
import { SmallText } from '../Text/SmallText';

interface RateCardProps {
  title: string;
  subTitle?: string;
  name: string;
  value?: string | number;
  setValue: any;
  content?: string;
  help: string;
  isDisabled?: boolean;
  style?: any;
  isOpacity?: boolean;
}

interface ReteCardContainerProps {
  opacity: number;
}

export const RateCard = (props: RateCardProps) => {
  const { title, subTitle, name, value, content, help, isDisabled, style, setValue, isOpacity } = props;
  return (
    <RateCardContainer sx={style} opacity={isOpacity ?? false ? 1 : 0}>
      <Title>
        <SmallText>{title}</SmallText>
        {subTitle !== undefined && <SubText>{subTitle}</SubText>}
      </Title>
      <InputUrl
        type={'number'}
        placeholder="-"
        value={value === 0 || isOpacity === true ? '' : value}
        name={name}
        disabled={isDisabled}
        maxLength={100}
        onChange={(e) => setValue(name, e.target.value)}
      />
      {content !== undefined && <ContentText>{content}</ContentText>}
      <MiniText>{help}</MiniText>
    </RateCardContainer>
  );
};

const RateCardContainer = styled(Box)<ReteCardContainerProps>(({ theme, opacity }) => ({
  padding: '32px 16px',
  boxShadow: '0px 3px 6px #00000029',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
  borderRadius: '15px',
  justifyContent: 'flex-start',
  opacity: opacity === 1 ? 0.6 : 1
}));

const ContentText = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '15px'
}));

const InputUrl = styled('input')(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  background: 'none',
  outline: 'none',
  border: 'none',
  height: '30px',
  fontSize: '40px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  '::placeholder': {
    color: theme.palette.primary.contrastText
  }
}));

const Title = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px'
}));

const SubText = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '12px',
  textAlign: 'center'
}));

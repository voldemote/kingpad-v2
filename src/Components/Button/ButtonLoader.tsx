import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

export const ButtonLoader = () => {
  return <ButtonLoaderContainer />;
};

const ButtonLoaderContainer = styled(CircularProgress)(({ theme }) => ({
  width: '25px !important',
  height: '25px !important',
  color: 'inherit'
}));

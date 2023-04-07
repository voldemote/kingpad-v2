import { StarBorder, DiamondOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

interface KingFilterButtonProps {
  name: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isOpacity?: boolean;
}

export const KingFilterButton = (props: KingFilterButtonProps) => {
  const { name, onClick, isDisabled, isOpacity } = props;

  return (
    <KingFilterButtonContainer
      onClick={onClick}
      disable={isDisabled ?? false ? 1 : 0}
      opacitynum={isOpacity ?? true ? 1 : 0}
      kingname={name}
    >
      {name === 'kingstarter' ? (
        <>
          <StarBorder sx={{ width: '18px', height: '18px', color: '#FBD186' }} />
          <span>King</span>Starter
        </>
      ) : (
        <>
          <DiamondOutlined sx={{ width: '18px', height: '18px', color: '#A47FDB' }} />
          <span>King</span>sale
        </>
      )}
    </KingFilterButtonContainer>
  );
};

const KingFilterButtonContainer = styled(Button)<{ disable: number; opacitynum: number; kingname: string }>(
  ({ theme, disable, opacitynum, kingname }) => ({
    fontSize: '12px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    height: '27px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px',
    padding: '2px 15px',
    backgroundColor: kingname === 'kingstarter' ? '#8462F6' : '#150030',
    opacity: opacitynum === 0 ? 1 : disable === 1 ? 0.4 : 1,
    color: '#FFFFFF',
    fontFamily: 'gotham-book',
    '& span': {
      fontFamily: 'gotham-bold'
    },
    '&:hover': {
      backgroundColor: kingname === 'kingstarter' ? '#8462F6' : '#150030'
    },
    [theme.breakpoints.down(370)]: {
      fontSize: '10px'
    }
  })
);

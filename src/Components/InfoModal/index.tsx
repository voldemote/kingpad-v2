import React from 'react';
import { Box, Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/system';
import { ArrowBack, DiamondOutlined, StarBorder } from '@mui/icons-material';

interface InfoModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isKingStarter: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const InfoModal = (props: InfoModalProps) => {
  const { isOpen, setOpen, isKingStarter } = props;
  return (
    <Dialog fullScreen open={isOpen} onClose={() => setOpen(false)} TransitionComponent={Transition}>
      <DialogContainer king={isKingStarter ? 1 : 0}>
        <DialogHeader>
          <BackButton onClick={() => setOpen(false)}>
            <ArrowBack />
            BACK
          </BackButton>
        </DialogHeader>
        <DialogContent>
          <DialogLogo>
            {isKingStarter ? (
              <StarBorder sx={{ width: '25px', height: '25px', color: '#FFD583' }} />
            ) : (
              <DiamondOutlined sx={{ width: '25px', height: '25px', color: '#A47FDB' }} />
            )}
            <p>
              <span style={{ fontFamily: 'gotham-bold' }}>King</span>
              {isKingStarter ? 'Starter' : 'Sale'}
            </p>
          </DialogLogo>
          <DialogContentText>
            {isKingStarter ? (
              <p>
                Welcome to your most assured VIP investment experience, welcome to Kingstarter. <br />
                <br /> If you have a Kingpass, you are eligible to this priviledged function where you have a guaranteed
                allocation in our listed projects. <br />
                <br /> If you don’t own a Kingpass, make sure to check{' '}
                <ALink href="https://kingpass.finance" rel="noopener noreferrer" target="_blank">
                  kingpass.finance
                </ALink>
                .
              </p>
            ) : (
              <p>
                Investing early, made simple. Kingsale is a public modality of launch built for anyone who wishes to
                participate with the crowd and get a possible allocation of the projects listing in KingPad. <br />
                <br /> It allows users to invest in new projects by purchasing the tokens being offered during the
                public launch. <br />
                <br /> Kingsale is designed to be accessible to everyone and provides an opportunity for retail
                investors to get in on the ground floor of emerging projects.
              </p>
            )}
            nulla pariatur.
          </DialogContentText>
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

const DialogContainer = styled(Box)<{ king: number }>(({ theme, king }) => ({
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '75px',
  gap: '40px',
  height: '100%',
  alignItems: 'center',
  color: '#ffffff',
  backgroundColor: king === 1 ? '#8462F6' : '#1A003E'
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
}));

const BackButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '8px',
  fontFamily: 'gotham-bold'
}));

const DialogContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '640px'
}));

const DialogLogo = styled(Box)(({ theme }) => ({
  paddingLeft: '5px',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontSize: '20px',
  gap: '10px',
  '&.p': {
    fontFamily: 'gotham-book'
  }
}));

const DialogContentText = styled(Box)(({ theme }) => ({
  fontSize: '12px'
}));

const ALink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  outline: 'none',
  color: 'inherit'
}));

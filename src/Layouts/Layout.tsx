import { ToastContainer } from 'react-toastify';

import { Header } from './Header';
import { Footer } from './Footer';
import { KingPadSideBar } from './Sidebar';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/home-new" element={<></>} />
        <Route
          path="*"
          element={
            <>
              <Wrapper>
                <KingPadSideBar />
                <ContentWrapper>
                  <ContentContainer>{children}</ContentContainer>
                </ContentWrapper>
              </Wrapper>
              <Footer />
            </>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        style={{ zIndex: 1000, marginTop: '80px' }}
      />
    </>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  marginTop: '75px'
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: '30px 45px',
  width: '100%',
  maxWidth: '1440px',
  [theme.breakpoints.down('desktop')]: {
    padding: '30px 40px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '30px 20px'
  }
}));

import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { BannerCard } from './BannerCard';

export const KYCPage = () => {
  return (
    <KYCPageContainer>
      <BannerCard />
      <KYCPageContent>
        <KYCPageTitle>
          <KYCPagePrimaryTitle>Kingpad and AssureDeFi</KYCPagePrimaryTitle>
          <KYCPageSecondaryTitle>Elite KYC services</KYCPageSecondaryTitle>
        </KYCPageTitle>
        <KYCPageTextContainer>
          <KYCPageText>
            The primary objective of King is to create a safe and secure investment space for all users. Assure Defi has
            an excellent track record in providing top-notch auditing and KYC services for various blockchain projects.{' '}
            <br />
            <br />
            Our partnership with Assure Defi will enable us to verify the identity of our users and ensure that our
            platform complies with all relevant regulations. This will give our users peace of mind and enable them to
            invest with confidence, knowing that they are using a secure and trustworthy platform. <br />
            <br />
            In addition, we are proud to say that our partnership with Assure Defi goes beyond just KYC and auditing
            services. In the unfortunate event that any fraudulent activities or scams occur on our platform.
          </KYCPageText>
          <KYCPageText>
            Assure Defi will handle all the legal reports against the potential scammers. This additional measure
            demonstrates our commitment to providing a safer and more secure investment environment for our users.
            <br />
            <br />
            Overall, we believe that our partnership with Assure Defi is a significant step in making KingPad the first
            choice for investors who prioritize security and transparency.
          </KYCPageText>
        </KYCPageTextContainer>
      </KYCPageContent>
    </KYCPageContainer>
  );
};

const KYCPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px'
}));

const KYCPageContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  padding: '0 40px 40px 40px',
  [theme.breakpoints.down(420)]: {
    padding: '0 20px 20px 40px'
  }
}));

const KYCPageTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
}));

const KYCPagePrimaryTitle = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down(500)]: {
    fontSize: '25px'
  },
  [theme.breakpoints.down(450)]: {
    fontSize: '20px'
  },
  [theme.breakpoints.down(360)]: {
    fontSize: '17px'
  }
  // [theme.breakpoints.down(370)]: {
  //   fontSize: '20px'
  // }
}));

const KYCPageSecondaryTitle = styled(Box)(({ theme }) => ({
  fontSize: '19px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down(450)]: {
    fontSize: '14px'
  }
}));

const KYCPageTextContainer = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: 'gotham-book',
  display: 'flex',
  gap: '67px',
  [theme.breakpoints.down(1250)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(640)]: {
    flexDirection: 'column',
    gap: '20px'
  }
}));

const KYCPageText = styled(Box)(({ theme }) => ({
  width: '381px',
  [theme.breakpoints.down(1400)]: {
    width: '320px'
  },
  [theme.breakpoints.down(1150)]: {
    width: 'auto'
  }
}));

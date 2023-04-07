import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { BannerCard } from './BannerCard';

export const AuditPage = () => {
  return (
    <AuditPageContainer>
      <BannerCard />
      <AuditPageContent>
        <AuditPageTitle>
          <AuditPagePrimaryTitle>Kingpad and Certik</AuditPagePrimaryTitle>
          <AuditPageSecondaryTitle>Elite auditing services</AuditPageSecondaryTitle>
        </AuditPageTitle>
        <AuditPageTextContainer>
          <AuditPageText>
            Kingpad and Certik are two prominent names in the blockchain and cryptocurrency industry, known for our
            commitment to quality and security. Our partnership offers startups launching on the King platform the best
            auditing quality and reputation, ensuring the best turnout for customers. <br />
            <br /> Kingpad is a platform that connects blockchain startups with investors, providing an opportunity for
            startups to launch their projects to a global audience. The platform offers various features such as
            fundraising, token distribution, and community building, making it an attractive option for entrepreneurs
            looking to launch their blockchain projects. <br />
            <br /> On the other hand, Certik is a leading blockchain security firm that specializes in smart contract
            audits and cybersecurity. Certik has an impressive track record of auditing and securing blockchain
            projects. Their unique approach to security has earned them a reputation as one of the most trusted names in
            the industry.
          </AuditPageText>
          <AuditPageText>
            Through this partnership, Kingpad and Certik work together to provide startups launching on our platform
            with the best auditing quality and reputation. Certik’s team of experienced auditors will conduct a thorough
            audit of each project, ensuring that it meets the highest standards of security and quality. <br />
            <br /> This audit process provides startups with the assurance that their project is secure and reliable,
            giving customers the confidence to invest comfortably. <br />
            <br /> The cooperation between Kingpad and Certik is a significant development in the blockchain industry,
            as it guarantees startups launching on Kingpad a fast, accurate and affordable way to be framed by the
            auditing leader in the space.
          </AuditPageText>
        </AuditPageTextContainer>
      </AuditPageContent>
    </AuditPageContainer>
  );
};

const AuditPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px'
}));

const AuditPageContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  padding: '0 40px 40px 40px',
  [theme.breakpoints.down(420)]: {
    padding: '0 20px 20px 40px'
  }
}));

const AuditPageTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
}));

const AuditPagePrimaryTitle = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down(420)]: {
    fontSize: '24px'
  }
  // [theme.breakpoints.down(370)]: {
  //   fontSize: '20px'
  // }
}));

const AuditPageSecondaryTitle = styled(Box)(({ theme }) => ({
  fontSize: '19px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down(420)]: {
    fontSize: '16px'
  }
}));

const AuditPageTextContainer = styled(Box)(({ theme }) => ({
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

const AuditPageText = styled(Box)(({ theme }) => ({
  width: '381px',
  [theme.breakpoints.down(1400)]: {
    width: '320px'
  },
  [theme.breakpoints.down(1150)]: {
    width: 'auto'
  }
}));

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { getBadgeNames, getProjectDetailsById } from 'src/Contracts';
import {
  InHouseBadge,
  EndorsedBadge,
  BoostBadge,
  AuditCertikBadge,
  AuditGenericBadge,
  KYCBadge,
  AuditIconSvg,
  KycIconSvg,
  BoostIconSvg,
  EndorsedIconSvg,
  CertikAuditIconSvg,
  InHouseIconSvg
} from 'src/Config/Images';

const badgeColor = ['#fc8fc8', '#ffca01', '#ff513f', '#000000', '#00f69b', '#329AFF'];
const badgeImgs = [InHouseBadge, EndorsedBadge, BoostBadge, AuditCertikBadge, AuditGenericBadge, KYCBadge];
const badgeIcons = [InHouseIconSvg, EndorsedIconSvg, BoostIconSvg, CertikAuditIconSvg, AuditIconSvg, KycIconSvg];

export const CoinStatus = (props: { isMobile: boolean; projectId: number }) => {
  const { isMobile, projectId } = props;
  const [badgeNames, setBadgeNames] = useState<string[]>();
  const [badgeIds, setBadgeIds] = useState<number[]>();

  const getBadges = async () => {
    const response = await getBadgeNames(projectId);
    if (response !== undefined) {
      setBadgeNames(response.names);
      setBadgeIds(response.badgeIds);
    }
  };

  useEffect(() => {
    getBadges();
  }, []);

  const BadgeJsx = () => {
    if (badgeNames !== undefined && badgeIds !== undefined) {
      const len = badgeNames.length;
      const jsxElements = [];
      for (let i = 0; i < len; i++) {
        jsxElements.push(
          <CoinStatusWrapper key={i} sx={{ backgroundColor: badgeColor[badgeIds[i] - 1] }}>
            <Circle>
              <img src={badgeImgs[badgeIds[i] - 1]} alt={`coin-image-${i}`} />
            </Circle>
            {badgeNames?.[i]}
          </CoinStatusWrapper>
        );
      }
      return jsxElements;
    }
  };

  return <CoinStatusContainer mobile={isMobile ? 1 : 0}>{BadgeJsx()}</CoinStatusContainer>;
};

export const CoinStatusOnlyIcon = (props: { projectId: number }) => {
  const { projectId } = props;
  const [badgeNames, setBadgeNames] = useState<string[]>();
  const [badgeIds, setBadgeIds] = useState<number[]>();

  const getBadges = async () => {
    const response = await getBadgeNames(projectId);
    if (response !== undefined) {
      setBadgeNames(response.names);
      setBadgeIds(response.badgeIds);
    }
  };

  useEffect(() => {
    getBadges();
  }, []);

  const BadgeJsx = () => {
    if (badgeNames !== undefined && badgeIds !== undefined) {
      const len = badgeNames.length;
      const jsxElements = [];
      for (let i = 0; i < len; i++) {
        jsxElements.push(
          <CircleIcon key={i}>
            <Img src={badgeIcons[badgeIds[i] - 1]} alt={`coin-icon-${i}`} />
          </CircleIcon>
        );
      }
      return jsxElements;
    }
  };

  return <CoinStatusOnlyIconContainer>{BadgeJsx()}</CoinStatusOnlyIconContainer>;
};

const CoinStatusContainer = styled(Box)<{ mobile: number }>(({ theme, mobile }) => ({
  display: mobile === 1 ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '350px',
  flexWrap: 'wrap',
  gap: '15px',
  height: '53px',
  paddingBottom: mobile === 1 ? '20px' : '0px',
  [theme.breakpoints.down(1100)]: {
    width: '310px'
  },
  [theme.breakpoints.down(768)]: {
    display: mobile === 1 ? 'flex' : 'none',
    height: '80px',
    width: '350px'
  }
}));

const CoinStatusWrapper = styled(Box)(({ theme }) => ({
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '0px 20px 20px 0px',
  padding: '3px 6px 3px 3px',
  display: 'flex',
  alignItems: 'center',
  gap: '3.5px',
  textTransform: 'uppercase',
  fontSize: '14px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF',
  [theme.breakpoints.down(1240)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(768)]: {
    fontSize: '14px'
  },
  [theme.breakpoints.down(380)]: {
    fontSize: '9px',
    gap: '2px'
  }
}));

const Circle = styled(Box)(({ theme }) => ({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down(380)]: {
    width: '14px',
    height: '14px'
  }
}));

const CoinStatusOnlyIconContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: '4.5px',
  width: '45px',
  [theme.breakpoints.down(385)]: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const CircleIcon = styled(Box)(({ theme }) => ({
  width: '20px',
  height: '20px',
  minWidth: '20px',
  borderRadius: '50%',
  backgroundColor: '#FFFFFF'
}));

const Img = styled('img')(({ theme }) => ({
  backgroundColor: theme.palette.dark.main
}));

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const LaunchConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const isReady = mounted && authenticationStatus !== 'loading';
        const hasConnected =
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          isReady &&
          account != null &&
          chain != null &&
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!isReady && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
          >
            {(() => {
              if (!hasConnected) {
                return (
                  <LaunchButton onClick={openConnectModal} type="button">
                    Connect Wallet
                  </LaunchButton>
                );
              }
              if (chain.unsupported ?? false) {
                return (
                  <LaunchButton onClick={openChainModal} type="button">
                    Wrong Network
                  </LaunchButton>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <AwesomeButtonContainer
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4
                        }}
                      >
                        {chain.iconUrl != null && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </AwesomeButtonContainer> */}
                  <LaunchButton onClick={openAccountModal} type="button">
                    {account.displayName}
                    {/* {account.displayBalance != null ? ` (${account.displayBalance})` : ''} */}
                  </LaunchButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

const LaunchButton = styled(Button)(({ theme }) => ({
  padding: '15px',
  fontSize: '18px',
  textAlign: 'center',
  backgroundColor: '#8462F6',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  color: '#FFFFFF',
  width: '100%',
  marginTop: '37px',
  fontFamily: 'gotham-bold',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px'
  }
}));

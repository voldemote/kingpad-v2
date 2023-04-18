import { useConnect } from 'wagmi';
import { KingpadWalletConnectButton } from './WalletConnect/button';

export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  return (
    <>
      {' '}
      <KingpadWalletConnectButton />
      <div>
        {connectors.map((connector) => (
          <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ))}

        {error && <div>{error.message}</div>}
      </div>
    </>
  );
}

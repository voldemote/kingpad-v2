import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

export const useIsMounted = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return isMounted;
};

export const Connect = () => {
  const isMounted = useIsMounted();
  const { connector, isReconnecting } = useAccount();
  const { connect, connectors, isLoading, error, pendingConnector } = useConnect();

  return (
    <div>
      <div>
        {connectors?.map((x, i) => (
          <button
            disabled={x.ready || isReconnecting || connector?.id === x.id}
            key={`${x.name}_${i}`}
            onClick={() => connect({ connector: x })}
          >
            {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {isLoading && x.id === pendingConnector?.id && '…'}
          </button>
        ))}
      </div>

      <div>{error?.message}</div>
    </div>
  );
};

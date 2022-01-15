import { useEffect, useState } from "react";

export default function Balance({ state: metaState }) {
  const [balance, setBalance] = useState();

  useEffect(() => {
    const { account, isConnected, web3 } = metaState;
    if (account.length && isConnected && web3) {
      (async () => {
        let balance;
        balance = await metaState.web3.getBalance(metaState.account[0]);
        setBalance(parseFloat(balance / 10 ** 18).toFixed(3));
      })();
    }
  }, [metaState]);
  return <span>{Number(balance) ? <code>{balance} ETH</code> : 0}</span>;
}

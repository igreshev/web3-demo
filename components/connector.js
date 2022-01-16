import { useEffect } from "react";
import useMetamask from "../lib/use-metamask";
import { ethers } from "ethers";

export default function Connector() {
  const { connect, metaState } = useMetamask();

  useEffect(() => {
    if (metaState.isAvailable && !metaState.isConnected) {
      (async () => {
        try {
          // await connect(Web3);
          await connect(ethers.providers.Web3Provider, "any");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [metaState.isAvailable]);

  return (
    <a
      className="block px-6 py-3 text-sm text-gray-500 hover:text-gray-700 font-bold border border-gray-100 hover:border-gray-200 rounded"
      href="#"
      onClick={async (event) => {
        try {
          if (!metaState.isAvailable) {
            window.open("https://metamask.io");
          }
          event.preventDefault();
          await connect(Web3);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Connect Wallet
    </a>
  );
}

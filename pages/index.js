import Head from "next/head";
import Navigation from "../components/navigation.js";
import TokensContainer from "../components/tokensContainer.js";
import { MetamaskStateProvider } from "../lib/use-metamask";
import tokens from "../lib/tokens";

export default function Home() {
  return (
    <MetamaskStateProvider>
      <>
        <Head>
          <title>web3 Demo</title>
          <meta name="description" content="web3 demo connection to MetaMask" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <TokensContainer tokens={tokens} />
      </>
    </MetamaskStateProvider>
  );
}

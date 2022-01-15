import Head from "next/head";
import Navigation from "../components/navigation.js";
import { MetamaskStateProvider } from "../lib/use-metamask";

export default function Home() {
  return (
    <MetamaskStateProvider>
      <div>
        <Head>
          <title>web3 Demo</title>
          <meta name="description" content="web3 demo connection to MetaMask" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Navigation />
      </div>
    </MetamaskStateProvider>
  );
}

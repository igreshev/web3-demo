import Connector from "./connector";
import Status from "./status";
import Warning from "../components/warning.js";
import useMetamask from "../lib/use-metamask";

export default function Navigation() {
  const { metaState } = useMetamask();
  return (
    <div>
      {metaState.isConnected
        ? metaState.chain.id !== null &&
          metaState.chain.id !== "1" && (
            <Warning text="You are using one of Ethereum Test Networks" />
          )
        : null}

      <nav className="relative py-8 bg-transparent">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center">
            <a className="text-gray-600 text-2xl leading-none" href="#">
              <img className="h-8" src="images/logos/nexo.svg" width="auto" />
            </a>
            <ul className="hidden lg:flex items-center w-auto space-x-12">
              <li>{metaState.isConnected ? <Status /> : <Connector />}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

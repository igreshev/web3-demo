import Balance from "./balance";
import useMetamask from "../lib/use-metamask";

const format = (addr) => addr.substring(0, 6) + "..." + addr.slice(-4);

export default function Status() {
  const { metaState } = useMetamask();

  return (
    <div className="block px-6 py-3 text-sm text-gray-500 font-bold border border-gray-100 rounded">
      <Balance state={metaState} />{" "}
      {metaState.chain.id && <span>{metaState.chain.name}</span>}{" "}
      {metaState.account.length > 0 && (
        <span>{format(metaState.account[0])}</span>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import useMetamask from "../lib/use-metamask";
import { Contract } from "ethers";
import swap from "../lib/uniswap3";

// The minimum ABI to get ERC20 Token balance
let abi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

function TokenItem({ token, metaState }) {
  let contract = new Contract(token.address, abi, metaState.web3);
  let [info, setInfo] = useState([]);

  useEffect(() => {
    (async () => {
      let decimals = await contract.decimals();
      let balance = await contract.balanceOf(metaState.account[0]);
      let totalSupply = await contract.totalSupply();
      let symbol = await contract.symbol();

      setInfo([
        symbol,
        parseFloat(balance / 10 ** decimals),
        parseInt(totalSupply / 10 ** decimals),
      ]);
    })();
  }, []);

  if (info.length === 0) {
    return null;
  }

  return (
    <ul>
      <li>
        <img
          className="h-6 inline"
          src={`images/logos/${info[0].toLowerCase()}.svg`}
        ></img>{" "}
        <span>
          {info[0]} {info[1]} / {info[2]}
        </span>
      </li>
    </ul>
  );
}

export default function TokensContainer({ tokens }) {
  const { metaState } = useMetamask();

  if (
    !metaState.isConnected ||
    metaState.account.length === 0 ||
    !metaState.chain.id
  )
    return null;

  const tokenItems = tokens[metaState.chain.name].map((token) => (
    <TokenItem
      key={token.address.toString()}
      token={token}
      metaState={metaState}
    />
  ));

  return (
    <div className="container mx-auto text-sm text-gray-500">
      <ul>{tokenItems}</ul>
      <br />
      <button
        className="px-6 py-3 mr-4 text-sm bg-gray-500 hover:bg-gray-600 text-gray-50 font-semibold rounded"
        onClick={() => {
          swap(metaState);
        }}
      >
        swap using uniswap v3 sdk (WIP)
      </button>
    </div>
  );
}

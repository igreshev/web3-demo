import { useEffect, useState } from "react";
import useMetamask from "../lib/use-metamask";
import { Contract } from "ethers";

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
  console.log(metaState);

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

  return (
    <div>
      {info[0]} balance: {info[1]} total: {info[2]}
    </div>
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

  console.log("META", metaState);

  console.log(metaState.chain.name);

  const tokenItems = tokens[metaState.chain.name].map((token) => (
    <TokenItem
      key={token.address.toString()}
      token={token}
      metaState={metaState}
    />
  ));

  return <ul className="container mx-auto">{tokenItems}</ul>;
}
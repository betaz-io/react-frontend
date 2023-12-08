import BN from "bn.js";
import toast from "react-hot-toast";
import { Keyring } from "@polkadot/api";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { ContractPromise, Abi } from "@polkadot/api-contract";
import { formatQueryResultToNumber, convertToBalance } from "utils";
import { checkBalance } from "utils";
import { web3FromSource } from "@polkadot/extension-dapp";
import { delay } from "utils";

let contract;

export const setDiaContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function getRandomNumberForRound(caller, round) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query["getRandomNumberForRound"](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      { u64: round }
    );

    if (result.isOk) {
      const a = output.toHuman().Ok;
      return a;
    }
  } catch (error) {
    console.log("@_@ ", "getRandomNumberForRound", " error >>", error.message);
  }

  return null;
}

const contract_calls = { getRandomNumberForRound };

export default contract_calls;

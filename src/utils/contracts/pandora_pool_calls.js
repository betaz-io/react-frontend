import BN from "bn.js";
import toast from "react-hot-toast";
import { Keyring } from "@polkadot/api";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { ContractPromise, Abi } from "@polkadot/api-contract";
import { formatQueryResultToNumber, convertToBalance } from "utils";
import { checkBalance } from "utils";
import { web3FromSource } from "@polkadot/extension-dapp";
import pandora_pool_contract from "./pandora_pool";
import { delay } from "utils";

let contract;

export const setPandoraPoolContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

const contract_calls = {};

export default contract_calls;

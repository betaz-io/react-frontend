import BN from "bn.js";
import toast from "react-hot-toast";
import { Keyring } from "@polkadot/api";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { ContractPromise, Abi } from "@polkadot/api-contract";
import { formatQueryResultToNumber, convertToBalance } from "utils";
import { checkBalance } from "utils";
import { web3FromSource } from "@polkadot/extension-dapp";
import sale_pool_contract from "./sale_pool";
import { delay } from "utils";

let contract;

export const setSalePoolContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function buy(caller, amount, fee) {
  if (!contract || !caller?.address) {
    return null;
  }

  if (parseFloat(amount) <= 0) {
    toast.error(`invalid inputs`);
    return;
  }

  let unsubscribe;
  let gasLimit;

  const { signer } = await web3FromSource(caller?.meta?.source);
  let value = convertToBalance(fee);

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "salePoolTrait::buyWithSalePool",
    convertToBalance(amount)
  );

  await contract.tx["salePoolTrait::buyWithSalePool"](
    { gasLimit, value },
    convertToBalance(amount)
  )
    .signAndSend(
      caller?.address,
      { signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            console.log(dispatchError);
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === "0") toast.success(`Buy Bet AZ token ...`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function getSalePoolRemainingAmount(caller, poolType) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "salePoolTrait::getPoolSaleTotalRemainingAmount"
    ](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      poolType
    );
    if (result.isOk) {
      return formatQueryResultToNumber(output);
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getTokenRatio(caller, poolType) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "salePoolTrait::getPoolSaleInfo"
    ](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      poolType
    );
    if (result.isOk) {
      const a = output.toHuman().Ok?.price?.replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    return null;
  }

  return null;
}

const contract_calls = {
  buy,
  getSalePoolRemainingAmount,
  getTokenRatio,
};

export default contract_calls;

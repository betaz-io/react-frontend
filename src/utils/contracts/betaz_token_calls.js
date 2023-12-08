import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { web3FromSource } from "@polkadot/extension-dapp";
import { formatQueryResultToNumber, convertToBalance } from "utils";

let contract;

export const setBetazTokenContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function buy(caller, amount) {
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
  let value = convertToBalance(amount);

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "betAZTrait::buyToken"
  );

  await contract.tx["betAZTrait::buyToken"]({ gasLimit, value })
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

async function getAmountTokenSold(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "betAZTrait::getAmountTokenSold"
    ](caller, {
      value: azero_value,
      gasLimit,
    });
    if (result.isOk) {
      return formatQueryResultToNumber(output);
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getMaxBuyAmount(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "betAZTrait::getMaxBuyAmount"
    ](caller, {
      value: azero_value,
      gasLimit,
    });
    if (result.isOk) {
      return formatQueryResultToNumber(output);
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getTokenRatio(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "betAZTrait::getTokenRatio"
    ](caller, {
      value: azero_value,
      gasLimit,
    });
    if (result.isOk) {
      const a = output.toHuman().Ok.replace(/\,/g, "");
      return a;
    }
  } catch (e) {
    return null;
  }

  return null;
}

const contract_calls = {
  buy,
  getAmountTokenSold,
  getMaxBuyAmount,
  getTokenRatio,
};

export default contract_calls;

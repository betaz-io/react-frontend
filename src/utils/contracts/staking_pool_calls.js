import BN from "bn.js";
import toast from "react-hot-toast";
import { Keyring } from "@polkadot/api";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { ContractPromise, Abi } from "@polkadot/api-contract";
import { formatQueryResultToNumber, convertToBalance } from "utils";
import { checkBalance } from "utils";
import { web3FromSource } from "@polkadot/extension-dapp";
import staking_pool_contract from "./staking_pool";
import { delay } from "utils";

let contract;

export const setStakingPoolContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function getRequestTimeUnstake(caller, amount) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "stakingPoolTrait::getRequestUnstakeTime"
    ](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      caller,
      amount
    );
    if (result.isOk) {
      return output?.toHuman().Ok;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getlimitTimeUnstake(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "stakingPoolTrait::getLimitUnstakeTime"
    ](caller, {
      value: azero_value,
      gasLimit,
    });
    if (result.isOk) {
      return output?.toHuman().Ok;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function requestUnstakeAndCallsEvent(caller, amount) {
  if (!contract || !caller?.address) {
    return null;
  }

  if (parseFloat(amount) <= 0) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;
  let gasLimit;

  if (!checkBalance(caller, 0.005)) {
    toast.error("You don’t have enough azero for transaction fee!");
    return;
  }

  const { signer } = await web3FromSource(caller?.meta?.source);
  let value = 0;

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "requestUnstake",
    amount
  );

  await contract.tx["requestUnstake"]({ gasLimit, value }, amount)
    .signAndSend(
      caller?.address,
      { signer },
      async ({ events = [], status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            console.log(dispatchError);
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (Object.keys(status.toHuman())[0] === "0") {
          toast.success(`Processing ...`);
        }

        if (status.isInBlock || status.isFinalized) {
          events.forEach(async ({ event: { method, data, section } }) => {
            if (section === "contracts" && method === "ContractEmitted") {
              const [accId, bytes] = data.map((data, _) => data).slice(0, 2);

              const contract_address = accId.toString();

              if (contract_address === staking_pool_contract.CONTRACT_ADDRESS) {
                const abi_contract = new Abi(
                  staking_pool_contract.CONTRACT_ABI
                );

                const decodedEvent = abi_contract.decodeEvent(bytes);

                let event_name = decodedEvent.event.identifier;

                if (event_name === "RequestUnstakeEvent") {
                  const eventValues = [];
                  if (status.isFinalized) {
                    console.log(`Request wnstake finalized`);

                    for (let i = 0; i < decodedEvent.args.length; i++) {
                      const value = decodedEvent.args[i];
                      eventValues.push(value.toString());
                    }

                    let request_unstake_info = {
                      account: eventValues[2],
                      amount: eventValues[3],
                      time: eventValues[4],
                    };

                    console.log({ request_unstake_info });
                  }
                }
              }
            }
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => {
      console.log("error", error);
      toast.error(`Error: ${error}.`);
    });

  return unsubscribe;
}

const contract_calls = {
  getRequestTimeUnstake,
  getlimitTimeUnstake,
  requestUnstakeAndCallsEvent,
};

export default contract_calls;

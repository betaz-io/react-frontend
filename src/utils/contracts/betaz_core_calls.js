import BN from "bn.js";
import toast from "react-hot-toast";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { web3FromSource } from "@polkadot/extension-dapp";
import {
  formatQueryResultToNumber,
  convertToBalance,
  checkBalance,
} from "utils";
import betaz_core_contract from "./betaz_core";

let contract;

export const setBetazCoreContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

//get_max_bet
async function getMaxBet(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  //console.log(contract);

  try {
    const { result, output } = await contract.query[
      "betA0CoreTrait::getMaxBet"
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

async function play(caller, amount, bet_number, is_over) {
  if (!contract || !caller?.address) {
    return null;
  }

  if (parseFloat(amount) <= 0) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;
  let gasLimit;

  if (is_over) is_over = 1;
  else is_over = 0;

  if (!checkBalance(caller, 0.005)) {
    toast.error("You don’t have enough azero for transaction fee!");
    return;
  }

  const { signer } = await web3FromSource(caller?.meta?.source);
  let value = convertToBalance(amount);

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "play",
    bet_number,
    is_over
  );

  await contract.tx["play"]({ gasLimit, value }, bet_number, is_over)
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
          if (statusText === "0") toast.success(`Playing Bet ...`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function finalize(caller) {
  if (!contract || !caller?.address) {
    return null;
  }

  let gasLimit;

  if (!checkBalance(caller, 0.005)) {
    toast.error("You don’t have enough azero for transaction fee!");
    return null;
  }

  const { signer } = await web3FromSource(caller?.meta?.source);
  let value = 0;

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "finalize"
  );

  return new Promise((resolve, reject) => {
    contract.tx["finalize"]({ gasLimit, value })
      .signAndSend(
        caller?.address,
        { signer },
        async ({ status, dispatchError, events }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              console.log(dispatchError);
              toast.error(`There is some error with your request`);
              reject(dispatchError); // Reject the promise with the error
            } else {
              console.log("dispatchError", dispatchError.toString());
              reject(dispatchError); // Reject the promise with the error
            }
          }

          if (status.isInBlock || status.isFinalized) {
            events?.forEach(
              async ({ event: { data, method, section }, phase }) => {
                if (section === "contracts" && method === "ContractEmitted") {
                  const [accId, bytes] = data
                    .map((data, _) => data)
                    .slice(0, 2);

                  const contract_address = accId.toString();

                  if (
                    contract_address === betaz_core_contract.CONTRACT_ADDRESS
                  ) {
                    const abi_contract = new Abi(
                      betaz_core_contract.CONTRACT_ABI
                    );

                    const decodedEvent = abi_contract.decodeEvent(bytes);

                    let event_name = decodedEvent.event.identifier;

                    if (
                      event_name === "WinEvent" ||
                      event_name === "LoseEvent"
                    ) {
                      const eventValues = [];
                      if (status.isFinalized) {
                        console.log(`player ${caller.address} finalized`);

                        for (let i = 0; i < decodedEvent.args.length; i++) {
                          const value = decodedEvent.args[i];
                          eventValues.push(value.toString());
                        }

                        if (event_name === "LoseEvent") {
                          let obj = {
                            random_number: eventValues[2],
                            is_win: false,
                          };
                          resolve(obj); // Resolve the promise with the result
                        } else if (event_name === "WinEvent") {
                          let obj = {
                            random_number: eventValues[2],
                            win_amount: eventValues[5]
                              ? eventValues[5] / 10 ** 12
                              : 0,
                            is_win: true,
                          };
                          resolve(obj); // Resolve the promise with the result
                        }
                      }
                    }
                  }
                }
              }
            );
          }
        }
      )
      .catch((e) => {
        console.log("e", e);
        reject(e); // Reject the promise with the error
      });
  });
}

async function getBet(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  //console.log(contract);

  try {
    const { result, output } = await contract.query["betA0CoreTrait::getBet"](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      caller
    );
    if (result.isOk) {
      const a = output.toHuman().Ok;
      return a;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getHoldAmountPlayers(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "betA0CoreTrait::getHoldAmountPlayers"
    ](
      caller?.address,
      {
        value: azero_value,
        gasLimit,
      },
      caller?.address
    );
    if (result.isOk) {
      return formatQueryResultToNumber(output);
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function withdrawHoldAmount(caller, amount) {
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
  let value = 0;
  amount = new BN(amount * 10 ** 6).mul(new BN(10 ** 6)).toString();

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "betA0CoreTrait::withdrawHoldAmount",
    caller?.address,
    amount
  );

  await contract.tx["betA0CoreTrait::withdrawHoldAmount"](
    { gasLimit, value },
    caller?.address,
    amount
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
          if (statusText === "0") toast.success(`Withdraw hold amount ...`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function setRate(caller, over, under) {
  if (!contract || !caller?.address) {
    return null;
  }

  let unsubscribe;
  let gasLimit;

  const { signer } = await web3FromSource(caller?.meta?.source);
  let value = 0;

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "betA0CoreTrait::setRates",
    over,
    under
  );

  await contract.tx["betA0CoreTrait::setRates"](
    { gasLimit, value },
    over,
    under
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
          if (statusText === "0") toast.success(`set rates ...`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

const contract_calls = {
  getMaxBet,
  play,
  finalize,
  getBet,
  getHoldAmountPlayers,
  withdrawHoldAmount,
  setRate
};

export default contract_calls;

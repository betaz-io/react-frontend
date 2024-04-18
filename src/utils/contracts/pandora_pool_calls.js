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

async function getHoldAmountPlayers(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "pandoraPoolTraits::getHoldAmountPlayers"
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

async function withdrawWinAmount(caller, amount) {
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
    "pandoraPoolTraits::withdrawHoldAmount",
    caller?.address,
    amount
  );

  await contract.tx["pandoraPoolTraits::withdrawHoldAmount"](
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
          if (statusText === "0") toast.success(`Withdraw win amount ...`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function pandoraPlay(caller, sessionId, betNumber, ticketId) {
  if (!contract || !caller?.address) {
    return null;
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
    "play",
    sessionId,
    betNumber,
    { u64: ticketId }
  );

  await contract.tx["pandoraPoolTraits::play"](
    { gasLimit, value },
    sessionId,
    betNumber,
    { u64: ticketId }
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

        if (status.isInBlock || status.isFinalize) {
          toast.success(`Playing bet by ticket #${ticketId} proccessing ...`);
        } else if (status.isFinalized) {
          toast.success(`Playing Bet by ticket #${ticketId} finalized`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => {
      console.log("e", e);
      toast.error(e.toString());
    });
  return unsubscribe;
}

const contract_calls = {
  getHoldAmountPlayers,
  withdrawWinAmount,
  pandoraPlay,
};

export default contract_calls;

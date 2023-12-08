import { BN, BN_ONE, formatBalance } from "@polkadot/util";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "@polkadot/extension-dapp";

let wsApi;

export function initialApi(a) {
  wsApi = a;
}

export const toastMessages = {
  NO_EXTENSION: "Your browser does NOT HAVE the required plugin.",
  NO_WALLET: "You haven't connected your wallet.",

  ERR_FETCHING_DATA: "Error during fetching data.",
  ERR_API_CONN: "Error occurred with API connection.",
  ERR_CONTRACT_DATA: "Error occurred when setting up a contract.",

  INVALID_ADDRESS: "Invalid contract address. Please try again.",
  NO_TOKEN_SELECTED: "You have not selected token yet!",
  CUSTOM: "An error occurred: ",
};

const toContractAbiMessage = (contractPromise, message) => {
  const value = contractPromise.abi.messages.find((m) => m.method === message);

  if (!value) {
    const messages = contractPromise?.abi.messages
      .map((m) => m.method)
      .join(", ");

    const error = `"${message}" not found in metadata.spec.messages: [${messages}]`;
    console.error(error);

    return { ok: false, error };
  }

  return { ok: true, value };
};

// getGasLimit
async function getGasLimit(
  api,
  userAddress,
  message,
  contract,
  options = {},
  args = []
) {
  const abiMessage = toContractAbiMessage(contract, message);

  if (!abiMessage.ok) return abiMessage;

  const { value, gasLimit, storageDepositLimit } = options;

  const { gasRequired } = await api.call.contractsApi.call(
    userAddress,
    contract.address,
    value ?? new BN(0),
    gasLimit ?? null,
    storageDepositLimit ?? null,
    abiMessage.value.toU8a(args)
  );

  const refTime = gasRequired.refTime.toHuman().replaceAll(",", "");
  const proofSize = gasRequired.proofSize.toHuman().replaceAll(",", "");

  const gasRequiredAdjust = api.registry.createType("WeightV2", {
    refTime: new BN(refTime * 10 ** 0).mul(new BN(2)),
    proofSize: new BN(proofSize * 10 ** 0).mul(new BN(2)),
  });

  return { ok: true, value: gasRequiredAdjust };
}

// getEstimatedGas
export async function getEstimatedGas(
  address,
  contract,
  value,
  queryName,
  ...args
) {
  const fetchGas = async () => {
    let ret;

    try {
      const gasLimitResult = await getGasLimit(
        contract?.api,
        address,
        queryName,
        contract,
        { value },
        args
      );

      if (!gasLimitResult.ok) {
        console.log(queryName, "getEstimatedGas err", gasLimitResult.error);
        return;
      }

      ret = gasLimitResult?.value;
    } catch (error) {
      console.log("error fetchGas xx>>", error.message);
    }

    return ret;
  };

  let result;

  await toast.promise(
    fetchGas().then((data) => (result = data)),
    {
      success: `Estimated transaction fee...`,
      error: "Could not fetching gas!",
    },
    {
      success: {
        icon: "🔥",
      },
    }
  );

  return result;
}

// readOnlyGasLimit
export function readOnlyGasLimit(contract) {
  if (!contract) {
    console.log("contract invalid...");
    return;
  }
  try {
    const ret = contract?.api?.registry?.createType("WeightV2", {
      refTime: new BN(1_000_000_000_000),
      proofSize: new BN(5_000_000_000_000).isub(BN_ONE),
    });

    return ret;
  } catch (error) {
    console.log("error", error);
  }
}

export async function execContractQuery(
  callerAddress, // -> currentAccount?.address
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  const contract = new ContractPromise(wsApi, contractAbi, contractAddress);

  const gasLimit = readOnlyGasLimit(contract);
  try {
    const { result, output } = await contract.query[queryName](
      callerAddress,
      { gasLimit, storageDepositLimit: null, value },
      ...args
    );

    if (result.isOk) {
      return output;
    }
  } catch (error) {
    console.log("@_@ ", queryName, " error >>", error.message);
  }
}

export async function execContractQuerybyMetadata(
  callerAddress, // -> currentAccount?.address
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  const contract = new ContractPromise(wsApi, contractAbi, contractAddress);

  const gasLimit = readOnlyGasLimit(contract);

  try {
    const { result, output } = await contract.query[queryName](
      callerAddress,
      { gasLimit, storageDepositLimit: null, value },
      ...args
    );

    if (result.isOk) {
      return output;
    }
  } catch (error) {
    console.log("@_@ ", queryName, " error >>", error.message);
  }
}

export async function execContractQuerybyMetadataConvertResult(
  callerAddress, // -> currentAccount?.address
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  const contract = new ContractPromise(wsApi, contractAbi, contractAddress);

  const gasLimit = readOnlyGasLimit(contract);

  try {
    const { result, output } = await contract.query[queryName](
      callerAddress,
      { gasLimit, storageDepositLimit: null, value },
      ...args
    );

    if (result.isOk) {
      const number = output.toHuman();
      return number.Ok;
    }
  } catch (error) {
    console.log("@_@ ", queryName, " error >>", error.message);
  }
}

export async function execContractTx(
  caller, // -> currentAccount Object
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  // console.log("execContractTx queryName", queryName);
  // console.log("execContractTx args", args);

  const azeroBalance = await getAzeroBalanceOfAddress({
    wsApi,
    address: caller?.address,
  });

  if (azeroBalance < 0.005) {
    toast.error("You don’t have enough azero for transaction fee!");
    return;
  }

  const contract = new ContractPromise(wsApi, contractAbi, contractAddress);

  let unsubscribe;
  const { signer } = await web3FromSource(caller?.meta?.source);

  const gasLimitResult = await getGasLimit(
    wsApi,
    caller?.address,
    queryName,
    contract,
    { value },
    args
  );

  if (!gasLimitResult.ok) {
    console.log(gasLimitResult.error);
    return;
  }

  const gasLimit = gasLimitResult?.value;

  const txNotSign = contract.tx[queryName]({ gasLimit, value }, ...args);

  await txNotSign
    .signAndSend(
      caller.address,
      { signer },
      ({ events = [], status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          txType: queryName,
          api: wsApi,
        });
        if (Object.keys(status.toHuman())[0] === "0") {
          toast.success(`Processing ...`);
        }

        events.forEach(({ event: { method } }) => {
          if (method === "ExtrinsicSuccess" && status.type === "Finalized") {
            toast.success("Successful!");
          } else if (method === "ExtrinsicFailed") {
            toast.error(`${toastMessages.CUSTOM} ${method}.`);
          }
        });
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => {
      console.log("error", error);
      toast.error(`${toastMessages.CUSTOM} ${error}.`);
    });

  return unsubscribe;
}

export async function getAzeroBalanceOfAddress({ address }) {
  if (!address || !wsApi) return console.log("acct , wsApi invalid!");
  if (!wsApi) {
    toast.error(toastMessages.ERR_API_CONN);
    return;
  }

  if (!address) {
    toast.error(toastMessages.NO_WALLET);
    return;
  }

  const {
    data: { free: balance, miscFrozen },
  } = await wsApi.query.system.account(address);

  const [chainDecimals] = await wsApi.registry.chainDecimals;

  const formattedStrBal = formatBalance(balance, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  const formattedStrBalMiscFrozen = formatBalance(miscFrozen, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  const formattedNumBal =
    formattedStrBal.replaceAll(",", "") * 1 -
    formattedStrBalMiscFrozen.replaceAll(",", "") * 1;

  return formattedNumBal;
}

export const txResponseErrorHandler = async ({
  status,
  dispatchError,
  txType,
  api,
}) => {
  const url = `https://test.azero.dev/#/explorer/query/`;
  const statusToHuman = Object.entries(status.toHuman());

  if (dispatchError) {
    if (dispatchError.isModule) {
      toast.error(`There is some error with your request... ..`);

      if (statusToHuman[0][0] === "Finalized") {
        const apiAt = await api?.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt?.query.system.events();

        const data = {
          ContractCall: txType,
          Reserved: 0,
          ReserveRepatriated: 0,
          FeePaid: 0,
          TotalCharge: 0,
          TxHash: "",
        };

        allEventsRecords.forEach(({ event }, index) => {
          if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
            data.FeePaid = -event.data[1]?.toString() / 10 ** 12;
          }

          if (api.events.balances?.Reserved.is(event)) {
            data.Reserved = -event.data[1]?.toString() / 10 ** 12;
          }

          if (api.events.balances?.ReserveRepatriated.is(event)) {
            data.ReserveRepatriated = event.data[2]?.toString() / 10 ** 12;
          }
        });

        data.TxHash = statusToHuman[0][1];

        data.TotalCharge =
          data.FeePaid + data.Reserved + data.ReserveRepatriated;

        console.log("Err tx fee: ", data);

        console.log("Err Tx Finalized at ", `${url}${statusToHuman[0][1]}`);
      }
    } else {
      console.log("dispatchError.toString()", dispatchError.toString());
    }
  }

  if (!dispatchError && status) {
    if (statusToHuman[0][0] === "Finalized") {
      const apiAt = await api.at(statusToHuman[0][1]);
      const allEventsRecords = await apiAt?.query?.system.events();

      const data = {
        ContractCall: txType,
        Reserved: 0,
        ReserveRepatriated: 0,
        FeePaid: 0,
        TotalCharge: 0,
        TxHash: "",
      };

      allEventsRecords.forEach(({ event }, index) => {
        if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
          data.FeePaid = -event.data[1]?.toString() / 10 ** 12;
        }

        if (api.events.balances?.Reserved.is(event)) {
          data.Reserved = -event.data[1]?.toString() / 10 ** 12;
        }

        if (api.events.balances?.ReserveRepatriated.is(event)) {
          data.ReserveRepatriated = event.data[2]?.toString() / 10 ** 12;
        }
      });

      data.TxHash = statusToHuman[0][1];

      data.TotalCharge = data.FeePaid + data.Reserved + data.ReserveRepatriated;

      console.log("Success tx fee: ", data);

      console.log("Tx Finalized at ", `${url}${statusToHuman[0][1]}`);
    }
  }
};

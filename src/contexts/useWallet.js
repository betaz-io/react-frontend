import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
// import { useNetwork } from "components/Network/useNetWork";
import { NetworkProvider } from "components/Network/useNetWork";
// import WalletConnectModal from "components/wallet/WalletConnectModal";
import {
  updateAccountsList,
  fetchBalance,
  fetchUserBalance,
  fetchRollNumbers,
  fetchRates,
  setCurrentAccount,
} from "store/slices/substrateSlice";
import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

import React, { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [currentAccount, setCurrentAccountWallet] = useState(null);
  // const [currentExtensions, setCurrentExtensions] = useState([]);
  const [walletAccounts, setWalletAccounts] = useState(null);
  const [api, setApi] = useState(null);

  const updateWalletAccount = async (account) => {
    try {
      setCurrentAccountWallet(account);
      localStorage.setItem("localCurrentAccount", JSON.stringify(account));
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  const logoutAccountHandler = () => {
    setCurrentAccountWallet(null);
    setWalletAccounts(null);
    dispatch(setCurrentAccount(null));
    localStorage.setItem("localCurrentAccount", null);
  };

  const initAlephNetwork = async (keyWallet) => {
    // await web3Enable(process.env.REACT_APP_NAME);
    const accounts = await web3Accounts();

    dispatch(
      updateAccountsList(accounts?.filter((e) => e?.meta?.source == keyWallet))
    );
    setWalletAccounts(accounts?.filter((e) => e?.meta?.source == keyWallet));
    // setCurrentExtensions(extentions);
  };

  const connectWallet = async (network, key) => {
    if (network == "aleph-zero") initAlephNetwork(key);
  };

  const initWallet = () => {
    const accountData = localStorage.getItem("localCurrentAccount");
    if (accountData) {
      // toast.success("Account connected");
      setCurrentAccountWallet(JSON.parse(accountData));
    }
  };

  useEffect(() => {
    initWallet();
  }, []);

  useEffect(() => {
    if (!currentAccount?.balance && api && currentAccount) {
      dispatch(fetchUserBalance());
      dispatch(fetchBalance());
      dispatch(fetchRollNumbers());
      dispatch(fetchRates());
    }

    // if (api && currentAccount) {
    // }
  }, [api, currentAccount]);
  return (
    <NetworkProvider>
      <WalletContext.Provider
        value={{
          api,
          setCurrentApi: setApi,
          currentAccount,
          updateWalletAccount,
          logoutAccountHandler,
          // updateExtentions: setCurrentExtensions,
          // currentExtensions,
          updateWalletAccounts: setWalletAccounts,
          walletAccounts,
          connectWallet,
        }}
      >
        {children}
      </WalletContext.Provider>
    </NetworkProvider>
  );
};

export const useWallet = () => useContext(WalletContext);

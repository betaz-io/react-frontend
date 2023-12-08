import { supportedChain } from "components/wallet/data";
import { createContext, useContext, useEffect, useState } from "react";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const updateNetwork = (network) => {
    setCurrentNetwork(network);
    localStorage.setItem("localCurrentNetwork", JSON.stringify(network));
  };

  useEffect(() => {
    const localNetwork = localStorage.getItem("localCurrentNetwork");
    if (localNetwork) {
      setCurrentNetwork(JSON.parse(localNetwork));
    } else {
      setCurrentNetwork(supportedChain[0]);
      localStorage.setItem(
        "localCurrentNetwork",
        JSON.stringify(supportedChain[0])
      );
    }
  }, []);
  return (
    <NetworkContext.Provider
      value={{
        currentNetwork,
        updateNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

import { Box, Text, Input, Flex } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { convertToBalance, isValidAddressPolkadotAddress } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import betaz_token_contract from "utils/contracts/betaz_token";
import betaz_core_contract from "utils/contracts/betaz_core";
import bet_random_contract from "utils/contracts/bet_random_contract";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance } from "store/slices/substrateSlice";
import { delay } from "utils";
import { getDomainToAddress } from "utils";
import betaz_dao_contract from "utils/contracts/betaz_dao";
import treasury_pool_contract from "utils/contracts/treasury_pool";
import staking_pool_contract from "utils/contracts/staking_pool";
import pandora_pool_contract from "utils/contracts/pandora_pool";
import sale_pool_contract from "utils/contracts/sale_pool";
import pandora_psp34_contract from "utils/contracts/pandora_psp34";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const minterRole = process.env.REACT_APP_MINTER_ROLE;

const ContractRolesManager = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [myRoles, setMyRoles] = useState("NOT ROLE");

  const roles = [
    {
      name: "HIGHEST",
      role: 0,
    },
    {
      name: "ADMINER",
      role: adminRole,
    },
    {
      name: "MINTER",
      role: minterRole,
    },
  ];

  /** Core contract Address manger */
  const betTokenAddressInit = [
    {
      name: "Role ADMINER",
      role: adminRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
    {
      name: "Role MINER",
      role: minterRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
  ];
  /** Core contract Address manger */
  const coreAddressInit = [
    {
      name: "Role ADMINER",
      role: adminRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
  ];
  /** Dao contract Address manger */
  const daoAddressInit = [
    {
      name: "Role ADMINER",
      role: adminRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
  ];
  /** Sale contract Address manger */
  const saleAddressInit = [
    {
      name: "Role ADMINER",
      role: adminRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
  ];
  /** Staking contract Address manger */
  const stakingAddressInit = [
    {
      name: "Role ADMINER",
      role: adminRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
  ];
  /** Pandora contract Address manger */
  const pandoraAddressInit = [
    {
      name: "Role ADMINER",
      role: adminRole,
      address: currentAccount?.address,
      txFn: "accessControl::grantRole",
      isLoading: false,
    },
  ];

  const [betTokenAddress, setBetTokenAddress] = useState(betTokenAddressInit);
  const [coreAddress, setCoreAddress] = useState(coreAddressInit);
  const [daoAddress, setdaoAddress] = useState(daoAddressInit);
  const [saleAddress, setSaleAddress] = useState(saleAddressInit);
  const [stakingAddress, setStakingAddress] = useState(stakingAddressInit);
  const [pandoraAddress, setPandoraAddress] = useState(pandoraAddressInit);

  const [currentTab, setCurrentTab] = useState(0);
  const tabsData = [
    {
      label: "Bet token roles manger",
      init: betTokenAddressInit,
      dataObj: betTokenAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleGrantRole(index, setFn, array),
      setFn: setBetTokenAddress,
      contract: betaz_token_contract,
    },
    {
      label: "Core contract roles manger",
      init: coreAddressInit,
      dataObj: coreAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleGrantRole(index, setFn, array),
      setFn: setCoreAddress,
      contract: betaz_core_contract,
    },
    {
      label: "DAO contract roles manger",
      init: daoAddressInit,
      dataObj: daoAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleGrantRole(index, setFn, array),
      setFn: setdaoAddress,
      contract: betaz_dao_contract,
    },
    {
      label: "Sale contract roles manger",
      init: saleAddressInit,
      dataObj: saleAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleGrantRole(index, setFn, array),
      setFn: setSaleAddress,
      contract: sale_pool_contract,
    },
    {
      label: "Staking contract roles manger",
      init: stakingAddressInit,
      dataObj: stakingAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleGrantRole(index, setFn, array),
      setFn: setStakingAddress,
      contract: staking_pool_contract,
    },
    {
      label: "Pandora contract roles manger",
      init: pandoraAddressInit,
      dataObj: pandoraAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleGrantRole(index, setFn, array),
      setFn: setPandoraAddress,
      contract: pandora_pool_contract,
    },
  ];

  const hasRole = async () => {
    const myRolesName = [];
    roles.forEach(async (item) => {
      const isRole = await execContractQuery(
        currentAccount?.address,
        tabsData[currentTab].contract.CONTRACT_ABI,
        tabsData[currentTab].contract.CONTRACT_ADDRESS,
        0,
        "accessControl::hasRole",
        item.role,
        currentAccount?.address
      );

      if (isRole && isRole?.toHuman().Ok) {
        myRolesName.push(item.name);
        setMyRoles((prevState) => {
          if (prevState != "NOT ROLE") {
            let text = myRolesName.join(", ");
            return text;
          }
        });
      }
    });
  };

  const OnChangeAddress = useCallback((e, index, setFn) => {
    const { value } = e.target;
    setFn((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], address: value };
      return newState;
    });
  });

  const setLoading = useCallback((index, isLoading, setFn) => {
    setFn((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], isLoading: isLoading };
      return newState;
    });
  });

  const handleGrantRole = async (index, setFn, array) => {
    const address = array[index]?.address;
    const txfn = array[index]?.txFn;
    const role = array[index]?.role;
    const contract = tabsData[currentTab]?.contract;
    console.log({ txfn, index, currentTab });
    if (!isValidAddressPolkadotAddress(address)) {
      toast.error("Invalid address");
      return;
    }

    let isAdmin = (
      await execContractQuery(
        currentAccount?.address,
        contract.CONTRACT_ABI,
        contract.CONTRACT_ADDRESS,
        0,
        "accessControl::hasRole",
        0,
        currentAccount?.address
      )
    )?.toHuman().Ok;

    if (!isAdmin) {
      toast.error("You not highest role!");
      return;
    } else {
      setLoading(index, true, setFn);
      await execContractTx(
        currentAccount,
        contract.CONTRACT_ABI,
        contract.CONTRACT_ADDRESS,
        0,
        txfn,
        role,
        address
      );
      setLoading(index, false, setFn);
    }
    await delay(2000);
    hasRole();
  };

  useEffect(() => {
    hasRole();
  }, [currentTab, currentAccount]);

  return (
    <>
      <SectionContainer
        className="deposit-box-container"
        sx={{ marginTop: "50px" }}
      >
        <Text className="deposit-box-title">Your role: {myRoles}</Text>
        <Box className="history-modal-tabs">
          {tabsData?.map((e, index) => {
            const isActive = currentTab === index;
            return (
              <Box
                key={`tab-${index}`}
                className={`history-modal-tab ${
                  isActive && "history-modal-tab-active"
                }`}
                onClick={() => setCurrentTab(index)}
              >
                <Text
                  fontSize={{ base: "16px", sm: "16px" }}
                  fontWeight={{ base: "500", sm: "700" }}
                  className={`history-modal-label ${
                    isActive && "history-modal-label-active"
                  }`}
                >
                  {e?.label}
                </Text>
              </Box>
            );
          })}
        </Box>

        <Box mt={"48px"}>
          {tabsData[currentTab].init.map((item, index) => (
            <Box className="deposit-box-amount-box" mt="24px">
              <Flex alignItems={"end"} gap={"24px"}>
                <Box flex={1}>
                  <Text>{item.name}</Text>
                  <Flex className="deposit-box-amount-input">
                    <Input
                      focusBorderColor="transparent"
                      sx={{ border: "0px" }}
                      value={
                        tabsData[currentTab].dataObj[index]?.contractAddress
                      }
                      onChange={(e) =>
                        tabsData[currentTab].onChange(
                          e,
                          index,
                          tabsData[currentTab].setFn
                        )
                      }
                      type="text"
                    />
                  </Flex>
                </Box>
                <Box>
                  <CommonButton
                    text="Grant role"
                    isLoading={tabsData[currentTab].dataObj[index]?.isLoading}
                    onClick={() =>
                      tabsData[currentTab].handleChange(
                        index,
                        tabsData[currentTab].setFn,
                        tabsData[currentTab].dataObj
                      )
                    }
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </SectionContainer>
    </>
  );
};

export default ContractRolesManager;

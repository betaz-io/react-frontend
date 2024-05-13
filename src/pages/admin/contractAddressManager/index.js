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

const ContractAddressManager = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount } = useSelector((s) => s.substrate);

  /** Core contract Address manger */
  const coreAddressInit = [
    {
      name: "Bet token address",
      contractAddress: betaz_token_contract.CONTRACT_ADDRESS,
      txFn: "betA0CoreTrait::setBetTokenAddress",
      isLoading: false,
    },
    {
      name: "Bet random address",
      contractAddress: bet_random_contract.CONTRACT_ADDRESS,
      txFn: "betA0CoreTrait::setOracleRandomnessAddress",
      isLoading: false,
    },
    {
      name: "Dao address",
      contractAddress: betaz_dao_contract.CONTRACT_ADDRESS,
      txFn: "betA0CoreTrait::setDaoAddress",
      isLoading: false,
    },
    {
      name: "Bet adress",
      contractAddress: "5GH7VSHJQBCBnAwkq9F88ukF7agUZhHxEDR6dRu9KgVD5P8t",
      txFn: "betA0CoreTrait::setBetazAddress",
      isLoading: false,
    },
    {
      name: "Treasury contract address",
      contractAddress: treasury_pool_contract.CONTRACT_ADDRESS,
      txFn: "betA0CoreTrait::setTreasuryAddress",
      isLoading: false,
    },
    {
      name: "Staking contract address",
      contractAddress: staking_pool_contract.CONTRACT_ADDRESS,
      txFn: "betA0CoreTrait::setStakingAddress",
      isLoading: false,
    },
    {
      name: "Pandora contract address",
      contractAddress: pandora_pool_contract.CONTRACT_ADDRESS,
      txFn: "betA0CoreTrait::setPandoraAddress",
      isLoading: false,
    },
  ];
  /** Core Random contract Address manger */
  const coreRandomAddressInit = [
    {
      name: "Randomness Oracle Contract Address",
      contractAddress: "5CSQdMyKCxtoeVsBC8xbufeapux3YDV74eYXcHV4UKUu1NeF",
      txFn: "setRandomnessOracleContractAddress",
      isLoading: false,
    },
  ];
  /** Dao contract Address manger */
  const daoAddressInit = [
    {
      name: "Core contract address",
      contractAddress: betaz_core_contract.CONTRACT_ADDRESS,
      txFn: "daoTrait::setCoreAddress",
      isLoading: false,
    },
  ];
  /** Sale contract Address manger */
  const saleAddressInit = [
    {
      name: "Betaz token contract address",
      contractAddress: betaz_token_contract.CONTRACT_ADDRESS,
      txFn: "salePoolTrait::setBetazTokenAddress",
      isLoading: false,
    },
  ];
  /** Staking contract Address manger */
  const stakingAddressInit = [
    {
      name: "Betaz token contract address",
      contractAddress: betaz_token_contract.CONTRACT_ADDRESS,
      txFn: "stakingPoolTrait::setBetazTokenAddress",
      isLoading: false,
    },
  ];
  /** Pandora contract Address manger */
  const pandoraAddressInit = [
    {
      name: "Pandora Psp34 contract address",
      contractAddress: pandora_psp34_contract.CONTRACT_ADDRESS,
      txFn: "pandoraPoolTraits::setPsp34ContractAddress",
      isLoading: false,
    },
  ];

  const [coreAddress, setCoreAddress] = useState(coreAddressInit);
  const [coreRandomAddress, setCoreRandomAddress] = useState(
    coreRandomAddressInit
  );
  const [daoAddress, setdaoAddress] = useState(daoAddressInit);
  const [saleAddress, setSaleAddress] = useState(saleAddressInit);
  const [stakingAddress, setStakingAddress] = useState(stakingAddressInit);
  const [pandoraAddress, setPandoraAddress] = useState(pandoraAddressInit);

  const OnChangeAddress = useCallback((e, index, setFn) => {
    const { value } = e.target;
    setFn((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], contractAddress: value };
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

  const handleChangeAddress = async (index, setFn, array) => {
    const address = array[index]?.contractAddress;
    const txfn = array[index]?.txFn;
    const contract = tabsData[currentTab]?.contract;
    console.log({txfn, index, currentTab})
    if (!isValidAddressPolkadotAddress(address)) {
      toast.error("Invalid address");
      return;
    }

    let owner = (
      await execContractQuery(
        currentAccount?.address,
        contract.CONTRACT_ABI,
        contract.CONTRACT_ADDRESS,
        0,
        "ownable::owner"
      )
    )?.toHuman().Ok;

    if (currentAccount?.address != owner) {
      toast.error("You not owner!");
      return;
    } else {
      setLoading(index, true, setFn);
      await execContractTx(
        currentAccount,
        contract.CONTRACT_ABI,
        contract.CONTRACT_ADDRESS,
        0,
        txfn,
        address
      );
      setLoading(index, false, setFn);
    }
    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
  };
  const [currentTab, setCurrentTab] = useState(0);
  const tabsData = [
    {
      label: "Core contract Address manger",
      init: coreAddressInit,
      dataObj: coreAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleChangeAddress(index, setFn, array),
      setFn: setCoreAddress,
      contract: betaz_core_contract
    },
    {
      label: "Core random contract Address manger",
      init: coreRandomAddressInit,
      dataObj: coreRandomAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleChangeAddress(index, setFn, array),
      setFn: setCoreRandomAddress,
      contract: bet_random_contract
    },
    {
      label: "DAO contract Address manger",
      init: daoAddressInit,
      dataObj: daoAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleChangeAddress(index, setFn, array),
      setFn: setdaoAddress,
    },
    {
      label: "Sale contract Address manger",
      init: saleAddressInit,
      dataObj: saleAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleChangeAddress(index, setFn, array),
      setFn: setSaleAddress,
      contract: sale_pool_contract
    },
    {
      label: "Staking contract Address manger",
      init: stakingAddressInit,
      dataObj: stakingAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleChangeAddress(index, setFn, array),
      setFn: setStakingAddress,
      contract: staking_pool_contract
    },
    {
      label: "Pandora contract Address manger",
      init: pandoraAddressInit,
      dataObj: pandoraAddress,
      onChange: (e, index, setFn) => OnChangeAddress(e, index, setFn),
      handleChange: (index, setFn, array) =>
        handleChangeAddress(index, setFn, array),
      setFn: setPandoraAddress,
      contract: pandora_pool_contract
    },
  ];

  return (
    <>
      <SectionContainer
        className="deposit-box-container"
        sx={{ marginTop: "50px" }}
      >
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
                    text="Change"
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

export default ContractAddressManager;

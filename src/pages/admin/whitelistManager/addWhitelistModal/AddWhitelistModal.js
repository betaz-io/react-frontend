import {
  Box,
  Text,
  Input,
  Flex,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { AppIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import {
  convertToBalance,
  checkBalance,
  delay,
  convertBalanceToNumber,
  isValidAddressPolkadotAddress,
} from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import sale_pool_contract from "utils/contracts/sale_pool";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { clientAPI } from "api/client";
import {
  fetchWhitelist,
} from "store/slices/whitelistSlide";
import { getDomainToAddress } from "utils";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const AddWhitelistModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [selected, SetSelected] = useState("");
  const handleUpdate = async () => {
    if (selected === "") {
      toast.error("You have not selected a pool!");
      return;
    }

    const azeroIdAddress = await getDomainToAddress(address);
    let receiver;

    if (isValidAddressPolkadotAddress(azeroIdAddress))
      receiver = azeroIdAddress;
    else receiver = address;

    if (!isValidAddressPolkadotAddress(receiver)) {
      toast.error("Invalid address");
      return;
    }

    if (value === 0 || value === "") {
      toast.error("Invalid amount!");
      return;
    }

    if (price === 0 || price === "") {
      toast.error("Invalid price!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      sale_pool_contract.CONTRACT_ABI,
      sale_pool_contract.CONTRACT_ADDRESS,
      0,
      "accessControl::hasRole",
      adminRole,
      currentAccount?.address
    );

    if (!hasRole?.toHuman().Ok) {
      toast.error("You not admin!");
      return;
    } else {
      let accounts = [];
      let amounts = [];
      let prices = [];
      setIsLoading(true);

      // check whitelist info
      let account = await execContractQuery(
        defaultCaller,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::getWhitelistInfo",
        selected,
        receiver
      );
      if (account?.toHuman().Ok) {
        toast.error("Whitelist info exist!");
        setIsLoading(false);
        return;
      } else {
        accounts.push(receiver);
      }

      // check amount
      let amount = await execContractQuery(
        defaultCaller,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::getPoolSaleTotalRemainingAmount",
        selected
      );
      if (parseFloat(value) > convertBalanceToNumber(amount)) {
        toast.error("Not enough balance!");
        setIsLoading(false);
        return;
      } else {
        amounts.push(convertToBalance(value));
        prices.push(convertToBalance(price));
      }

      // adding
      toast.success(`add address ${address} to whitelist ${selected} Pool ...`);
      await execContractTx(
        currentAccount,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::addMultiWhitelists",
        selected,
        accounts,
        amounts,
        prices
      );

      // add database
      await clientAPI("post", "/addWhitelist", {
        poolType: selected,
        buyer: receiver,
        amount: value,
        price: price,
      });

      dispatch(fetchWhitelist(selected));

      setIsLoading(false);
    }

    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  const onChangeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      val = parseFloat(value);
      if (val < 0) val = 1;
      else {
        setValue(value);
      }
    }
  });

  const onChangePrice = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      val = parseFloat(value);
      if (val < 0) val = 1;
      else {
        setPrice(value);
      }
    }
  });

  const onChangeAddress = useCallback((e) => {
    const { value } = e.target;
    setAddress(value);
  });

  const onChangeSelected = useCallback((e) => {
    const { value } = e.target;
    SetSelected(value);
  });

  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        className="history-modal-content-container"
        maxW={{
          base: "calc(100vw) !important",
          sm: "calc(100vw - 120px) !important",
        }}
      >
        <ModalHeader
          className="history-modal-content-title linear-text"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
          mt={{ base: "24px", sm: "unset" }}
        >
          Add Whitelist
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <Box className="deposit-box-amount-box" mt="24px">
            <Text>Select pool</Text>
            <Flex className="deposit-box-amount-input">
              <Select
                placeholder="Select option"
                background="#0d171b"
                onChange={onChangeSelected}
              >
                <option
                  style={{
                    color: "#0d171b",
                  }}
                  value="Sale"
                >
                  Sale
                </option>
                <option
                  style={{
                    color: "#0d171b",
                  }}
                  value="PrivateInvestment"
                >
                  PrivateInvestment
                </option>
                <option
                  style={{
                    color: "#0d171b",
                  }}
                  value="AirdropAndMarketing"
                >
                  AirdropAndMarketing
                </option>
                <option
                  style={{
                    color: "#0d171b",
                  }}
                  value="Team"
                >
                  Team
                </option>
                <option
                  style={{
                    color: "#0d171b",
                  }}
                  value="Development"
                >
                  Development
                </option>
              </Select>
            </Flex>
          </Box>
          <Box className="deposit-box-amount-box" mt="24px">
            <Text>Address</Text>
            <Flex className="deposit-box-amount-input">
              <Input
                focusBorderColor="transparent"
                sx={{ border: "0px" }}
                value={address}
                onChange={onChangeAddress}
                type="text"
              />
            </Flex>
          </Box>
          <Box className="deposit-box-amount-box" mt="24px">
            <Text>Amount</Text>
            <Flex className="deposit-box-amount-input">
              <Input
                focusBorderColor="transparent"
                sx={{ border: "0px" }}
                value={value}
                onChange={onChangeValue}
                type="number"
              />
              <Flex
                w="100px"
                alignItems="center"
                gap={1}
                pl="4px"
                borderLeft="2px solid rgba(255, 255, 255, 0.4)"
              >
                <AppIcon size="18px" />
                BetAZ
              </Flex>
            </Flex>
          </Box>
          <Box className="deposit-box-amount-box" mt="24px">
            <Text>Price</Text>
            <Flex className="deposit-box-amount-input">
              <Input
                focusBorderColor="transparent"
                sx={{ border: "0px" }}
                value={price}
                onChange={onChangePrice}
                type="number"
              />
              <Flex
                w="100px"
                alignItems="center"
                gap={1}
                pl="4px"
                borderLeft="2px solid rgba(255, 255, 255, 0.4)"
              >
                <AppIcon size="18px" />
                BetAZ
              </Flex>
            </Flex>
          </Box>
          <Flex direction="column" alignItems="center" mt="24px">
            <CommonButton
              text="Add Whitelist"
              isLoading={isLoading}
              onClick={() => handleUpdate()}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddWhitelistModal;

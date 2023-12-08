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
  convertStringToPrice,
} from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import sale_pool_contract from "utils/contracts/sale_pool";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { useModal } from "contexts/useModal";
import { clientAPI } from "api/client";
import { fetchWhitelist } from "store/slices/whitelistSlide";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const UpdateWhitelistModal = () => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const { buyerData } = useSelector((s) => s.whitelist);
  useEffect(() => {
    SetSelected(buyerData?.poolType);
    setAddress(buyerData?.buyer);
    setValue(buyerData?.amount);
    setPrice(buyerData?.price);
  }, [buyerData]);

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(buyerData?.amount);
  const [price, setPrice] = useState(buyerData?.price);
  const [address, setAddress] = useState(buyerData?.buyer);
  const [selected, SetSelected] = useState(buyerData?.poolType);
  const { modalUpdatewhitelistVisible, setModalUpdatewhitelistVisible } =
    useModal();

  const onClose = () => setModalUpdatewhitelistVisible(false);
  const handleUpdate = async () => {
    if (selected === "") {
      toast.error("You have not selected a pool!");
      return;
    }

    if (!isValidAddressPolkadotAddress(address)) {
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
        address
      );
      let whitelistInfo = account?.toHuman().Ok;

      if (!whitelistInfo) {
        toast.error("Whitelist info not exist!");
        setIsLoading(false);
        return;
      } else if (convertStringToPrice(whitelistInfo?.purchasedAmount) > 0) {
        toast.error("Whitelist buyer purchased!");
        setIsLoading(false);
        return;
      } else {
        accounts.push(address);
      }

      // check amount
      let poolInfo = await execContractQuery(
        defaultCaller,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::getPoolSaleInfo",
        selected
      );

      let poolTotalPurchasedAmount = parseFloat(
        poolInfo?.toHuman()?.Ok?.totalPurchasedAmount.replaceAll(",", "") /
          10 ** 12
      );
      let remainingAmount = await execContractQuery(
        defaultCaller,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::getPoolSaleTotalRemainingAmount",
        selected
      );
      if (
        poolTotalPurchasedAmount +
          parseFloat(value) -
          convertStringToPrice(whitelistInfo?.amount) >
        convertBalanceToNumber(remainingAmount)
      ) {
        toast.error("Not enough balance!");
        setIsLoading(false);
        return;
      } else {
        amounts.push(convertToBalance(value));
        prices.push(convertToBalance(price));
      }

      // updating
      toast.success(
        `update address ${address} in whitelist ${selected} Pool ...`
      );
      await execContractTx(
        currentAccount,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::updateMultiWhitelists",
        selected,
        accounts,
        amounts,
        prices
      );

      // add database
      await clientAPI("post", "/updateWhitelist", {
        poolType: selected,
        buyer: address,
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
    <Modal onClose={onClose} size="lg" isOpen={modalUpdatewhitelistVisible}>
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
          Update Whitelist
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <Text className="deposit-box-title">Update Whitelist</Text>
          <Box className="deposit-box-amount-box" mt="24px">
            <Text>Select pool</Text>
            <Flex className="deposit-box-amount-input">
              <Select
                placeholder="Select option"
                background="#0d171b"
                onChange={onChangeSelected}
                defaultValue={selected}
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
              text="Update Whitelist"
              isLoading={isLoading}
              onClick={() => handleUpdate()}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateWhitelistModal;

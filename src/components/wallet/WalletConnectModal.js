import {
  Box,
  Divider,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useNetwork } from "components/Network/useNetWork";
import { useMemo, useState } from "react";
import { supportedChain } from "./data";
import { useWallet } from "contexts/useWallet";
import { addressShortener } from "utils";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCurrentAccount } from "store/slices/substrateSlice";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";

const WalletItem = ({ data, SetWalletData }) => {
  const { connectWallet } = useWallet();
  const { currentNetwork } = useNetwork();
  const isMobile = useCheckMobileScreen(1280);

  return (
    <Box
      sx={{
        background: "#0D171B",
        display: "flex",
        padding: "8px",
        borderRadius: "4px",
        alignItems: "center",
        marginTop: "8px",
        border: "2px solid transparent",
      }}
      cursor="pointer"
      _hover={{ border: "2px solid #1BECA6" }}
      onClick={() => {
        connectWallet(currentNetwork?.key, data?.key);
        SetWalletData({ label: data?.label, url: data?.url });
      }}
    >
      <Box
        sx={{
          bg: "#FFF",
          width: "40px",
          height: "40px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image height={{ base: "32px" }} alt="logo-wallet" src={data?.icon} loading="lazy" />
      </Box>
      <Text
        sx={{
          color: "#FFF",
          fontsize: "16px",
          fontWeight: "500",
          marginLeft: "8px",
        }}
      >
        {data?.label}
      </Text>
    </Box>
  );
};

const AccountItem = ({ data, onClose, onCloseModal }) => {
  const { updateWalletAccount, currentAccount } = useWallet();
  const { currentNetwork } = useNetwork();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        background: "0D171B",
        display: "flex",
        padding: "8px",
        borderRadius: "4px",
        alignItems: "center",
        marginTop: "8px",
        border: "2px solid transparent",
        justifyContent: "space-between",
      }}
      // pointerEvents={currentAccount.address == data.address ? "none" : "auto"}
      cursor="pointer"
      _hover={{ border: "2px solid #1BECA6" }}
      onClick={() => {
        if (
          currentAccount?.address &&
          currentAccount?.address == data?.address
        ) {
          onClose();
          onCloseModal();
        } else {
          updateWalletAccount({ ...data, network: currentNetwork.key });
          dispatch(setCurrentAccount(data));
          onClose();
          onCloseModal();
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MdOutlineAccountBalanceWallet size="28px" color="#1BECA6" />
        </Box>
        <Text
          sx={{
            color: "#FFF",
            fontsize: "16px",
            fontWeight: "500",
            marginLeft: "8px",
          }}
        >
          {data?.meta?.name}
        </Text>
      </Box>
      <Text
        sx={{
          color: "#FFF",
          fontsize: "16px",
          fontWeight: "500",
          marginLeft: "8px",
        }}
      >
        {addressShortener(data?.address)}
      </Text>
    </Box>
  );
};
const WalletConnectModal = ({ connectModalVisible, onClose, onCloseModal }) => {
  const { currentNetwork } = useNetwork();
  const { walletAccounts } = useWallet();
  const [walletData, SetWalletData] = useState({
    label: "",
    url: "",
  });
  const supportWallets = useMemo(
    () =>
      supportedChain.find((e) => e?.key == currentNetwork?.key)?.wallets || [],
    [currentNetwork]
  );

  return (
    <Modal size="sm" isCentered isOpen={connectModalVisible} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        containerProps={{
          justifyContent: "end",
        }}
        marginRight={{ base: "12px", sm: "32px" }}
        marginLeft={{ base: "12px", sm: "unset" }}
        sx={{
          height: "calc(100% - 64px)",
          background: "#122126",
          boxShadow: "0px 4px 4px 0px rgba(64, 64, 64, 0.20)",
          border: "1px solid rgba(255, 255, 255, 0.70)",
          zIndex: 200,
        }}
      >
        <ModalHeader sx={{ color: "#1BECA7" }}>Connect a wallet</ModalHeader>
        <ModalCloseButton color={"white"} />
        <ModalBody>
          {supportWallets?.map((e, index) => (
            <WalletItem
              data={e}
              SetWalletData={SetWalletData}
              key={`wallet-item-${index}`}
            />
          ))}
          {walletAccounts?.length > 0 ? (
            <Box sx={{ marginTop: "16px" }}>
              <Divider />
              <Text
                sx={{
                  color: "#1BECA7",
                  marginTop: "8px",
                  fontWeight: "512",
                  fontSize: "20px",
                }}
              >
                Select Account
              </Text>
              <Box overflowY="auto" maxH="210px">
                {walletAccounts?.map((e, index) => {
                  return (
                    <AccountItem
                      key={`account-item-${index}`}
                      data={e}
                      onClose={onClose}
                      onCloseModal={onCloseModal}
                    />
                  );
                })}
              </Box>
            </Box>
          ) : (
            <Box sx={{ marginTop: "16px" }}>
              <Divider />
              <Text
                sx={{
                  color: "#1BECA7",
                  marginTop: "8px",
                  fontWeight: "512",
                  fontSize: "20px",
                }}
              >
                Install wallet
              </Text>
              <Box overflowY="auto" maxH="210px">
                <Text>
                  You may download {walletData.label}{" "}
                  <Link href={walletData.url} isExternal textColor="#1BECA7">
                    here
                  </Link>
                </Text>
              </Box>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Text sx={{ color: "#A4B0B6", fontsize: "14px" }}>
            By connecting a wallet, you agree to Bet AZ Terms of Service and
            consent to its Privacy Policy.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletConnectModal;

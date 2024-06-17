import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  Button,
} from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import { useWallet } from "contexts/useWallet";
import { useModal } from "contexts/useModal";
import { useSelector } from "react-redux";
import { memo } from "react";
import UnstakeModal from "components/stakingPool/pendingModal/UnstakeModal";
import { AzeroIcon, AppIcon } from "components/icons";
import ClaimRewardStakingModal from "components/stakingPool/historyClaimRewardModal/HistoryClaimRewardModal";
import { useLocation } from "react-router-dom";

const pandoraPath = "/pandora";

const DetailAccountBox = ({ onClickSwitch }) => {
  const { logoutAccountHandler } = useWallet();
  const location = useLocation();
  const {
    setUnstakeModalVisible,
    unstakeModalVisible,
    modalClaimRewardHistoryVisible,
    setModalClaimRewardHistoryVisible,
    setModalPandoraRewardHistoryVisible,
    setModalPandoraYourTicketVisible,
  } = useModal();
  const { currentAccount } = useSelector((s) => s.substrate);
  const onOpenUnstakeModal = () => setUnstakeModalVisible(true);
  const onCloseUnstakeModal = () => setUnstakeModalVisible(false);
  const onOpenClaimHistoryModal = () => setModalClaimRewardHistoryVisible(true);
  const onCloseClaimeHistoryModal = () =>
    setModalClaimRewardHistoryVisible(false);
  const onOpenPandoraRewardHistoryModal = () =>
    setModalPandoraRewardHistoryVisible(true);
  const onOpenPandoraYourTicketModal = () =>
    setModalPandoraYourTicketVisible(true);

  const listInformation = [
    {
      title: "AZERO balance",
      content: currentAccount?.balance?.azero,
      key: "azero",
    },
    {
      title: "BET AZ token balance",
      content: currentAccount?.balance?.betaz,
      key: "betaz",
    },
    {
      title: "BET AZ staked amount",
      content: currentAccount?.balance?.stake,
      key: "betaz",
    },
    {
      title: "Next reward distribution",
      content: currentAccount?.balance?.reward,
      key: "azero",
    },
  ];

  const totalTicket = {
    title: "Total tickets usable",
    content: "--",
    key: "betaz",
  };

  if (location?.pathname == pandoraPath) {
    listInformation.splice(-2);
    // listInformation.push(totalTicket)
  }
  return (
    <>
      <Box p="20px">
        <Box mb="12px" variant="menu" minW={{ base: "full", lg: "350px" }}>
          <Flex justify={{ base: "space-between" }}>
            <Text>Address</Text>
            <Heading as="h4" size="h4">
              <AddressCopier address={currentAccount?.address} />
            </Heading>
          </Flex>
        </Box>
        {[...listInformation].map(({ title, content, key }, idx) => {
          return (
            <Box
              key={idx}
              mb="12px"
              variant="menu"
              minW={{ base: "full", lg: "350px" }}
            >
              <Flex justify={{ base: "space-between" }}>
                <Text>{title}</Text>
                <Heading as="h4" size="h4" color={"white"}>
                  <Flex>
                    {content}{" "}
                    {key == "azero" ? (
                      <AzeroIcon
                        size={{ base: "12px" }}
                        padding={{ base: "6px 0px 0px 4px" }}
                      />
                    ) : (
                      <AppIcon
                        size={{ base: "14px" }}
                        padding={{ base: "5px 0px 0px 4px" }}
                      />
                    )}
                  </Flex>
                </Heading>
              </Flex>
            </Box>
          );
        })}
        {process.env.REACT_APP_ENV == "testnet" && (
          <Flex direction="column">
            {location?.pathname !== pandoraPath && (
              <Button
                className="landing-page-banner-button"
                sx={{
                  mb: "8px",
                }}
                onClick={() => {
                  onOpenUnstakeModal(true);
                }}
              >
                My Stakes
              </Button>
            )}
            {location?.pathname !== pandoraPath && (
              <Button
                className="landing-page-banner-button"
                sx={{
                  mb: "8px",
                }}
                onClick={() => {
                  onOpenClaimHistoryModal(true);
                }}
              >
                Reward History
              </Button>
            )}
            {location?.pathname === pandoraPath && (
              <Button
                className="landing-page-banner-button"
                sx={{
                  mb: "8px",
                }}
                onClick={() => {
                  onOpenPandoraRewardHistoryModal(true);
                }}
              >
                Reward History
              </Button>
            )}
            {location?.pathname === pandoraPath && (
              <Button
                className="landing-page-banner-button"
                sx={{
                  mb: "8px",
                }}
                onClick={() => {
                  onOpenPandoraYourTicketModal(true);
                }}
              >
                Your Ticket
              </Button>
            )}
            <Button
              className="landing-page-banner-button"
              sx={{
                mb: "8px",
              }}
              onClick={() => {
                onClickSwitch();
              }}
            >
              Switch Account
            </Button>
            <Button
              className="landing-page-banner-button"
              onClick={() => {
                logoutAccountHandler();
              }}
            >
              Log Out
            </Button>
          </Flex>
        )}
      </Box>
      <UnstakeModal
        isOpen={unstakeModalVisible}
        onClose={onCloseUnstakeModal}
      />
      <ClaimRewardStakingModal
        isOpen={modalClaimRewardHistoryVisible}
        onClose={onCloseClaimeHistoryModal}
      />
    </>
  );
};

export default memo(DetailAccountBox);

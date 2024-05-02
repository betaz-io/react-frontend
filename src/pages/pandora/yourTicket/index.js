import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  CircularProgress,
  Image,
  Grid,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "hooks/useInterval";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useQuery } from "react-query";
import useWebSocket from "react-use-websocket";
import EffectIcon from "assets/img/LightIcon1.png";
import PandoraBGCoin from "assets/img/PandoraBGCoin.png";
import { usePandoraTickets } from "hooks/usePandoraTickets";
import PandoraItem from "assets/img/PandoraItem.png";
import PandoraItemBG from "assets/img/PandoraItemBG.png";
import { useTicket } from "contexts/useSelectTicket";
import PandoraTicketsCard from "components/nftCard";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const tabData = [
  {
    label: "All tickets",
  },
  {
    label: "Used tickets",
  },
  {
    label: "Unused tickets",
  },
];

const PandoraTicketsModal = ({ isOpen, onClose, item }) => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const { ticketId, setTicketId } = useTicket();
  const {
    pandoraTicketsData,
    totalPages,
    isLoading: isLoadingTicketsData,
    refetch: refetchTicketsData,
    isRefetching: isRefetchingTicketsData,
    prevPage: handlePrev,
    nextPage: handleNext,
    setCurrentPage,
    currentPage,
    currentTab,
    setCurrentTab,
  } = usePandoraTickets(currentAccount);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    refetchTicketsData();
  };

  const isMobile = useCheckMobileScreen(480);
  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        className="pandora-history-modal-content-container"
        maxW={{
          base: "calc(100vw) !important",
          sm: "calc(100vw - 120px) !important",
        }}
        position="relative"
      >
        <Box
          className="lucky-number-circle-image"
          bgImage={PandoraBGCoin}
          bgRepeat="no-repeat"
          bgPosition="center"
          w={{ base: "280px", sm: "480px" }}
          position="absolute"
          backdropBlur={"10px"}
          right={"10%"}
          top={"50%"}
          transform={"translateY(-50%)"}
          zIndex={-2}
          opacity={0.3}
        ></Box>
        <Image
          position="absolute"
          w="240px"
          sx={{
            bottom: "200px",
            left: "-121px",
          }}
          src={EffectIcon}
          className="pandora-effect-icon"
          transform={"rotate(-90deg)"}
        />
        <Image
          position="absolute"
          w="240px"
          sx={{
            top: "-36px",
            right: "0px",
          }}
          src={EffectIcon}
          className="pandora-effect-icon"
        />
        <ModalHeader
          className="history-modal-content-title linear-text"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
        >
          Your Tickets
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <Box w="100%" h="100%" className="pandora-modal-overlay"></Box>
          <Box
            // className="history-modal-tabs"
            display={"flex"}
            gap={"16px"}
          >
            {tabData.map((e, index) => {
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
                    fontSize={{ base: "16px", sm: "20px" }}
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
          <Box
            mt={"24px"}
            w="100%"
            className="pandora-modal-container"
            gap="24px"
            paddingX={"20px"}
          >
            {isLoadingTicketsData || isRefetchingTicketsData ? (
              <Flex justifyContent={"center"} gap={"12px"}>
                <CircularProgress isIndeterminate color="#1beca6" />
                <Text className="pandora-modal-text-title" color="#FFA000">
                  Loading ..........
                </Text>
              </Flex>
            ) : pandoraTicketsData?.length ? (
              <SimpleGrid
                columns={{ base: 1, md: 3, lg: 4, xl: 6 }}
                spacing="10px"
                spacingY={"32px"}
              >
                {pandoraTicketsData?.map((item) => (
                  <PandoraTicketsCard item={item} />
                ))}
              </SimpleGrid>
            ) : (
              <Text className="pandora-modal-text-title" color="#FFA000">
                You don't own any tickets
              </Text>
            )}
          </Box>
        </ModalBody>
        <ModalFooter className="history-table-footer-container">
          <Box display="flex" gap="8px">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              breakClassName={"ellipsis"}
              breakLabel={"..."}
              previousLabel={<MdOutlineArrowBackIosNew />}
              nextLabel={<MdOutlineArrowForwardIos />}
              renderOnZeroPageCount={null}
              initialPage={currentPage - 1}
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PandoraTicketsModal;

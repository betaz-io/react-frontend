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

const PandoraTicketsModal = ({ isOpen, onClose }) => {
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

  console.log({
    pandoraTicketsData,
  });

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
          opacity={0.5}
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
            w="100%"
            className="pandora-modal-container"
            gap="24px"
            paddingX={"0px"}
          >
            {(isLoadingTicketsData || isRefetchingTicketsData) &&
            pandoraTicketsData?.length ? (
              <Flex justifyContent="space-between" alignItems={"center"}>
                {pandoraTicketsData?.map((item) => (
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Box
                      className="PandoraTicketCard"
                      border={"2px solid #00D5C4"}
                      padding={"6px"}
                      borderRadius={"6px"}
                      background={
                        item?.nftId === ticketId
                          ? "radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)"
                          : "radial-gradient(83.96% 38.98% at 50% 50.01%, #0D1B14 0%, #FFF 100%)"
                      }
                      //   background="radial-gradient(83.96% 38.98% at 50% 50.01%, #0D1B14 0%, #FFF 100%)"
                      //   background="radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)"
                      w={"176px"}
                      position={"relative"}
                      cursor={"pointer"}
                      onClick={() => {
                        if (item?.nftId !== ticketId) setTicketId(item?.nftId);
                        else {
                          setTicketId(0);
                        }
                      }}
                    >
                      <Image
                        src={EffectIcon}
                        alt=""
                        position="absolute"
                        top="140px"
                        right="-86px"
                        w="200px"
                        transform={"rotate(-90deg)"}
                        zIndex={4}
                        opacity={item?.nftId === ticketId ? 1 : 0}
                      />
                      <Image
                        src={EffectIcon}
                        alt=""
                        position="absolute"
                        top="-26px"
                        left="-60px"
                        w="200px"
                        zIndex={4}
                        opacity={item?.nftId === ticketId ? 1 : 0}
                      />
                      <Box
                        w={"100%"}
                        borderRadius={"6px"}
                        overflow={"hidden"}
                        position={"relative"}
                      >
                        <Image src={PandoraItemBG} alt="" />
                        <Image
                          src={PandoraItem}
                          alt=""
                          position={"absolute"}
                          top={"50%"}
                          left={"50%"}
                          transform={"translate(-50%, -50%)"}
                          w={"90%"}
                        />
                      </Box>
                      <Box>
                        <Text
                          textTransform={"uppercase"}
                          fontWeight={"700"}
                          color={"black"}
                          fontStyle="italic"
                        >
                          Pandora secret box #{item?.nftId}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Flex>
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
              previousLabel={"<"}
              nextLabel={">"}
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PandoraTicketsModal;

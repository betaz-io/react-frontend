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
import PandoraDetailBg from "assets/img/PandoraDetailBg.png";
import PandoraDetailBgMobile from "assets/img/PandoraDetailBgMobile.png";
import PandoraDetailBgTablet from "assets/img/PandoraDetailBgTablet.png";
import { usePandoraTickets } from "hooks/usePandoraTickets";
import PandoraItem from "assets/img/PandoraItem.png";
import PandoraItemBG from "assets/img/PandoraItemBG.png";
import { useTicket } from "contexts/useSelectTicket";
import PandoraTicketsCard from "components/nftCard";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import PandoraCloseButton from "assets/img/PandoraCloseButton.svg";
import { IoCloseSharp } from "react-icons/io5";

const tabData = [
  {
    label: "ALL",
  },
  {
    label: "USED",
  },
  {
    label: "UNUSED",
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
  const IsMdScreen = useCheckMobileScreen(768);
  const IsXlScreen = useCheckMobileScreen(1280);
  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        // className="pandora-history-modal-content-container"
        backgroundColor={"transparent !important"}
        maxW={{
          base: "calc(100vw - 24px) !important",
          sm: "calc(100vw - 200px) !important",
        }}
        position="relative"
        mx={"auto"}
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
        {isMobile && (
          <Image
            position="absolute"
            w="240px"
            sx={{
              bottom: "0px",
              left: "-112px",
            }}
            src={EffectIcon}
            className="pandora-effect-icon"
            transform={"rotate(-90deg)"}
            loading="lazy"
            alt="images"
          />
        )}
        <Text
          className="pandora-modal-select-ticket-text-title"
          mb={"16px"}
          textAlign={"center"}
          fontSize={isMobile && "11vw"}
        >
          YOUR TICKETS
        </Text>
        {/* <ModalHeader
          className="history-modal-content-title"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
          padding={isMobile && "4px"}
          maxW={"max-content"}
          mx={"auto"}
        >
        </ModalHeader> */}
        {/* <ModalCloseButton color="#FFF" /> */}
        <ModalBody padding={"0px"}>
          {/* <Box w="100%" h="100%" className="pandora-modal-overlay"></Box> */}
          <Box position="relative" h="max-content" overflow={"hidden"}>
            {!IsXlScreen && (
              <Box
                className="pandora-btn-close"
                position="absolute"
                top="0%"
                left="82%"
                zIndex={3}
                onClick={onClose}
                display={{ base: "none", sm: "block" }}
              >
                <Text
                  className="pandora-modal-select-ticket-text-title"
                  mb={"16px"}
                  textAlign={"center"}
                  fontSize={"24px"}
                >
                  TOTAL: {pandoraTicketsData?.length}
                </Text>
              </Box>
            )}
            <Box
              className="history-modal-content-title"
              fontWeight={{ base: "500", sm: "700" }}
              fontSize={{ base: "20px", sm: "32px" }}
              padding={isMobile && "4px"}
              w={"100%"}
              maxW={"max-content"}
              position={"absolute"}
              top={"2%"}
              left={"50%"}
              transform={"translateX(-50%)"}
            >
              <Box
                // className="history-modal-tabs"
                display={"flex"}
                margin={"0 auto"}
                w={"max-content"}
              >
                {tabData.map((e, index) => {
                  const isActive = currentTab === index;
                  const lastIndex = tabData.length - 1 - index;
                  return (
                    <Box
                      key={`tab-${index}`}
                      onClick={() => setCurrentTab(index)}
                      cursor={"pointer"}
                      minW={{ base: "100px", md: "160px" }}
                      borderRight={lastIndex && "4px solid #FFA000"}
                    >
                      <Text
                        fontSize={{ base: "16px", sm: "20px" }}
                        fontWeight={{ base: "500", sm: "700" }}
                        color={"#0076CE"}
                        className={`${isActive && "linear-text"}`}
                      >
                        {e?.label}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Image
              src={
                isMobile
                  ? PandoraDetailBgMobile
                  : IsXlScreen
                  ? PandoraDetailBgTablet
                  : PandoraDetailBg
              }
              alt="images"
              w="100%"
              verticalAlign="middle"
            />
            <Box
              position="absolute"
              right={{ base: "0.5%", sm: "0.1%", xl: "0.2%" }}
              top={{ base: "4.3%", sm: "3.4%", xl: "6.15%" }}
              className="pandora-btn-close"
              w="max-content"
              onClick={onClose}
              color="white"
              background="#00D5C4"
              borderBottomLeftRadius={{ base: "8px", sm: "10px" }}
              borderTopRightRadius={{ base: "8px", sm: "10px" }}
              zIndex={"99999999"}
              sx={{
                _hover: {
                  background: "#FC0000",
                },
              }}
            >
              <IoCloseSharp size={isMobile ? "24px" : "36px"} />
            </Box>

            <Box
              w={{ base: "94%", sm: "94%" }}
              className="pandora-modal-container"
              paddingX={{ base: "12px", sm: "24px" }}
              paddingY={isMobile && "12px"}
              border={"none"}
              position={"absolute"}
              top={"10%"}
              h={{base:"75%", sm: "80%"}}
              left={"50%"}
              transform={"translateX(-50%)"}
              overflowY={"auto"}
            >
              {isLoadingTicketsData || isRefetchingTicketsData ? (
                <Flex justifyContent={"center"} gap={"12px"}>
                  <CircularProgress isIndeterminate color="#1beca6" />
                  <Text className="pandora-modal-text-title" color="#FFA000">
                    Loading ..........
                  </Text>
                </Flex>
              ) : pandoraTicketsData?.length ? (
                <Flex
                  gap={{ base: "12px", sm: "24px" }}
                  flexWrap={"wrap"}
                  w={"100%"}
                  maxH={"100%"}
                  justifyContent={"start !important"}
                >
                  {pandoraTicketsData?.map((item) => (
                    <PandoraTicketsCard item={item} />
                  ))}
                </Flex>
              ) : (
                <Text className="pandora-modal-text-title" color="#FFA000">
                  You don't own any tickets
                </Text>
              )}
            </Box>

            <Box
              display="flex"
              gap="8px"
              position={"absolute"}
              bottom={"3%"}
              left={"50%"}
              transform={"translateX(-50%)"}
            >
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
          </Box>
        </ModalBody>
        {/* <ModalFooter
          className="history-table-footer-container"
          position={"relative"}
        >
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
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default PandoraTicketsModal;

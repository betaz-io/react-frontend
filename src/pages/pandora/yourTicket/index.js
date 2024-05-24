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
  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        // className="pandora-history-modal-content-container"
        backgroundColor={"transparent !important"}
        maxW={{
          base: "calc(100vw) !important",
          sm: "calc(100vw - 200px) !important",
        }}
        position="relative"
      >
        <Image
          src={PandoraDetailBg}
          alt=""
          position={"absolute"}
          zIndex={"-1"}
          w={"100%"}
          top={"64px"}
        ></Image>
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
            bottom: "0px",
            left: "-112px",
          }}
          src={EffectIcon}
          className="pandora-effect-icon"
          transform={"rotate(-90deg)"}
          loading="lazy"
        />
        {/* <Image
          position="absolute"
          w="240px"
          sx={{
            top: "-36px",
            right: "0px",
          }}
          src={EffectIcon}
          className="pandora-effect-icon"
          loading="lazy"
        /> */}
        <Text
          className="pandora-modal-select-ticket-text-title"
          mb={"16px"}
          textAlign={"center"}
        >
          YOUR TICKETS
        </Text>
        <ModalHeader
          className="history-modal-content-title"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
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
                  minW={"200px"}
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
        </ModalHeader>
        {/* <ModalCloseButton color="#FFF" /> */}
        <ModalBody>
          {/* <Box w="100%" h="100%" className="pandora-modal-overlay"></Box> */}
          <Flex
            w={"max-content"}
            justifyContent={"end"}
            position={"absolute"}
            right={"0px"}
            top={"100px"}
            zIndex={1}
          >
            <Box
            position={"absolute"}
            right={"0px"}
              className="pandora-btn-close"
              w={"max-content"}
              onClick={onClose}
              color={"white"}
              background={"#00D5C4"}
              borderBottomLeftRadius={"8px"}
              borderTopRightRadius={"8px"}
              sx={{
                _hover: {
                  background: "#FC0000",
                },
              }}
            >
              <IoCloseSharp size={"36px"} />
            </Box>
          </Flex>

          <Box
            className="pandora-btn-close"
            position="absolute"
            top="70px"
            left="82%"
            zIndex={3}
            onClick={onClose}
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
          <Box
            w="100%"
            className="pandora-modal-container"
            gap="24px"
            paddingX={"20px"}
            border={"none"}
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
                gap="24px"
                flexWrap={"wrap"}
                w={"100%"}
                maxH={{base:"75vh"}}
                overflowY={"auto"}
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
        </ModalBody>
        <ModalFooter
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PandoraTicketsModal;

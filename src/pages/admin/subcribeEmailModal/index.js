import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { BiTime } from "react-icons/bi";
import { TbMail } from "react-icons/tb";
import "./styles.css";
import { formatTableValue } from "./formatTable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import useInterval from "hooks/useInterval";

let currentPage = 1;

const SubcribeEmailModal = ({ isOpen, onClose }) => {
  const [uiPage, setUIPage] = useState(1);
  const [data, setdata] = useState([]);

  const getData = async () => {
    let data = await clientAPI("post", "/getSubcribeEmail", {
      limit: 10,
      offset: 10 * (currentPage - 1),
    });
    setdata(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < 5) currentPage++;
    else toast("Only 5 pages can be displayed");
    setUIPage(currentPage);
    getData();
  });

  const previousPage = useCallback(() => {
    if (currentPage > 1) currentPage--;
    setUIPage(currentPage);
    getData();
  });

  const emailTableData = {
    headers: [
      {
        label: "Email Address",
        key: "email",
        icon: <TbMail size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Subcribe At",
        key: "subcribeAt",
        icon: <BiTime size="24px" style={{ marginRight: "8px" }} />,
      },
    ],
    data: data,
  };

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
        <ModalHeader className="history-modal-content-title linear-text">
          Subcribe Emails
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <TableContainer mt="24px" overflowY="hidden">
            <Table
              sx={{
                overflowX: "auto",
                minWidth: "500px",
              }}
              variant="unstyled"
              className="history-table"
            >
              <Thead>
                <Tr className="history-table-header-container">
                  {emailTableData.headers.map((e, index) => {
                    const isFirstChild = index === 0;
                    const isLastChild =
                      index === emailTableData.headers.length - 1;
                    return (
                      <Th className="history-table-header-column">
                        <Box
                          sx={{
                            borderY: "1px solid #1beca6",
                            borderLeft: isFirstChild && "1px solid #1beca6",
                            borderRight: isLastChild && "1px solid #1beca6",
                            borderLeftRadius: isFirstChild && "8px",
                            borderRightRadius: isLastChild && "8px",
                            paddingLeft: isFirstChild && "20px",
                            width: "full",
                            py: "20px",
                          }}
                          display="flex"
                          justifyContent={index > 0 && "center"}
                          alignItems="center"
                        >
                          {e?.icon}
                          {e.label}
                        </Box>
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {emailTableData.data.map((e, rowIndex) => {
                  const keyValues = Object.keys(e);

                  return (
                    <Tr>
                      {keyValues.map((keyvalue, index) => {
                        const isFirstChild = index === 0;
                        const isLastChild =
                          index === emailTableData.headers.length - 1;
                        return (
                          <Td>
                            <Box
                              sx={{
                                marginTop: rowIndex === 0 ? "24px" : "8px",
                                background: "#0d171b",
                                py: "16px",
                                pl: isFirstChild && "24px",
                                borderY: "1px solid rgba(255, 255, 255, 0.4)",
                                borderLeft:
                                  isFirstChild &&
                                  "1px solid rgba(255, 255, 255, 0.4)",
                                borderRight:
                                  isLastChild &&
                                  "1px solid rgba(255, 255, 255, 0.4)",
                                borderLeftRadius: isFirstChild && "8px",
                                borderRightRadius: isLastChild && "8px",
                              }}
                            >
                              {formatTableValue(e[keyvalue], keyvalue)}
                            </Box>
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter className="history-table-footer-container">
          <Box display="flex" gap="8px">
            <IconButton
              variant="outline"
              color="#FFFFFF"
              onClick={() => previousPage()}
            >
              <IoIosArrowBack />
            </IconButton>
            <IconButton variant="outline" color="#FFFFFF" disabled="disabled">
              <span
                style={{
                  color: "#FFFFFF",
                }}
              >
                {uiPage}
              </span>
            </IconButton>
            <IconButton
              // ml="8px"
              variant="outline"
              color="#FFFFFF"
              onClick={() => nextPage()}
            >
              <IoIosArrowForward />
            </IconButton>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubcribeEmailModal;

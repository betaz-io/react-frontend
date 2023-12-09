import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import AppLogo2 from "assets/img/app-logo-2.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import { Link, useNavigate } from "react-router-dom";
import "./navbar-landing-page.css";
import { SectionContainer } from "components/container";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import toast from "react-hot-toast";

const tabs = [
  {
    label: "Tokenomics",
    key: "section-tokenomic",
  },
  {
    label: "BETAZ faucet",
    // label: "Public Sale",
    key: "section-deposit",
  },
  {
    label: "Roadmap",
    key: "section-roadmap",
  },
  {
    label: "Team member",
    key: "section-team-member",
  },
  {
    label: "Docs",
    key: "section-docs",
  },
  // {
  //   label: "Contact Us",
  //   key: "section-contact-us",
  // },
];

export const NavbarLandingPage = () => {
  const navigate = useNavigate();
  const isTablet = useCheckMobileScreen(1440);
  const isMobile = useCheckMobileScreen(576);

  return (
    <SectionContainer>
      <Flex
        className="navbar-container"
        position="relative"
        padding={{ base: "8px 12px", sm: "16px 24px" }}
      >
        <Flex className="navbar-logo-container">
          <Link to={"/"}>
            <Image
              className="navbar-logo"
              alt="logo-app"
              src={isMobile ? AppLogo2 : AppLogo}
            />
          </Link>
        </Flex>
        {isTablet ? null : (
          <Flex justify="center" flex={1}>
            {tabs?.map((e, index) => {
              return (
                <Box
                  sx={{ px: "16px", py: "8px" }}
                  cursor="pointer"
                  onClick={() => {
                    e.label.toLocaleLowerCase() === "docs"
                      ? window.open("https://betaz.gitbook.io/", "_blank")
                      : document
                          .getElementById(e.key)
                          .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Text>{e.label}</Text>
                </Box>
              );
            })}
          </Flex>
        )}
        <Box
          ms="auto"
          w={{ sm: "100%", md: "unset" }}
          display="flex"
          alignItems="center"
          justifyContent="end"
          gap={{ base: "12px", sm: "24px" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={{ base: "12px", sm: "24px" }}
          >
            <NetWorkButton />
            <WalletButton />
          </Box>
          {isMobile ? null : (
            <Button
              // onClick={() => toast.success("Comming soon!")}
              onClick={() => window.open("/app", "_blank")}
            >
              Launch App
            </Button>
          )}
          <Box>{isTablet ? <NavbarLandingPageMobileMenu /> : null}</Box>
        </Box>
      </Flex>
    </SectionContainer>
  );
};

const NavbarLandingPageMobileMenu = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton p="8px" isActive={isOpen} as={Button}>
            {isOpen ? (
              <AiOutlineClose size="24px" />
            ) : (
              <AiOutlineMenu size="24px" />
            )}
          </MenuButton>
          <MenuList
            sx={{
              background: "#122126",
              border: "2px solid rgba(255, 255, 255, 0.70)",
              boxShadow: "0px 4px 4px 0px rgba(64, 64, 64, 0.20)",
            }}
            marginTop="24px"
            marginRight={{ base: "-14px", sm: "-20px", md: "-24px" }}
            // marginRight={{ base: "16px", md: "70px" }}
            // marginLeft={{ base: "16px", md: "70px" }}
            borderRadius={{ base: "12px" }}
            w={{
              base: "calc(100vw - 32px)",
              sm: "calc(100vw - 40px)",
              md: "calc(100vw - 160px)",
            }}
          >
            <Box
              sx={{
                padding: "24px",
                margin: "auto",
              }}
            >
              <Flex justify="center" gap="4px" direction="column">
                {tabs?.map((e, index) => {
                  return (
                    <Box
                      sx={{ px: "16px", py: "8px" }}
                      cursor="pointer"
                      onClick={() => {
                        document
                          .getElementById(e.key)
                          .scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <Text>{e.label}</Text>
                    </Box>
                  );
                })}
              </Flex>
              <Box pt="24px">
                <Button
                  w="100%"
                  onClick={() => toast.success("Comming soon!")}
                  // onClick={() => window.open("/app", "_blank")}
                >
                  Launch App
                </Button>
              </Box>
            </Box>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

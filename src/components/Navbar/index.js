import { Box, Flex, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import "./navbar-landing-page.css";
import { Link, useLocation } from "react-router-dom";
import { SectionContainer } from "components/container";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import SwitchModeButton from "components/button/switchModeButton";

const Navbar = () => {
  const isMobile = useCheckMobileScreen(480);
  const location = useLocation();
  if (["/pandora"].includes(location.pathname) && isMobile)
    return (
      <Box>
        <Flex
          className="navbar-container"
          position="relative"
          borderRadius={"0px"}
          borderX={"none"}
          borderTop={"none"}
          borderWidth={"1px"}
          paddingX={"16px"}
        >
          <Flex className="navbar-logo-container">
            <Link to={"/"}>
              <Image
                className="navbar-logo"
                alt="logo-app"
                src={AppLogo}
                loading="lazy"
              />
            </Link>
          </Flex>
          <Box
            ms="auto"
            w={{ sm: "100%", md: "unset" }}
            display="flex"
            alignItems="center"
            justifyContent="end"
            flexWrap="wrap"
            gap="14px"
          >
            <NetWorkButton />
            <WalletButton />
          </Box>
        </Flex>
      </Box>
    );
  return (
    <SectionContainer>
      <Flex
        className="navbar-container"
        padding={{ base: "8px 12px", sm: "16px 24px" }}
        position="relative"
      >
        <Flex className="navbar-logo-container">
          <Link to={"/"}>
            <Image
              className="navbar-logo"
              alt="logo-app"
              src={AppLogo}
              loading="lazy"
            />
          </Link>
        </Flex>
        <Box
          ms="auto"
          w={{ sm: "100%", md: "unset" }}
          display="flex"
          alignItems="center"
          justifyContent="end"
          flexWrap="wrap"
          gap={{base: "0px", sm: "14px"}}
        >
          {/* <NavbarLinks
              onOpen={props.onOpen}
              logoText={props.logoText}
              secondary={props.secondary}
              fixed={props.fixed}
              scrolled={scrolled}
            /> */}
          <NetWorkButton />
          <WalletButton />
        </Box>
      </Flex>
    </SectionContainer>
  );
};

export default Navbar;

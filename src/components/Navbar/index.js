import { Box, Flex, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import "./navbar-landing-page.css";
import { Link } from "react-router-dom";
import { SectionContainer } from "components/container";

const Navbar = () => {
  return (
    <SectionContainer>
      <Flex
        className="navbar-container"
        padding={{base:"8px 12px", sm: "16px 24px"}}
        position="relative"
      >
        <Flex className="navbar-logo-container">
          <Link to={"/"}>
            <Image className="navbar-logo" alt="logo-app" src={AppLogo} />
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

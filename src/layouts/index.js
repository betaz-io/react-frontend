import { Box } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import BackgroundImage from "assets/img/background.png";
import PandoraModeBackgroundImage from "assets/img/PandoraModeBackgoundImage.png";
import PandoraModeBgMobileImage from "assets/img/PandoraModeBgMobile.png";
import { useLocation } from "react-router-dom";
import BETAZFooter from "components/Footer";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import BuyNFT from "components/button/buyNFT";

const AppLayout = ({ children }) => {
  return (
    <Box
      background="#0F3435"
      sx={{
        paddingTop: "32px",
        minHeight: "100vh",
      }}
      bgImage={BackgroundImage}
      bgSize="cover"
    >
      <Navbar />
      <Box
        width={{ sm: "100%" }}
        mx="auto"
        sx={{ paddingTop: "20px" }}
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  );
};

const PandoraModeLayout = ({ children }) => {
  const isMobile = useCheckMobileScreen(480);
  return (
    <Box
      background="#0F3435"
      sx={{
        paddingTop: isMobile ? "0px" : "32px",
        minHeight: "100vh",
      }}
      bgImage={isMobile ? PandoraModeBgMobileImage : PandoraModeBackgroundImage}
      bgSize={isMobile ? "contain" : "cover"}
      position={"relative"}
    >
      <Navbar />
      <Box
        width={{ sm: "100%" }}
        mx="auto"
        sx={{ paddingTop: "20px" }}
        overflow="auto"
      >
        {children}
      </Box>
      <BuyNFT />
    </Box>
  );
};

const LandingPageLayout = ({ children }) => {
  return (
    <Box background="#0F3435" sx={{ minHeight: "100vh" }}>
      {/* <NavbarLandingPage /> */}
      <Box overflow="auto">{children}</Box>
      <BETAZFooter />
    </Box>
  );
};

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  if (["/"].includes(location.pathname))
    return <LandingPageLayout>{children}</LandingPageLayout>;
  if (["/pandora"].includes(location.pathname))
    return <PandoraModeLayout>{children}</PandoraModeLayout>;
  return <AppLayout>{children}</AppLayout>;
};

export default DefaultLayout;

import { Box, Image, Text } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo.png";
import playersIcon from "assets/img/playersIcon.png";
import azIcon from "assets/img/alephzeroIcon.png";
import TokenLogo from "assets/img/token-logo.png";
import IconBGEclipse from "assets/img/ellipse.png";
import IconSmallRec from "assets/img/icon-small-rectangle.png";
import IconBigRec from "assets/img/icon-big-rectangle.png";
import AzeroLogo from "assets/img/azero.png";

export const AppIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image
        aspectRatio={1}
        h={size}
        w={size}
        alt="logo-app"
        src={AppLogo}
        loading="lazy"
      />
    </Box>
  );
};

export const AzIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image
        aspectRatio={1}
        h={size}
        w={size}
        alt="logo-az"
        src={azIcon}
        loading="lazy"
      />
    </Box>
  );
};

export const PlayersIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image
        aspectRatio={1}
        // h={size}
        // w={size}
        alt="logo-players"
        src={playersIcon}
        loading="lazy"
      />
    </Box>
  );
};

export const AzeroIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image
        aspectRatio={1}
        h={size}
        w={size}
        alt="logo-app"
        src={AzeroLogo}
        loading="lazy"
      />
    </Box>
  );
};

export const TokenIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image
        aspectRatio={1}
        h={size}
        w={size}
        alt="logo-token"
        src={TokenLogo}
        loading="lazy"
      />
    </Box>
  );
};

export const EclipseIcon = ({ sx, text }) => {
  return (
    <Box sx={sx} position="relative">
      <Text
        className="shining-text"
        fontSize={{ base: "16px", sm: "24px" }}
        fontWeight={{ base: "500", sm: "700" }}
        sx={{
          w: "100%",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {text || ""}
      </Text>
      <Image
        aspectRatio={1}
        alt="bg-eclipse"
        src={IconBGEclipse}
        loading="lazy"
      />
    </Box>
  );
};

export const SmallRecIcon = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Image
        aspectRatio={1}
        alt="icon-small-rectangle"
        src={IconSmallRec}
        loading="lazy"
      />
    </Box>
  );
};

export const BigRecIcon = ({ sx, size }) => {
  return (
    <Box sx={sx}>
      <Image
        aspectRatio={1}
        h={size}
        w={size}
        alt="icon-big-rectangle"
        src={IconBigRec}
        loading="lazy"
      />
    </Box>
  );
};

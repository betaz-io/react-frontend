import { Box, Text } from "@chakra-ui/react";
import HistoryButtonImage from "assets/img/historyButton.png";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { BsChevronCompactUp } from "react-icons/bs";
import HistoryButtonImageMobile from "assets/img/historyButtonMobile.png";

const SubcribeEmailButton = ({ onClick }) => {
  const isMobile = useCheckMobileScreen(576);
  return (
    <Box
      sx={{
        height: "88px",
        marginTop: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      bgImage={isMobile ? HistoryButtonImageMobile : HistoryButtonImage}
      backgroundSize="cover"
      bgRepeat="no-repeat"
      bgPosition="top center"
      w="100%"
      cursor="pointer"
      onClick={onClick}
    >
      <BsChevronCompactUp size="24px" color="#1BECA6" />
      <Text
        sx={{
          background: "linear-gradient(180deg, #1bbff4 0%, #1beca7 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          fontsize: "24px",
          fontWeight: "700",
        }}
      >
        Subcribe Email
      </Text>
    </Box>
  );
};

export default SubcribeEmailButton;

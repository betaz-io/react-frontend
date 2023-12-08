import { Box, Text } from "@chakra-ui/react";
import LuckyNumberCircleImage from "assets/img/luckyNumberCircle.png";
import BetStageImage from "assets/img/bet-stage.png";
import "./styles.css";
import { useGame } from "contexts/useGame";

const LuckyNumberBox = () => {
  const { luckyNumber } = useGame();
  return (
    <Box
      className="lucky-number-container"
      bgImage={BetStageImage}
      bgRepeat="no-repeat"
      bgSize={{base:"cover", sm:"unset"}}
      bgPosition="center"
      height={{base:"500px", sm:"unset"}}
    >
      <Box
        className="lucky-number-circle-image"
        bgImage={LuckyNumberCircleImage}
        bgRepeat="no-repeat"
        bgPosition="center"
        h={{base:"280px", sm: "340px"}}
        w={{base:"280px", sm: "340px"}}
        mb={"40px"}
      >
        <Text className="lucky-number-title" fontSize={{base:"20px", sm:"24px"}}>Lucky Number</Text>
        <Text className="lucky-number-text" fontSize={{base:"32px", sm:"48px"}}>
          {luckyNumber < 0 ? "--" : luckyNumber}
        </Text>
      </Box>
    </Box>
  );
};

export default LuckyNumberBox;

import { Box, Image, Text } from "@chakra-ui/react";
import PandoraNumberSmallBackground from "assets/img/PandoraNumberSmallBackground.png";
import PandoraNumberBg from "assets/img/PandoraNumberBackground.png";
import PandoraNumberBox from "assets/img/PandoraNumberBox.png";
import EffectIcon from "assets/img/LightIcon1.png";
import TopPandoraNumber from "assets/img/TopPandoraNumber.png";
import PandoraBGNumberBlur from "assets/img/PandoraBGNumberBlur.png";
import { useGame } from "contexts/useGame";
import { convertTimeStampToNumber } from "utils";
import PandoraCountDown from "components/countdown/PandoraCountDown";
import { useSelector } from "react-redux";
import { getNextDayTime } from "utils";
import { getStartAndEndOfWeek } from "utils";
import { useEffect, useState } from "react";
import { execContractQuery } from "utils/contracts";
import pandora_pool_contract from "utils/contracts/pandora_pool";
import { useWallet } from "contexts/useWallet";
import { convertToFixedLengthNumberString } from "utils";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraNumber = () => {
  // const { luckyNumber } = useGame();
  const { sessionId } = useSelector((s) => s.pandoraNft);
  const { api } = useWallet();
  const [winNumber, setWinNumber] = useState(0);
  const weeks = getStartAndEndOfWeek(7);
  const sectionPresent = {
    sessionId: +sessionId - 1,
    startDate: weeks.startOfWeek,
    endDate: weeks.endOfWeek,
  };

  const getWinNumber = async () => {
    const sessionIdPrev = +sessionId - 1;
    let sessionInfo = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getBetSession",
      sessionIdPrev
    );
    if (sessionIdPrev >= 1)
      setWinNumber(sessionInfo?.toHuman().Ok?.randomNumber);
  };

  useEffect(() => {
    if (api && sessionId) getWinNumber();
  }, [api, sessionId]);

  return (
    <Box className="section-pandora-left">
      <Box className="section-pandora-present-result">
        <Box
          className="lucky-number-circle-image"
          bgImage={TopPandoraNumber}
          bgRepeat="no-repeat"
          bgPosition="center"
          h={{ base: "35px", sm: "65px" }}
          w={{ base: "210px", sm: "437px" }}
          mx={{ base: "auto" }}
          mb={{ base: "20px" }}
          position="relative"
        >
          <Image
            position="absolute"
            w={{base:"120px", sm:"240px"}}
            top={{base:"-12px", sm:"-26px"}}
            left={{base: "52px", sm: "13px"}}
            src={EffectIcon}
            className="pandora-effect-icon"
            loading="lazy"
          />
          {sectionPresent.sessionId >= 1 && (
            <Text
              mt={{ base: "12px", sm: "20px" }}
              fontSize={{ base: "16px", sm: "32px" }}
              fontStyle={{ base: "normal" }}
              fontWeight={{ base: "700" }}
              textTransform={"uppercase"}
            >
              Results of session #{sectionPresent.sessionId}
            </Text>
          )}
        </Box>
        <Box
          className="lucky-number-container"
          bgImage={PandoraNumberBg}
          bgRepeat="no-repeat"
          bgSize={{ base: "100% auto", sm: "unset" }}
          bgPosition="center"
          h={{ base: "37.5vh", sm: "500px" }}
          w={{ base: "100%", sm: "unset" }}
          mx={{ base: "auto", sm: "unset" }}
          position="relative"
        >
          <Box position="absolute" top="-20px">
            {sectionPresent.sessionId >= 1 && (
              <Text
                className="lucky-number-text"
                fontSize={{ base: "12px", sm: "24px" }}
              >
                {sectionPresent.startDate} - {sectionPresent.endDate}
              </Text>
            )}
          </Box>
          <Box
            className="lucky-number-circle-image"
            bgImage={PandoraNumberSmallBackground}
            bgRepeat="no-repeat"
            bgPosition="center"
            h={{ base: "189px", sm: "295px" }}
            w={{ base: "189px", sm: "295px" }}
            mb={"50px"}
          >
            <Box
              className="lucky-number-circle-image"
              bgImage={PandoraNumberBox}
              bgRepeat="no-repeat"
              bgPosition="center"
              minW={{ base: "120px", sm: "240px" }}
              w={{ base: "120px", sm: "240px" }}
              position="relative"
            >
              <Image
                position="absolute"
                w="200px"
                top={{base:"34px", sm:"-10px"}}
                left={{base: "-52px", sm: "-80px"}}
                src={EffectIcon}
                className="pandora-effect-icon"
                loading="lazy"
              />
              <Image
                position="absolute"
                w="200px"
                bottom={{base:"34px", sm:"30px"}}
                right={{base: "-52px", sm: "-85px"}}
                src={EffectIcon}
                className="pandora-effect-icon"
                loading="lazy"
              />
              <Box w={"max-content"} mb={{ base: "30px" }} overflow="hidden">
                <Box
                  className="lucky-number-circle-image"
                  bgImage={PandoraBGNumberBlur}
                  bgRepeat="no-repeat"
                  bgPosition="center"
                  minW={{ base: "max-content" }}
                  w={{ base: "200px", sm: "240px" }}
                  position={"relative"}
                >
                  <Text
                    top={"40px"}
                    left={"50%"}
                    transform={"translateX(-50%)"}
                    mt={{ base: "24px" }}
                    fontSize={{ base: "18px", sm: "28px" }}
                    fontStyle={{ base: "normal" }}
                    fontWeight={{ base: "700" }}
                    position={"absolute"}
                    minW={"340px"}
                    textAlign={"center"}
                    textShadow={"3px 3px 6px #000000"}
                  >
                    Pandora Number
                  </Text>
                  <Text
                    className="pandora-number-text"
                    fontSize={{ base: "20px", sm: "32px" }}
                  >
                    {winNumber === 0
                      ? "--"
                      : convertToFixedLengthNumberString(
                          Number(winNumber?.replaceAll(",", "")),
                          6
                        )}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box className="section-pandora-section-later-time">
        <Text
          mt={{ base: "20px" }}
          fontSize={{ base: "32px" }}
          fontStyle={{ base: "normal" }}
          fontWeight={{ base: "700" }}
          textAlign="center"
        >
          Session #{sectionBefor.sessionId} begins in
        </Text>
        <Box maxW={{ base: "360px" }} mx="auto">
          <PandoraCountDown date={endTimeNumber} />
        </Box>
      </Box> */}
    </Box>
  );
};

export default PandoraNumber;

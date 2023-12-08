import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import FooterBG from "assets/img/footer-bg.png";
import { SectionContainer } from "components/container";
import AppLogoText from "assets/img/app-logo-text.png";
import { BsFacebook, BsTelegram } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillRedditCircle } from "react-icons/ai";

const BETAZFooter = () => {
  return (
    <Flex
      bgImage={FooterBG}
      aspectRatio={6.15}
      w="full"
      bgSize="cover"
      bgRepeat="no-repeat"
      direction="column"
      gap={{ base: "24px" }}
    >
      <Flex flex={1} direction="column" justify="center" mt={{ base: "24px" }}>
        <SectionContainer>
          <Flex
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            gap={{ base: "24px" }}
          >
            <Box>
              <Flex>
                <Image
                  height={{ base: "24px" }}
                  alt="app-logo-text"
                  src={AppLogoText}
                />
                <SimpleGrid ml="24px" columns={4} spacing="12px">
                  {[
                    {
                      icon: <BsFacebook size="16px" color="#8991A9" />,
                      url: "",
                    },
                    {
                      icon: <RiTwitterXFill size="16px" color="#8991A9" />,
                      url: "https://twitter.com/BETAZ_IO",
                    },
                    {
                      icon: <BsTelegram size="16px" color="#8991A9" />,
                      url: "https://t.me/BetAZ_IO",
                    },
                  ].map((e, index) => {
                    return (
                      <Flex
                        onClick={() => window.open(e.url, "_blank")}
                        w="28px"
                        aspectRatio={1}
                        justify="center"
                        alignItems="center"
                        cursor="pointer"
                      >
                        {e.icon}
                      </Flex>
                    );
                  })}
                </SimpleGrid>
              </Flex>
              <Text
                sx={{
                  fontsize: "16px",
                  fontWeight: "400",
                  mt: "20px",
                }}
              >
                Contact us: <a href="mailto:admin@betaz.io">admin@betaz.io</a>
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 2, sm: 4 }} spacing="24px">
              {[
                {
                  label: "Tokenomic",
                  key: "section-tokenomic",
                },
                {
                  label: "Roadmap",
                  key: "section-roadmap",
                },
                {
                  label: "CONTACT US",
                  key: "section-contact-us",
                },
                // {
                //   label: "Public sale",
                //   key: "section-deposit",
                // },
                {
                  label: "team",
                  key: "section-team-member",
                },
              ].map((e, index) => {
                return (
                  <Text
                    color="#FFF"
                    fontSize="16px"
                    fontWeight="500"
                    py="4px"
                    cursor="pointer"
                    onClick={() => {
                      if (e?.key)
                        document
                          .getElementById(e.key)
                          .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {e.label.toUpperCase()}
                  </Text>
                );
              })}
            </SimpleGrid>
          </Flex>
        </SectionContainer>
      </Flex>
      <Flex direction="column" pb="24px">
        <Text textAlign="center">© Copyright 2023 BetAZ</Text>
      </Flex>
    </Flex>
  );
};

export default BETAZFooter;

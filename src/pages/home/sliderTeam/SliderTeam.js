import { Box, Flex, Image, Text } from "@chakra-ui/react";
import AvatarImage from "assets/img/avatar.png";
import AvatarImageCong from "assets/img/team/cong.png";
import AvatarImageHieu from "assets/img/team/hieu.png";
import AvatarImageTrung from "assets/img/team/trung.png";
import AvatarImageThong from "assets/img/team/thong.png";
import AvatarImageThanh from "assets/img/team/thanh.png";
import { useState } from "react";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// css
import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";

const teamList = [
  {
    name: "Thong Phung",
    role: "Chief Executive Officer",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImageThong,
  },
  {
    name: "Hieu Nguyen",
    role: "Chief Technology Officer",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImageHieu,
  },
  {
    name: "Cong Vu",
    role: "Business Manager",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImageCong,
  },
  {
    name: "Thanh Tran",
    role: "Full Stack Developer",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImageThanh,
  },
  {
    name: "Trung Pham",
    role: "Blockchain Developer",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImageTrung,
  },
];

const SliderTeam = () => {
  const isMobile = useCheckMobileScreen(576);
  const isTablet = useCheckMobileScreen(1200);

  // carosel
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "50%" });
  const side = useBreakpointValue({ base: "-10px" });

  const settings = {
    dots: false,
    arrows: false,
    // fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 8000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box
      position="relative"
      width="100%"
      spacing="24px"
      mt={{ base: "24px", sm: "72px" }}
      h="max-content"
      sx={{
        ".slick-slide": {
          padding: "12px",
          w: "100%",
        },
      }}
    >
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <FaAngleLeft />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <FaAngleRight />
      </IconButton>
      {/* Slider */}
      <Slider
        ref={(slider) => setSlider(slider)}
        // fade={true}
        {...settings}
      >
        {teamList.map((e, index) => (
          // item
          <Box>
            <Image
              w="100%"
              aspectRatio={0.8}
              alt="Tokenomic-cup"
              src={e.avatar}
              verticalAlign="middle"
              loading="lazy"
            />
            <Box className="member-infor-container">
              <Box py="24px" px="12px" bg="#131a20">
                <Text className="member-name-text linear-text-color-01">
                  {e.name}
                </Text>
              </Box>
              <Box className="member-description-container">
                <Text className="member-role-text">{e.role}</Text>
                {/* <Box h="2px" bg="#2A3741" />
                <Text className="member-description-text">{e.description}</Text> */}
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderTeam;

import { extendTheme } from "@chakra-ui/react";

const buttonDisableStyle = {
  background: "#DEDEDE",
  color: "#A4B0B6",
  opacity: "1"
};

const customTheme = extendTheme({
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
    // Add more font styles if needed
  },
  styles: {
    global: {
      // Set the default text color here
      color: "#F7F7F8",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        borderRadius: "12px",
        fontSize: "16px",
      },
      variants: {
        solid: {
          background: "linear-gradient(180deg, #1BECA6 0%, #1BBEF5 100%)",
          _disabled: {
            ...buttonDisableStyle,
          },
        },
        _disabled: {
          ...buttonDisableStyle,
          _hover: {
            ...buttonDisableStyle,
          },
        },
      },
    },
    ModalContent: {
      baseStyle: {
        background: "red",
      },
    },
    Text: {
      baseStyle: {
        color: "#F7F7F8",
      },
    },
  },
});

export default customTheme;

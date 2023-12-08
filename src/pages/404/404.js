import { Box, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <>
      <Box h="100vh" w="100%">
        <Text
          textAlign="center"
          mt="100px"
          fontSize={{ base: "32", sm: "48px" }}
          fontWeight={{ base: "500", sm: "700" }}
          className="linear-text"
        >
          404 NOT FOUND
        </Text>
      </Box>
    </>
  );
};

export default NotFoundPage;

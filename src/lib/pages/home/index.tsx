import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import HeroSection from "lib/components/Hero";

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
      <HeroSection />
    </Flex>
  );
};

export default Home;

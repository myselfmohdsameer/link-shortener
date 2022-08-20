import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Link as ChakraLink,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import MotionBox from "lib/components/motion/Box";
import Shortener from "lib/components/Shortener";

const Shorten = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <NextSeo title="Shorten" />
      <Shortener />
    </Flex>
  );
};

export default Shorten;

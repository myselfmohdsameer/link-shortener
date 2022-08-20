import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Icon,
  HStack,
  Box,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import debounce from "lodash/debounce";
import { customAlphabet } from "nanoid";
import type { NextPage } from "next";
import { useState } from "react";

import { trpc } from "../../utils/trpc";

type Form = {
  slug: string;
  url: string;
};

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const url = "https://sam.vercel.app";
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 3);

  const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createSlug = trpc.useMutation(["createSlug"]);

  if (createSlug.status === "success") {
    return (
      <Stack spacing={4} align="center">
        <CheckCircleIcon boxSize="50px" color="green.500" />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {`${url}/${form.slug}`}{" "}
        </Heading>
        <Text color="gray.500">Link has been shortened successfully!</Text>
        <HStack>
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
            onClick={() => {
              copy(`${url}/${form.slug}`);
            }}
          >
            Copy Link
          </Button>
          <Button
            onClick={() => {
              createSlug.reset();
              setForm({ slug: "", url: "" });
            }}
          >
            Reset
          </Button>
        </HStack>
      </Stack>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ ...form });
      }}
    >
      <Text
        mt={2}
        mb={4}
        textAlign="center"
        color={slugCheck.data?.used ? "red.500" : "gray.500"}
      >
        {slugCheck.data?.used
          ? "Slug already in use! 😢 Please use different."
          : "Magic, ain't it! ✌️"}
      </Text>
      <Stack spacing={4} align="center">
        <InputGroup>
          <InputLeftAddon children="https://sam.vercel.app/" />
          <Input
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                slug: e.target.value,
              });
              debounce(slugCheck.refetch, 100);
            }}
            minLength={1}
            placeholder="custom"
            value={form.slug}
            pattern="^[-a-zA-Z0-9]+$"
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            required
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children={<LinkIcon name="link" />} />
          <Input
            type="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://google.com"
            required
          />
        </InputGroup>
        <HStack spacing="24px" textAlign="center">
          <Button
            type="submit"
            disabled={slugCheck.isFetched && slugCheck.data!.used}
          >
            Shorten
          </Button>
          <Button
            value="Random"
            onClick={() => {
              const slug = nanoid();
              setForm({
                ...form,
                slug,
              });
              slugCheck.refetch();
            }}
          >
            Random
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};

export default CreateLinkForm;

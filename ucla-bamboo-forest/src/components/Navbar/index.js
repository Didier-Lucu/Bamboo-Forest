import { Button, Flex, Link, Spacer, Box, Icon } from "@chakra-ui/react";
import { DASHBOARD } from "lib/router";
import { Link as RouterLink } from "react-router-dom";
import { useLogOut, useAuth } from "hooks/Auth";
import { PROTECTED } from "lib/router";
import SearchBar from "./SearchBar";
import { AiFillHome } from "react-icons/ai";

export default function Navbar() {
  const { logout, isLoading } = useLogOut();
  const { user } = useAuth();

  const iconStyles = {
    color: "blue.500",
    _hover: { color: "blue.600" },
  };

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="blue.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link as={RouterLink} to={DASHBOARD}>
          <Icon as={AiFillHome} boxSize={7} {...iconStyles} />
        </Link>
        <Link
          ml="8"
          as={RouterLink}
          to={`${PROTECTED}/users`}
          fontWeight="bold"
          {...iconStyles}
        >
          All Users
        </Link>
        <Spacer />
        <SearchBar />
        <Spacer />
        <Link
          ml="8"
          as={RouterLink}
          to={`${PROTECTED}/profile/${user?.id}`}
          fontWeight="bold"
          {...iconStyles}
        >
          <Box ml="2">My Profile</Box>
        </Link>
        <Button
          ml="8"
          colorScheme="blue"
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}

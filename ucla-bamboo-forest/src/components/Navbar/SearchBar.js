import React, { useState } from "react";
import { Input, InputGroup, VStack, Box, Text, Link, InputRightElement } from "@chakra-ui/react";
import { useAllUsers } from "hooks/users";
import { PROTECTED } from "lib/router";
import { Link as RouterLink } from "react-router-dom";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

export default function SearchBar() {
  const { users, isLoading: usersLoading } = useAllUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  const handleFilter = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    const newFilter = users.filter((user) => {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (searchTerm === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  const clearSearchBar = () => {
    setFilteredUsers([]);
    setSearchInput("");
  }

  return (
    <VStack mr="auto" align="left" height="100%" mt="5">
      <InputGroup>
        <Input
          placeholder="Search For Users"
          size="md"
          variant="filled"
          htmlSize={60}
          width="auto"
          onChange={handleFilter}
          value={searchInput}
        />
        <InputRightElement
          children={searchInput?.length === 0 ? (
            <SearchIcon color="gray.500"/>
          ) : (
            <CloseIcon color="gray.500" onClick={clearSearchBar}/>
          )}
        />
      </InputGroup>
      {filteredUsers?.length !== 0 && (
        <Box
          pt="2"
          pb="2"
          pl="5"
          pr="5"
          minH="140"
          bg="white"
          overflowY="auto"
          borderWidth="1px"
          borderColor="gray.300"
          sx={{ "::-webkit-scrollbar": { display: "none" } }}
        >
          <VStack>
            {usersLoading ? (
              <Text>Loading Users...</Text>
            ) : (
              filteredUsers?.map((user) => (
                <Link
                  p="1"
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  width="100%"
                  as={RouterLink}
                  to={`${PROTECTED}/profile/${user?.id}`}
                  onClick={clearSearchBar}
                >
                  {user.username}
                </Link>
              ))
            )}
          </VStack>
        </Box>
      )}
    </VStack>
  );
}

import React, { useState } from "react";
import { Input, VStack, Box, Text } from "@chakra-ui/react";
import { useAllUsers } from "hooks/users"


export default function SearchBar() {
    
  const { users, isLoading: usersLoading } = useAllUsers();
  const [ filteredUsers, setFilteredUsers ] = useState([]);

  const handleFilter = (event) => {
    const searchTerm = event.target.value;
    const newFilter = users.filter((user) => {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (searchTerm === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };
  
    return(
      <VStack mr="150" align="left" height="100%" mt="5">
        <Input
          placeholder="Search For Users"
          size="md"
          variant="filled"
          htmlSize={60}
          width="auto"
          onChange={handleFilter}
        />
        {filteredUsers?.length !== 0 && (
          <Box 
            pl="5" 
            pr="5"
            minH="140" 
            bg="white"  
            overflowY="auto" 
            borderWidth="1px" 
            borderColor="black"
            sx={{ '::-webkit-scrollbar':{display:'none'} }}
            >
            {usersLoading ? (
              <Text>Loading Users...</Text>
            ) : (
              filteredUsers?.map((user) => 
                <Box margin="3" borderBottomWidth="1px" borderColor="gray.200">{user.username}</Box>)
            )}
          </Box>
        )}
      </VStack>
    )
}
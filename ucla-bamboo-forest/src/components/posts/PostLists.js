import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Checkbox,
  CheckboxGroup,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Post from "./index";

export default function PostLists({ posts }) {
  const [sortBy, setSortBy] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const categories = posts.reduce((acc, post) => {
    post.category.forEach(category => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  function sortedPosts(posts) {
    if (sortBy === "newest") {
      return posts.sort((a, b) => b.date - a.date);
    } else if (sortBy === "oldest") {
      return posts.sort((a, b) => a.date - b.date);
    } else if (sortBy === "most-popular") {
      return posts.sort((a, b) => b.likes.length - a.likes.length);
    } else if (sortBy === "least-popular") {
      return posts.sort((a, b) => a.likes.length - b.likes.length);
    } else {
      return posts;
    }
  }

  const filtered = selectedFilters.length > 0 
  ? posts.filter((post) => {
      return selectedFilters.some(filter => post.category.includes(filter));
    })
  : posts;

  const sorted = sortedPosts(filtered);

  const categoryCounts = categories.reduce((acc, category) => {
    const count = posts.filter((post) => post.category.includes(category)).length;
    acc[category] = count;
    return acc;
  }, {});

  return (
    <Box position="relative">
      {sorted?.length > 0 && (
        <VStack
          position="absolute"
          right={20}
          top={10}
          align="stretch"
          justify="center"
          spacing={4}
        >
          <VStack align="stretch" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Category
            </Text>
            <CheckboxGroup value={selectedFilters} onChange={(value) => setSelectedFilters(value)}>
              {categories.map((category) => (
                <Checkbox key={category} value={category}>
                  {`${category} (${categoryCounts[category]})`}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </VStack>
        </VStack>
      )}
      {sorted?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Posts Yet
        </Text>
      ) : (
        <Box paddingX={"200px"} align={"center"}>
          <HStack>
          <Box paddingX={"60px"} paddingRight={"10px"} align={"left"}>
            <Menu>
              <MenuButton as={Button} rightIcon={<HamburgerIcon />} colorScheme="blue">
                Sort by {sortBy === "" ? "(Default)" : ""}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSortBy("newest")}>
                  Newest to Oldest
                </MenuItem>
                <MenuItem onClick={() => setSortBy("oldest")}>
                  Oldest to Newest
                </MenuItem>
                <MenuItem onClick={() => setSortBy("most-popular")}>
                  Most Popular
                </MenuItem>
                <MenuItem onClick={() => setSortBy("least-popular")}>
                  Least Popular
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          {sortBy === "newest" && (
                <Box border="1px" borderColor="gray.200" px="1">Newest to Oldest</Box>
              )}
              {sortBy === "oldest" && (
                <Box border="1px" borderColor="gray.200" px="1">Oldest to Newest</Box>
              )}
              {sortBy === "most-popular" && (
                <Box border="1px" borderColor="gray.200" px="1">Most Popular</Box>
              )}
              {sortBy === "least-popular" && (
                <Box border="1px" borderColor="gray.200" px="1">Least Popular</Box>
              )} 
           </HStack>
          <Box>
            {sorted.map((post) => (
              <Box key={post.id} mb={4}>
                <Post post={post} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
};
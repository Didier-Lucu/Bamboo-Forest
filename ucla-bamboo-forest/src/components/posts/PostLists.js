import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import Post from "./index";
import { useCategories } from "hooks/Categories";

export default function PostLists({ posts }) {
  const { categories, getCategories } = useCategories();
  const [sortBy, setSortBy] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
    const count = posts.filter((post) => post.category.includes(category.name)).length;
    acc[category.name] = count;
    return acc;
  }, {});

  return (
    <Box position="relative">
      <VStack
        position="absolute"
        right={10}
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
              <Checkbox key={category.id} value={category.name}>
                {`${category.name} (${categoryCounts[category.name]})`}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </VStack>
      </VStack>
      {sorted?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Posts Yet
        </Text>
      ) : (
        <Box paddingX={"200px"} align={"center"}>
          <Box paddingX={"60px"} align={"left"}>
            <Menu>
              <MenuButton as={Button} rightIcon={<HamburgerIcon />}>
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
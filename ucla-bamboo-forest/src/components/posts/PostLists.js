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
  HStack,
} from "@chakra-ui/react";
import Post from "./index";

export default function PostLists({ posts }) {
  const [sortBy, setSortBy] = useState("");

  const compareCategories = (a, b) => {
    const aCat = a.category.join("");
    const bCat = b.category.join("");
    return aCat.localeCompare(bCat);
  };

  function sortedPosts(posts) {
    if (sortBy === "newest") {
      return posts.sort((a, b) => b.date - a.date);
    } else if (sortBy === "oldest") {
      return posts.sort((a, b) => a.date - b.date);
    } else if (sortBy === "category") {
      return posts.sort(compareCategories);
    } else if (sortBy === "most-popular") {
      return posts.sort((a, b) => b.likes.length - a.likes.length);
    } else if (sortBy === "least-popular") {
      return posts.sort((a, b) => a.likes.length - b.likes.length);
    } else {
      return posts;
    }
  }

  const sorted = sortedPosts(posts);

  return (
    <Box paddingX={"200px"} align={"center"}>
      {sorted?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Posts Yet
        </Text>
      ) : (
        <>
          {sorted?.length > 0 && (
            <HStack>
              <Box paddingLeft={"60px"} paddingRight={"10px"} align={"left"}>
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
                    <MenuItem onClick={() => setSortBy("category")}>
                      Sort by Category
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
              {sortBy === "category" && (
                <Box border="1px" borderColor="gray.200" px="1">Sort by Category</Box>
              )}
              {sortBy === "most-popular" && (
                <Box border="1px" borderColor="gray.200" px="1">Most Popular</Box>
              )}
              {sortBy === "least-popular" && (
                <Box border="1px" borderColor="gray.200" px="1">Least Popular</Box>
              )} 
            </HStack>
          )}

          {sorted?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </Box>
  );
}

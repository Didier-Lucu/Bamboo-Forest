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
    }
    else if (sortBy === "oldest") {
      return posts.sort((a, b) => a.date - b.date);
    }
    else if (sortBy === "category") {
      return posts.sort(compareCategories);
    }
    else if (sortBy === "most-popular") {
      return posts.sort((a, b) => b.likes.length - a.likes.length);
    }
    else if (sortBy === "least-popular") {
      return posts.sort((a, b) => a.likes.length - b.likes.length);
    }
    else {
      return posts;
    }
  }

  return (
    <Box paddingX={"200px"} align={"center"}>
      <Box paddingX={"60px"} align={"left"}>
        <Menu>
          <MenuButton as={Button} rightIcon={<HamburgerIcon />}>
            Sort by {sortBy === "" ? "(Default)" : ""}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSortBy("newest")}>Newest to Oldest</MenuItem>
            <MenuItem onClick={() => setSortBy("oldest")}>Oldest to Newest</MenuItem>
            <MenuItem onClick={() => setSortBy("category")}>Sort by Category</MenuItem>
            <MenuItem onClick={() => setSortBy("most-popular")}>Most Popular</MenuItem>
            <MenuItem onClick={() => setSortBy("least-popular")}>Least Popular</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {sortedPosts(posts)?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Posts Yet
        </Text>
      ) : (
        sortedPosts(posts)?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}

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

  function sortedPosts(posts) {
    if (sortBy === "most-popular") {
      return posts.sort((a, b) => b.likes.length - a.likes.length);
    }
    else if (sortBy === "least-popular") {
      return posts.sort((a, b) => a.likes.length - b.likes.length);
    }
    else if (sortBy === "most-recent") {
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
            <MenuItem onClick={() => setSortBy("most-recent")}>Sort by Date</MenuItem>
            <MenuItem>Sort by Category</MenuItem>
            <MenuItem onClick={() => setSortBy("most-popular")}>Sort by Most Likes</MenuItem>
            <MenuItem onClick={() => setSortBy("least-popular")}>Sort by Least Likes</MenuItem>
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

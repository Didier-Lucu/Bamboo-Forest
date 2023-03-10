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
  return (
    <Box paddingX={"200px"} align={"center"}>
      <Box paddingX={"60px"} align={"left"}>
        <Menu>
          <MenuButton as={Button} rightIcon={<HamburgerIcon />}>
            Sort by
          </MenuButton>
          <MenuList>
            <MenuItem>Sort by Date</MenuItem>
            <MenuItem>Sort by Category</MenuItem>
            <MenuItem>Sort by Most Likes</MenuItem>
            <MenuItem>Sort by Least Likes</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {posts?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Posts Yet
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}

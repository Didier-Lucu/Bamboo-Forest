import { Box, Text } from "@chakra-ui/react";
import Post from "./index";

export default function PostLists({ posts }) {
    return (
        <Box paddingX={"200px"} align={"center"}>
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
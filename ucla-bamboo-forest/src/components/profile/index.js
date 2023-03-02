import PostsLists from "components/posts/PostLists";
import { usePosts } from "hooks/Posts"
import { useParams } from "react-router-dom";
import { useUser } from "hooks/users";
import { Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import Avatar from "./Avatar";
import { format } from "date-fns";


export default function Profile() {
    const { id } = useParams();
    const { posts, isLoading: postsLoading } = usePosts(id);
    const { user, isLoading: userLoading } = useUser(id);

    if (userLoading) return "Loading...";
    
    return (
        <Stack spacing="5">
            <Flex p={["4", "6"]} pos="relative" align="center">
                <Avatar size="xl" user={user} />
                <Stack ml="10">
                    <Text fontSize="xl">{user.username}</Text>
                    <HStack spacing="10">
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Posts: {posts.length}
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Likes: TODO
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Joined: {format(user.date, "MMMM YYY")}
                        </Text>
                    </HStack>
                </Stack>
            </Flex>
            <Divider />
            {postsLoading ? 
            <Text>Posts are loading...</Text> : 
            <PostsLists posts={posts} />}
        </Stack>
    );
}
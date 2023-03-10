import PostsLists from "components/posts/PostLists";
import { usePosts } from "hooks/Posts"
import { useParams } from "react-router-dom";
import { useUser } from "hooks/users";
import { useAuth } from "hooks/Auth";
import { Divider, Flex, HStack, Stack, Text, Button, useDisclosure } from "@chakra-ui/react";
import Avatar from "./Avatar";
import { format } from "date-fns";
import EditProfile from "./EditProfile"


export default function Profile() {
    const { id } = useParams();
    const { posts, isLoading: postsLoading } = usePosts(id);
    const { user, isLoading: userLoading } = useUser(id);
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (userLoading) return "Loading...";
    
    return (
        <Stack spacing="5">
            <Flex p={["4", "6"]} pos="relative" align="center">
                <Avatar size="xl" user={user} />
                
                {!authLoading && (authUser.id === user.id) &&
                    <Button pos="absolute" mb="2" top="6" right="6" colorScheme="blue" onClick={onOpen}>
                        Change Profile Picture
                    </Button>}


                <Stack ml="10">
                    <Text fontSize="xl">{user.username}</Text>
                    <HStack spacing="10">
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Posts: {posts.length}
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Likes: {posts.map(post => post.likes.length).reduce((result,number)=> result+number)}
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Joined: {format(user.date, "MMMM YYY")}
                        </Text>
                        
                    </HStack>
                </Stack>

                <EditProfile isOpen={isOpen} onClose={onClose} />
            </Flex>
            <Divider />
            {postsLoading ? 
            <Text>Posts are loading...</Text> : 
            <PostsLists posts={posts} />}
        </Stack>
    );
}
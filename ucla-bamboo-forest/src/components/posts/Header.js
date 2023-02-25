import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "components/profile/Avatar"
import { useUser } from "hooks/users";
import { formatDistanceToNow } from "date-fns";
import UsernameButton from "components/profile/usernameButton";

export default function Header({ post }) {
    const { uid, date } = post
    const { user, isLoading } = useUser(uid);

    if (isLoading) return "Loading..."

    return (
        <Flex
            alignItems={"center"}
            borderBottom={"2px solid"}
            borderColor={"teal.100"}
            padding={"3"}
            background={"gray.50"}
        >
            <Avatar user={user} size={"md"} />

            <Box marginLeft={"4"}>
                <UsernameButton user={user} />
                <Text fontSize={"sm"} color={"gray.500"}>
                    {formatDistanceToNow(date)} ago
                </Text>
            </Box>
        </Flex>
    );
}
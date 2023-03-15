import { Button, Code, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/router";
import Avatar from "components/profile/Avatar";


export default function User({ user, curid }) {
    const { id, username} = user;
    
 

    return (
        <VStack
            bg="gray.100"
            shadow="sm"
            rounded="md"
            textAlign="center"
            p="4"
            spacing="3"
        >
            <Avatar user={user} />
            <Code>@{username}</Code>
            <Link justifyItems="space-between">
                <Button
                    as={Link}
                    to={`${PROTECTED}/profile/${id}`}
                    size="sm"
                    variant="link"
                    colorScheme="yellow"
                >
                    View Profile
                </Button>

                <Button
                    
                    as={Link}
                    to={`${PROTECTED}/messages/${curid}/${id}`}
                    size="sm"
                    variant="link"
                    colorScheme="yellow"
                    ml={"50px"}
                >
                    Message
                </Button>
            </Link>
        </VStack>
    );
}
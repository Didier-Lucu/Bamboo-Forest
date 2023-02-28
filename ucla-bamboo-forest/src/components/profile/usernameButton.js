import { Button } from "@chakra-ui/react";
import { PROTECTED } from "lib/router";
import { Link } from "react-router-dom";

export default function UsernameButton({ user }) {

    return (
        <Button
            as={Link}
            to={`${PROTECTED}/profile/${user.id}`}
            colorScheme={"yellow"}
            variant={"link"}
        >{user.username}
        </Button>
    )
}
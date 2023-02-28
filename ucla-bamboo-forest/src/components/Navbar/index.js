import { Button, Flex, Link } from "@chakra-ui/react";
import { DASHBOARD } from "lib/router";
import { Link as RouterLink } from "react-router-dom";
import { useLogOut } from "hooks/Auth";

export default function Navbar() {
    const { logout, isLoading } = useLogOut();


    return (
        <Flex
            shadow="sm"
            pos="fixed"
            width="full"
            borderTop="6px solid"
            borderTopColor="blue.400"
            height="16"
            zIndex="3"
            justify="center"
            bg="white"
        >
            <Flex px="4" w="full" align="center" maxW="1200px">
                <Link color="black" as={RouterLink} to={DASHBOARD} fontWeight="bold">
                    Home
                </Link>
                <Button
                    ml="auto"
                    colorScheme="blue"
                    size="sm"
                    onClick={logout}
                    isLoading={isLoading}>
                    Log Out
                </Button>
            </Flex>
        </Flex>
    );
}
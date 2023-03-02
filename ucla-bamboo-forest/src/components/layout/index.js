import userEvent from "@testing-library/user-event";
import { LOGIN } from "lib/router";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/Auth";
import Navbar from "components/Navbar";
import { Box, Flex } from "@chakra-ui/react";

export default function Layout() {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && pathname.startsWith("/protected") && !user) {
            navigate(LOGIN);
        }
    }, [pathname, user, isLoading]);

    if (isLoading) {
        return "Loading..."
    }

    return (
        <>
            <Navbar />
            <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200px">
                <Box w="1100px">
                    <Outlet />
                </Box>
            </Flex>
            
        </>
    );
}

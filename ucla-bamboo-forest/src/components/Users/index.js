import { SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "hooks/Auth";
import { useAllUsers } from "hooks/users";
import User from "./User";

export default function Users() {
    const { users, isLoading } = useAllUsers();
    const { user, isLoading: authLoading } = useAuth();
    

    if (isLoading || authLoading) return "Loading...";
    const curid = user.id;
    return (
        
        <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
            {users?.map((user) => (
                <User key={user.id} user={user} curid={curid}/>
            ))}
        </SimpleGrid>
    );
}
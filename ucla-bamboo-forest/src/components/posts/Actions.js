import { Flex, IconButton } from "@chakra-ui/react";
import { useAuth } from "hooks/Auth";
import { FaRegHeart, FaHeart , FaRegTrashAlt, FaRegComment} from "react-icons/fa";
import { useToggleLike , useDeletePost } from "hooks/Posts";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/router";

export default function Actions({ post }) {
    const { id, likes } = post;
    const { user, isLoading: userLoading } = useAuth();

    const isLiked = likes.includes(user?.id);
    const { toggleLike, isLoading: toggleLikeLoading } = useToggleLike({ id, isLiked, uid: user?.id });
    //const {deletePost, isLoading:deleteLoading }= useDeletePost(id);

    return (
        <Flex padding={"2"}>
            <Flex alignItems={"center"}>
                <IconButton
                    onClick={toggleLike}
                    isLoading={toggleLikeLoading || userLoading}
                    size={"md"}
                    colorScheme={"red"}
                    variant={"ghost"}
                    icon={isLiked ? <FaHeart /> : <FaRegHeart />}
                    isRound
                />
                {likes.length}
            </Flex>
            <Flex alignItems={"center"} marginLeft={"2"}>
                <IconButton
                    onClick={toggleLike}
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
                    isLoading={toggleLikeLoading || userLoading}
                    size={"md"}
                    colorScheme={"teal"}
                    variant={"ghost"}
                    icon={ <FaRegComment />}
                    isRound
                />
                5
            </Flex>
            <Flex alignItems={"center"} marginLeft={"2"}>
                <IconButton
                    //onClick={deletePost}
                    marginLeft={"auto"}
                    //isLoading={deleteLoading}
                    size={"md"}
                    colorScheme={"black"}
                    variant={"ghost"}
                    icon={<FaRegTrashAlt /> }
                    isRound
                />
            </Flex>
        </Flex>)
}
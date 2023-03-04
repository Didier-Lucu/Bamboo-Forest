import { Flex, IconButton } from "@chakra-ui/react";
import { useAuth } from "hooks/Auth";
import { FaRegHeart, FaHeart , FaComment, FaRegTrashAlt, FaRegComment } from "react-icons/fa";
import { useToggleLike , useDeletePost } from "hooks/Posts";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/router";
import { useComments } from "hooks/Comments";

export default function Actions({ post }) {
    const { id, likes } = post;
    const { user, isLoading: userLoading } = useAuth();

    const isLiked = likes.includes(user?.id);
    const { toggleLike, isLoading: toggleLikeLoading } = useToggleLike({ id, isLiked, uid: user?.id });
    const {deletePost, isLoading:deleteLoading }= useDeletePost({id});
    const { comments, isLoading: commentsLoading } = useComments(id);

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
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
                    isLoading={commentsLoading || userLoading}
                    size={"md"}
                    colorScheme={"blue"}
                    variant={"ghost"}
                    icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
                    isRound
                />
                {comments?.length}
            </Flex>
            <Flex alignItems={"center"} marginLeft={"2"}>
                <IconButton
                    onClick={deletePost}
                    marginLeft={"auto"}
                    isLoading={deleteLoading}
                    size={"md"}
                    colorScheme={"black"}
                    variant={"ghost"}
                    icon={<FaRegTrashAlt /> }
                    isRound
                />
            </Flex>
        </Flex>)
}
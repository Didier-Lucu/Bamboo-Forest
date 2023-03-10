import { Box } from "@chakra-ui/react";
import Post from "components/posts";
import { usePost } from "hooks/Posts";
import { useNavigate , useParams } from "react-router-dom";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import { DASHBOARD } from "lib/router";

export default function Comments() {
    const { id } = useParams();
    const { post, isLoading } = usePost(id);
    const navigate = useNavigate();




    if (isLoading) return "Loading...";
    if (post) { 
    return (
      <Box align="center" pt="50">
        <Post post={post} />
        <NewComment post={post} />
        <CommentList post={post} />
      </Box>
    );
    } else {
      navigate(DASHBOARD)
    }
}
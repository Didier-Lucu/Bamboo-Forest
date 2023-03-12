import { Box, Button, Heading, HStack, Textarea } from "@chakra-ui/react";
import PostLists from "components/posts/PostLists";
import { useAuth } from "hooks/Auth";
import { useAddPost, usePosts } from "hooks/Posts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const [ file, setFile ] = useState(null);
  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
      image: file,
    });
    reset();
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
  }


  return (
    <Box maxWidth={"600px"} margin={"auto"} paddingY={"20"}>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify={"space-between"}>
          <Heading size={"lg"}>What's on your mind?</Heading>
          <Button
            colorScheme={"red"}
            type={"submit"}
            isLoading={authLoading || addingPost}
            loadingText={"Loading"}
          >
            Post
          </Button>
        </HStack>
        <Textarea
          colorScheme={"red"}
          as={TextareaAutosize}
          resize={"none"}
          marginTop={"5"}
          placeholder={"Create a new Post"}
          {...register("text", { required: true })}
          minRows={4}
        />
    
        <input type="file" accept="image/*" onChange={handleChange} />
          
      </form>
    </Box>
  );
}

export default function Dashboard() {
  const { posts, isLoading } = usePosts();

  if (isLoading) return "Loading Posts";

  return (
    <>
      <NewPost />
      <PostLists posts={posts} />
    </>
  );
}

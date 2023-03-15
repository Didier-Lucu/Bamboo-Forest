import React, { useState, useEffect } from "react";
import { Box, Button, Heading, HStack, Textarea } from "@chakra-ui/react";
import PostLists from "components/posts/PostLists";
import { useAuth } from "hooks/Auth";
import { useAddPost, usePosts } from "hooks/Posts";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import theme from "./theme";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([
    "General",
    "Tech",
    "Food",
    "Clubs",
    "Housing",
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // Define a function to handle the selection of a category
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Create a new category");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategories([...selectedCategories, newCategory]);
    }
  };

  useEffect(() => {
    setIsFormValid(selectedCategories.length > 0);
  }, [selectedCategories]);

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
      image: file,
      category: selectedCategories,
    });
    reset();
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
  }


  return (
    <Box maxWidth={"600px"} margin={"auto"} paddingY={"10"}>
      <form onSubmit={(e) => {
        e.preventDefault();
        setFile(null);
        handleSubmit(handleAddPost)();
      }}>
        <HStack justify={"space-between"}>
          <Heading size={"lg"}>What's on your mind?</Heading>
          <Button
            colorScheme={"red"}
            marginTop={"5"}
            type={"submit"}
            isLoading={authLoading || addingPost}
            loadingText={"Loading"}
            isDisabled={!isFormValid}
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize={"none"}
          marginTop={"5"}
          placeholder={"Create a new Post"}
          {...register("text", { required: true })}
          minRows={3}
        />
        <HStack marginTop={"5"}>
          <Heading size={"sm"} color={"gray"}>
            Choose Your Category
          </Heading>
          <Heading size={"xs"} color={theme.colors.red[400]}>
            {" "}
            (Select At Least One Category)
          </Heading>
        </HStack>
        <Box mt={4} borderBottom="1px" borderColor="gray.200" pb="10">
          <HStack>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                colorScheme={
                  selectedCategories.includes(category) ? "red" : "gray"
                }
                onClick={handleCategoryChange}
                value={category}
              >
                {category}


              </Button>
            ))}
            <Button size="sm" onClick={handleAddCategory}>
              +
            </Button>


            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <Button size="sm" as="label" htmlFor="file-input">
                Upload Image
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  hidden
                />
              </Button>
            </div>
          </HStack>
          {file && (
            <HStack spacing={2} mt={2} justifyContent="space-between">
              <Button
                backgroundColor={theme.colors.red[400]}
                ml={"430px"}
                size="sm"
                marginRight={2}
                onClick={() => {
                  setFile(null);
                }}
              >
                Delete
              </Button>
              <div style={{ marginLeft: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>{file.name}</div>
            </HStack>
          )}


        </Box>
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

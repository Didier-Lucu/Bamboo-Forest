import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { useAuth } from "hooks/Auth";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useAddMessage } from "hooks/Messages";

export default function NewMessage({ id2 }) {
    const { register, handleSubmit, reset } = useForm();
    const { addMessage, isLoading: addingMessage } = useAddMessage();
    const { user, isLoading: authLoading } = useAuth();


    function handleAddMessage(data) {
      addMessage({
        seid: user.id,
        text: data.text,
        reid: id2,
      } );
      reset();
    }

    return (

      <Box maxWidth={"600px"} margin={"auto"} paddingY={"2"}>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleAddMessage)();
        }}>
          <HStack justify={"space-between"}>
          <Textarea
            as={TextareaAutosize}
            resize={"none"}
            marginTop={"5"}
            placeholder={"Create a new Message"}
            {...register("text", { required: true })}
            minRows={3}
          />
             <Button
              colorScheme={"red"}
              marginTop={"5"}
              type={"submit"}
              isLoading={authLoading || addingMessage}
              loadingText={"Loading"}
            >
              Send
            </Button>
          </HStack>
        </form>
      </Box>
      
    );
  }

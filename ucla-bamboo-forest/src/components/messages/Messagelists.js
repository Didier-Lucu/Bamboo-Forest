import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "hooks/Auth";
import { useParams } from "react-router-dom";
import Message from "./index";

export default function MessageLists({ messages }) {
  const { id1, id2 } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  if (authLoading) return 
  console.log(id1, " ", user.id)
  
  
  return (
    <Box paddingX={"200px"} align={"center"}>
      {messages?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Messages Yet
        </Text>
      ) : messages?.map((message) => 
      message.sendID === id1
      ? (
        <Box p={"2"} maxWidth={"600px"} textAlign={"left"}>
          <Box border={"2px solid"} borderColor={"gray.100"} borderRadius={"md"} backgroundColor="lightblue">
            <Box minHeight={"50px"}>
              <Text align="right" wordBreak={"break-word"} fontSize={"md"} marginTop={"5"} marginRight={"2"}>
                {message.text}
              </Text>
            </Box>
          </Box>
        </Box>
      ) 
      : (
        <Box p={"2"} maxWidth={"600px"} textAlign={"left"}>
          <Box border={"2px solid"} borderColor={"gray.100"} borderRadius={"md"} backgroundColor="lightgray">
            <Box minHeight={"50px"}>
              <Text align="left" wordBreak={"break-word"} fontSize={"md"} marginTop={"5"} marginLeft={"2"}>
              {message.text}
              </Text>
            </Box>
          </Box>
        </Box>
      )
    )
      }
    </Box>
  );
}

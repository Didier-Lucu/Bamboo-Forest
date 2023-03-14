import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import UsernameButton from "components/profile/usernameButton";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "hooks/users";
import Avatar from "components/profile/Avatar";

export default function MessageLists({ messages }) {
  const { id1, id2 } = useParams();
  const { user, isLoading: authLoading } = useUser(id1);
  const { user:user2, isLoading: authLoading2 } = useUser(id2);
  

  if (authLoading || authLoading2) return ;

  
  return (

    <VStack justifyContent="space-between">
      <Box
        width={"1000px"}
        position={"fixed"}
        marginBottom={"50px"}
        >   
     <HStack justifyContent="space-between" justifyItems="center">
  
      <Box >
      <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
          <Flex pb="2">
            <Avatar user={user2} size="sm" />
            <Box flex="1" ml="4" mt={"3px"}>
              
                  <UsernameButton user={user2} />
        
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box >
      <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
          <Flex pb="2">
            <Avatar user={user} size="sm" />
            <Box flex="1" ml="4" mt={"3px"}>
              
                  <UsernameButton user={user} />
        
            </Box>
          </Flex>
        </Box>
      </Box>
      
     </HStack>
     </Box>
    <Box  align={"center"} marginTop={"40px"}>
      {messages?.length === 0 ? (
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          No Messages Yet
        </Text>
      ) : messages?.map((message) => 
      message.sendID === id1
      ? (
        <HStack>
          <Text fontSize="xs" color="gray.500">
                   {formatDistanceToNow(message.date)} ago
                  </Text>
        <Box p={"2"} maxWidth={"600px"} minWidth={"600px"} textAlign={"left"} marginTop={"10px"}>
          <Box border={"2px solid"} borderColor={"gray.100"} borderRadius={"md"} backgroundColor="lightblue">
            <Box minHeight={"50px"}>
              <Text align="right" wordBreak={"break-word"} fontSize={"md"} marginTop={"5"} marginRight={"4"} marginLeft={"4"} marginBottom={"5"}>
                {message.text}
              </Text>
            </Box>
          </Box>
        </Box>
        <Avatar user={user} size="md" />

        </HStack>
      ) 
      : (<HStack>
        <Avatar user={user2} size="md" />
        <Box p={"2"} maxWidth={"600px"} minWidth={"600px"} textAlign={"left"} marginTop={"10px"}>
          <Box border={"2px solid"} borderColor={"gray.100"} borderRadius={"md"} backgroundColor="lightgray">
            <Box minHeight={"50px"}>
              <Text align="left" wordBreak={"break-word"} fontSize={"md"} marginTop={"5"} marginLeft={"4"} marginRight={"4"} marginBottom={"5"}>
              {message.text}
              </Text>
            </Box>
          </Box>
        </Box>
        <Text fontSize="xs" color="gray.500">
                   {formatDistanceToNow(message.date)} ago
                  </Text>
        </HStack>
      )
    )
      }
    </Box>
    </VStack>


  );
}

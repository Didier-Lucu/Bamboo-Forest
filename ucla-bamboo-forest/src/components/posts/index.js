import { Box, Text, Image, Stack } from "@chakra-ui/react";
import Header from "./Header";
import Actions from "./Actions";


export default function Post({ post }) {
    const {  text, image } = post;
    return (


        <Box p={"2"} maxWidth={"600px"} textAlign={"left"}>
            <Box border={"2px solid"} borderColor={"gray.100"} borderRadius={"md"}>
                <Header post={post} />
                <Box minHeight={"100px"}>
                    <Text wordBreak={"break-word"} fontSize={"md"} marginTop={"2"}  marginLeft={"4"} marginRight={"4"}>
                        {text}
                    </Text>
                    { image != null && (
                    <Box  display="flex" marginTop={"25px"} marginBottom={"5px"}>
                        <Image width="350px" objectFit="contain" height={"250px"} src= {image} />
                    </Box>
                    )}
                </Box>
                <Actions post={post} />
            </Box>
        </Box>
    );
}

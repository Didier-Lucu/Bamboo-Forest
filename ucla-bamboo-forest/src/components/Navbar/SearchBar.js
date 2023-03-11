import React from "react";
import { Input } from "@chakra-ui/react";


export default function SearchBar() {
    
    return(
        <Input
          placeholder="Search"
          size="md"
          variant="filled"
          htmlSize={60}
          width="auto"
          align="center"
          mr="150"
        />    
    )
}
import React from "react";
import MessageLists from "./Messagelists";
import { useParams } from "react-router-dom";
import { useMessages } from "hooks/Messages";
import NewMessage from "./NewMessage";

export default function Messages() {
  const { id1, id2 } = useParams();
  const { messages, isLoading } = useMessages(id1, id2);

  if (isLoading) {
    return "Loading...";
  }
  return (
    <>
   
      <MessageLists messages={messages}/>
      <NewMessage id2={id2}/>
    </>
  );
}


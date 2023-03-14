import React, { useEffect, useRef } from "react";
import MessageLists from "./Messagelists";
import { useParams } from "react-router-dom";
import { useMessages } from "hooks/Messages";
import NewMessage from "./NewMessage";

export default function Messages() {
  const { id1, id2 } = useParams();
  const { messages, isLoading } = useMessages(id1, id2);
  const bottomRef = useRef();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (isLoading) return "Loading...";

  return (
    <>
   
      <MessageLists messages={messages}/>
      <NewMessage id2={id2}/>
      <div ref={bottomRef} />

    </>
  );
}


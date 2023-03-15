import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import { collection, doc, orderBy, query, setDoc, where, and } from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddMessage() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function addMessage(message) {
        setLoading(true);
        const uid = uuidv4();
        await setDoc(doc(db, "messages", uid), {
            text: message.text,
            date: Date.now(),
            receID: message.reid,
            sendID: message.seid,
            id: uid
        });
        
        toast({
            title: "Message added!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000
        });

        setLoading(false);
    }

    return {addMessage, isLoading};
}

export function useMessages(id1, id2) {
    const q = query(
        collection(db, "messages"),
        where("sendID", "==", id1),
        where("receID", "==", id2),
        orderBy("date", "asc"),
      );
    
      const [messages1, isLoading1, error1] = useCollectionData(q);
      if (error1) throw error1;
      
      const q2 = query(
        collection(db, "messages"),
        where("sendID", "==", id2),
        where("receID", "==", id1),
        orderBy("date", "asc")
      );
    
      const [messages2, isLoading2, error2] = useCollectionData(q2);
      if (error2) throw error2;
    
      const allMessages = [...(messages1 || []), ...(messages2 || [])];
      const sorted = allMessages.sort((a, b) => a.date - b.date);
      return { messages: sorted, isLoading: isLoading1 || isLoading2 };
  }

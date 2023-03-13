import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddMessage() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addMessage(message) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "message", id), {
      ...message,
      id,
      date: Date.now(),
    });
    toast({
      title: "Message sent",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
    setLoading(false);
  }

  return { addMessage, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "message", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeleteMessage({ id }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deleteMessage() {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (confirm) {
      setLoading(true);

      await deleteDoc(doc(db, "message", id));

      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast({
        title: "Message Deleted",
        status: "info",
        position: "top",
        duration: "5000",
        isClosable: true,
      });

      setLoading(false);
    }
  }

  return { deleteMessage, isLoading };
}

export function useMessage(id) {
  const q = doc(db, "message", id);
  const [message, isLoading] = useDocumentData(q);

  return { message, isLoading };
}

export function useMessages(uid = null) {
  const q = uid
    ? query(
      collection(db, "message"),
      orderBy("date", "desc"),
      where("uid", "==", uid)
      // .orWhere("recipient", "==", uid)
    )
    : query(collection(db, "message"), orderBy("date", "desc"));
  const [messages, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { messages, isLoading };
}

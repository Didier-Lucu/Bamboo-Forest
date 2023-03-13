import { doc, query, updateDoc, collection } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);
  return { user, isLoading };
}

export function useAllUsers() {
  const q = query(collection(db, "users"));
  const [users, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { users, isLoading }
}

export function useUpdateAvatar(uid) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  async function updateAvatar() {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    setLoading(true);

    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    toast({
      title: "Profile Updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setLoading(false);

    navigate(0);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}

export function useUpdateUser(uid) {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [canChange, setCanChange] = useState(true); // state to track if user can change username
  const toast = useToast();

  // useEffect to reset canChange state after 60 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanChange(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, [canChange]);

  async function updateUsername() {
    setLoading(true);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { username });

    toast({
      title: "Profile Updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setLoading(false);
    setUsername(""); // reset username input field
    setCanChange(false); // set canChange state to false to block user from changing their username
  }

  return {
    setUsername,
    updateUsername,
    isLoading,
  };
}

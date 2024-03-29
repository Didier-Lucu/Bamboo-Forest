import { position, useToast } from "@chakra-ui/react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "@firebase/storage";
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
import { db, storage } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddPost() {
  
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    async function addPost(post) {
        setLoading(true);
        const id = uuidv4();
        const file = await imageUpload(id)

        async function imageUpload(id) {
            if (!post.image) {

                return null;
            }
    
            const fileRef = ref(storage, "postImages/" + id);
            await uploadBytes(fileRef, post.image);
            const file = await getDownloadURL(fileRef)
    
            toast({ title: "Image uploaded!", status: "success",
                isClosable: true, position: "top", duration: 5000 });
    
                
            return file
        }
        await setDoc(doc(db, "posts", id), {
            ...post,
            uid: post.uid,
            text: post.text,
            id,
            date: Date.now(),
            likes: [],
            image: file,
            
        });
        
        toast({
            title: 'Post Added',
            status: 'success',
            duration: 2000,
            position: "top",
            isClosable: true,
        })
        
        setLoading(false)
    }
    return { addPost, isLoading };
}


  


export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost({ id }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deletePost() {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (confirm) {
      setLoading(true);

      await deleteDoc(doc(db, "posts", id));
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
      console.log("postImages/" + id)
      await deleteObject(ref(storage, "postImages/" + id));
      

      toast({
        title: "Post Deleted",
        status: "info",
        position: "top",
        duration: "5000",
        isClosable: true,
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

export function usePost(id) {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
      collection(db, "posts"),
      orderBy("date", "desc"),
      where("uid", "==", uid)
    )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

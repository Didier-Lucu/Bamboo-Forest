import { useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "lib/firebase";

const defaultCategories = ["General", "Tech", "Food", "Clubs", "Housing"];

export function useCategories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      
    setCategories(categories.length ? categories : defaultCategories);
  }

  async function addCategory(name) {
    const docRef = doc(db, "categories", name);
    await setDoc(docRef, { name });

    setCategories([...categories, name]);
  }

  async function deleteCategory(name) {
    const docRef = doc(db, "categories", name);
    await docRef.delete();

    setCategories(categories.filter((category) => category !== name));
  }

  return { categories, getCategories, addCategory, deleteCategory };
}

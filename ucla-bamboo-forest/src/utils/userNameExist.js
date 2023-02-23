import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "lib/firebase";
export default async function isUserNameExists(username) {
    const q = query(collection(db, "users"), where("username", "==", username));
    await getDocs(q).then((snapshot) => {
        if (snapshot.empty) {
            return false;
        }
        return true;
    }
    );

}

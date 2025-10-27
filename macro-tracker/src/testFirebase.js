import { db } from "./firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

export async function testFirestore() {
  const docRef = doc(db, "testMeals", "chicken-bowl"); // fixed ID
  await setDoc(docRef, {
    name: "Chicken Bowl",
    calories: 420,
    protein: 35,
    carbs: 40,
    fat: 10,
  });

  const snapshot = await getDocs(collection(db, "testMeals"));
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}


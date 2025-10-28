// src/services/mealService.js
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Add a meal to Firestore
export async function addMealToFirestore(meal, userId) {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "meals"), meal);
    console.log("Meal added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding meal:", error);
  }
}

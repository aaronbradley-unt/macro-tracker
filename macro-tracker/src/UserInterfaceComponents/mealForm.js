// this component collects meal data from the user and sends it
// to the parent component (App.js) to store the data
import { useState } from "react";
import { addMealToFirestore } from "../UserInterfaceComponents/mealServices";



function MealForm({ addMeal, user }) {
  // state for the form inputs
  const [meal, setMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  // handle input changes
  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    addMeal(meal); // update local state in App.js

    if (user) {
      await addMealToFirestore(meal, user.uid); // save to Firestore
    } else {
      console.log("User not logged in");
    }

    // reset the form
    setMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={meal.name} onChange={handleChange} placeholder="Meal Name" required />
      <input name="calories" value={meal.calories} onChange={handleChange} placeholder="Calories" required />
      <input name="protein" value={meal.protein} onChange={handleChange} placeholder="Protein (g)" required />
      <input name="carbs" value={meal.carbs} onChange={handleChange} placeholder="Carbs (g)" required />
      <input name="fat" value={meal.fat} onChange={handleChange} placeholder="Fat (g)" required />
      <button type="submit">Add Meal</button>
    </form>
  );
}

export default MealForm;

import { useState } from "react";
import { addMealToFirestore } from "../UserInterfaceComponents/mealServices";

function MealForm({ addMeal, user }) {
  const [meal, setMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addMeal(meal);

    if (user) {
      await addMealToFirestore(meal, user.uid);
    } else {
      console.log("User not logged in");
    }

    setMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  };

  return (
    <div className="card">
      <h2>Add a Meal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Meal Name</label>
            <input 
              name="name" 
              value={meal.name} 
              onChange={handleChange} 
              placeholder="Breakfast, Lunch..." 
              required 
            />
          </div>
          <div className="form-group">
            <label>Calories</label>
            <input 
              name="calories" 
              type="number"
              value={meal.calories} 
              onChange={handleChange} 
              placeholder="500" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Protein (g)</label>
            <input 
              name="protein" 
              type="number"
              value={meal.protein} 
              onChange={handleChange} 
              placeholder="30" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Carbs (g)</label>
            <input 
              name="carbs" 
              type="number"
              value={meal.carbs} 
              onChange={handleChange} 
              placeholder="50" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Fat (g)</label>
            <input 
              name="fat" 
              type="number"
              value={meal.fat} 
              onChange={handleChange} 
              placeholder="20" 
              required 
            />
          </div>
        </div>
        <button type="submit" className="btn-submit">Add Meal</button>
      </form>
    </div>
  );
}

export default MealForm;

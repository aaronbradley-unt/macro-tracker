// this component displays the the lists of meals users added.
function MealList({ meals }) {
  return (
    <div>
      <h2>Meals</h2>
      {meals.length === 0 ? (
        <p>No meals added yet.</p>
      ) : (
        <ul>
          {meals.map((meal, index) => (
            <li key={index}>
              {meal.name} - Calories: {meal.calories}, Protein: {meal.protein}g, Carbs: {meal.carbs}g, Fat: {meal.fat}g
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealList;

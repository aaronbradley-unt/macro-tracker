function MealList({ meals }) {
  return (
    <div className="card">
      <h2>Today's Meals</h2>

      {meals.length === 0 ? (
        <div className="empty-state">
          <p>No meals logged yet. Add your first meal above!</p>
        </div>
      ) : (
        <ul className="meal-list">
          {meals.map((meal, index) => (
            <li key={index} className="meal-item">
              <span className="meal-name">{meal.name}</span>

              <div className="meal-macros">
                <div className="macro-badge calories">
                  <span className="value">{meal.calories}</span>
                  <span className="label">Cal</span>
                </div>

                <div className="macro-badge protein">
                  <span className="value">{meal.protein}g</span>
                  <span className="label">Protein</span>
                </div>

                <div className="macro-badge carbs">
                  <span className="value">{meal.carbs}g</span>
                  <span className="label">Carbs</span>
                </div>

                <div className="macro-badge fat">
                  <span className="value">{meal.fat}g</span>
                  <span className="label">Fat</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealList;

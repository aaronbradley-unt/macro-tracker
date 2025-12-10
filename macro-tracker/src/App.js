import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import './styles/App.css';
import LogIn from "./UserInterfaceComponents/LogIn";
import MealForm from "./UserInterfaceComponents/mealForm";
import MealList from "./UserInterfaceComponents/mealList";
import UserInfo from "./UserInterfaceComponents/UserInfo";

function App() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
    const totalProtein = meals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0);
    const totalCarbs = meals.reduce((sum, meal) => sum + Number(meal.carbs || 0), 0);
    const totalFat = meals.reduce((sum, meal) => sum + Number(meal.fat || 0), 0);

    setTotals({
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    });
  }, [meals]);

  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
  };

  return (
    <div className="app-container">
      {!user ? (
        <LogIn setUser={setUser} />
      ) : (
        <div className="main-container">
          <header className="header">
            <div>
              <h1>Macro Tracker</h1>
              <p className="user-email">{user.email}</p>
            </div>
            <button onClick={() => signOut(auth)} className="btn-logout">
              Sign Out
            </button>
          </header>

          <UserInfo onSubmit={handleUserInfoSubmit} />

          {userInfo && (
            <div className="card">
              <h2>Your Stats</h2>
              <div className="info-display">
                <div className="info-item">
                  <div className="value">{userInfo.weight}</div>
                  <div className="label">kg</div>
                </div>
                <div className="info-item">
                  <div className="value">{userInfo.height}</div>
                  <div className="label">cm</div>
                </div>
                <div className="info-item">
                  <div className="value" style={{ fontSize: '18px', textTransform: 'capitalize' }}>
                    {userInfo.activity}
                  </div>
                  <div className="label">Activity</div>
                </div>
              </div>
            </div>
          )}

          <MealForm addMeal={addMeal} user={user} />

          <MealList meals={meals} />

          <div className="card">
            <h2>Daily Totals</h2>
            <div className="totals-grid">
              <div className="total-card calories">
                <div className="value">{totals.calories}</div>
                <div className="label">Calories</div>
              </div>
              <div className="total-card protein">
                <div className="value">{totals.protein}<span className="unit">g</span></div>
                <div className="label">Protein</div>
              </div>
              <div className="total-card carbs">
                <div className="value">{totals.carbs}<span className="unit">g</span></div>
                <div className="label">Carbs</div>
              </div>
              <div className="total-card fat">
                <div className="value">{totals.fat}<span className="unit">g</span></div>
                <div className="label">Fat</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

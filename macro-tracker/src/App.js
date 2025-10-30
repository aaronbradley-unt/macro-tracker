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

  // Watch for user authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Update totals whenever meals change
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
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
      }}
    >
      {!user ? (
        <div
          style={{
            maxWidth: "400px",
            margin: "50px auto",
            padding: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <LogIn setUser={setUser} />
        </div>
      ) : (
        <div
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ color: "#0077b6" }}>Welcome, {user.email}</h1>
            <button
              onClick={() => signOut(auth)}
              style={{
                backgroundColor: "#00b4d8",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          {/* User Info Form */}
          <UserInfo onSubmit={handleUserInfoSubmit} />

          {/* Display user info */}
          {userInfo && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#f1f8e9",
                borderRadius: "10px",
              }}
            >
              <h2 style={{ color: "#558b2f" }}>Your Info:</h2>
              <p>
                <strong>Weight:</strong> {userInfo.weight} kg
              </p>
              <p>
                <strong>Height:</strong> {userInfo.height} cm
              </p>
              <p>
                <strong>Activity Level:</strong> {userInfo.activity}
              </p>
            </div>
          )}

          {/* Meal Form */}
          <MealForm addMeal={addMeal} user={user} />

          {/* Meal List */}
          <MealList meals={meals} />

          {/* Daily Totals */}
          <div
            style={{
              marginTop: "30px",
              padding: "15px",
              backgroundColor: "#fff3e0",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ color: "#e65100" }}>Daily Total Macros</h2>
            <p>
              <strong>Calories:</strong> {totals.calories}
            </p>
            <p>
              <strong>Protein:</strong> {totals.protein} g
            </p>
            <p>
              <strong>Carbs:</strong> {totals.carbs} g
            </p>
            <p>
              <strong>Fat:</strong> {totals.fat} g
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

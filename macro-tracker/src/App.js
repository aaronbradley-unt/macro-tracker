import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogIn from "./UserInterfaceComponents/LogIn";
import MealForm from "./UserInterfaceComponents/mealForm";
import MealList from "./UserInterfaceComponents/mealList";


function App() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  return (
    <div className="App">
      {!user ? (
        <LogIn setUser={setUser} />
      ) : (
        <>
          <h1>Welcome, {user.email}</h1>
          <button onClick={() => signOut(auth)}>Logout</button>
           <MealForm addMeal={addMeal} user={user} />
          <MealList meals={meals} />
        </>
      )}
    </div>
  );
}

export default App;

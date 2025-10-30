// Import React's useState hook to manage component state
import { useState } from "react";

// This is a functional component named UserInfo
// It expects a prop called 'onSubmit' which is a function passed from the parent
function UserInfo({ onSubmit }) {
  // State variables to store form input values
  // useState("") initializes them as empty strings
  const [weight, setWeight] = useState("");  // Stores user's weight input
  const [height, setHeight] = useState("");  // Stores user's height input
  const [activity, setActivity] = useState("moderate"); // Stores user's activity level; default is 'moderate'

  // Function that is called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission

    // Simple validation: ensure both weight and height are filled
    if (!weight || !height) {
      alert("Please enter both weight and height."); // Notify the user
      return; // Stop execution if validation fails
    }

    // Call the parent component's onSubmit function to send the data upwards
    // Convert weight and height to numbers before sending
    onSubmit({
      weight: Number(weight),
      height: Number(height),
      activity, // Send the selected activity level as is
    });

    // Optionally, reset the form to initial values
    setWeight("");           // Clear weight input
    setHeight("");           // Clear height input
    setActivity("moderate"); // Reset activity level to default
  };

  // JSX returned by the component defines the UI
  return (
    // <form> element wraps input fields and a submit button
    // onSubmit is set to handleSubmit so this function runs on form submission
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <h2>User Information</h2>

      {/* Weight Input */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Weight (kg):
          {/* Input field for weight */}
          <input
            type="number" // Input type number ensures numeric entry
            value={weight} // The input's value is bound to the 'weight' state
            onChange={(e) => setWeight(e.target.value)} // Updates state when user types
            placeholder="e.g., 70" // Placeholder text
            required // HTML5 validation: ensures field must be filled
          />
        </label>
      </div>

      {/* Height Input */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Height (cm):
          <input
            type="number" // Only numeric input allowed
            value={height} // Bound to 'height' state
            onChange={(e) => setHeight(e.target.value)} // Update state on change
            placeholder="e.g., 175"
            required
          />
        </label>
      </div>

      {/* Activity Level Selector */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Activity Level:
          {/* Dropdown to select activity level */}
          <select
            value={activity} // Bound to 'activity' state
            onChange={(e) => setActivity(e.target.value)} // Updates state when selection changes
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      {/* Submit button */}
      <button type="submit">Save Info</button>
    </form>
  );
}

// Export the component so it can be imported in other files like App.js
export default UserInfo;

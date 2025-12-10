import { useState } from "react";

function UserInfo({ onSubmit }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("moderate");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight || !height) {
      alert("Please enter both weight and height.");
      return;
    }

    onSubmit({
      weight: Number(weight),
      height: Number(height),
      activity,
    });

    setWeight("");
    setHeight("");
    setActivity("moderate");
  };

  return (
    <div className="card">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              required
            />
          </div>
          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              required
            />
          </div>
          <div className="form-group">
            <label>Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-submit">Save Profile</button>
      </form>
    </div>
  );
}

export default UserInfo;

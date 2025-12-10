import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function LogIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
      {error && (
        <div style={{ 
          padding: '12px 16px', 
          background: '#fef2f2', 
          border: '1px solid #fecaca',
          borderRadius: '10px',
          color: '#dc2626',
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
        />
        <button type="submit" className="btn-primary">
          {isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>
      <button 
        onClick={() => setIsRegister(!isRegister)}
        className="btn-secondary"
      >
        {isRegister ? "Already have an account? Sign in" : "New here? Create an account"}
      </button>
    </div>
  );
}

export default LogIn;

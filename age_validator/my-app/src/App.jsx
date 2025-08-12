import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState("");

  const calculateAge = () => {
    if (!dob) {
      setResult("⚠ Please select your date of birth");
      return;
    }

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >=1) {
      setResult(`✅ Your age is (${age} years old)`);
    } else {
      setResult(`❌ Your age is not valid)`);
    }
  };

  return (
    <div className="container">
      <h1>Age Validator</h1>
      <div className="form">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button onClick={calculateAge}>Submit</button>
      </div>
      {result && <div className="result">{result}</div>}
    </div>
  );
}

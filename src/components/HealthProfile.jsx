import React from 'react';
import { useState } from "react";
import "./HealthProfile.css";

export default function HealthProfile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bmi, setBmi] = useState(null);
  const [description, setDescription] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      let category = "";
      let healthMessage = "";

      if (bmiValue < 18.5) {
        category = "underweight";
        healthMessage = "It's important to maintain a balanced diet and consult a healthcare provider if needed.";
      } else if (bmiValue < 24.9) {
        category = "healthy weight";
        healthMessage = "Great job! Keep up a balanced diet and regular physical activity.";
      } else if (bmiValue < 29.9) {
        category = "overweight";
        healthMessage = "Consider a healthy diet and regular exercise to maintain a balanced weight.";
      } else {
        category = "obese";
        healthMessage = "Managing your weight through a healthy lifestyle can help improve your well-being.";
      }

      const userDescription = `👤 Name: ${name || "User"}  
      📅 Age: ${age || "N/A"}  
      ⚖️ Weight: ${weight} kg  
      📏 Height: ${height} cm  
      🩸 Blood Group: ${bloodGroup || "N/A"}  
      📊 BMI: ${bmiValue} (${category})  
      📝 ${healthMessage}`;

      setDescription(userDescription);
    }
  };

  return (
    <div className="health-profile-container">
      <div className="health-profile-card">
        <h2 className="profile-title">📜 Your Personalized Health Profile</h2>
        <p className="profile-subtitle">Enter your details to receive a health summary.</p>

        <div className="form-group">
          <label>👤 Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>📅 Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
        </div>

        <div className="form-group">
          <label>⚖️ Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" />
        </div>

        <div className="form-group">
          <label>📏 Height (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter your height" />
        </div>

        <div className="form-group">
          <label>🩸 Blood Group:</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateBMI}>📊 Calculate BMI</button>

        {bmi && (
          <div className="bmi-result">
            <h3>Your BMI: <span>{bmi}</span></h3>
          </div>
        )}

        {description && (
          <div className="user-description">
            <h3>📜 Health Summary</h3>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

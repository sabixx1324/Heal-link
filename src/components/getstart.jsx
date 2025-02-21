// src/components/GetStarted.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './getstart.css';

const GetStarted = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    interests: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/profile');
  };

  return (
    <div className="get-started-container">
      <div className="get-started-content">
        <h1>Welcome to Heal Link</h1>
        <p>Let's create your personalized health journey</p>
        
        <form onSubmit={handleSubmit} className="get-started-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Areas of Interest</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="interests"
                  value="sleep"
                  onChange={handleChange}
                /> Sleep Tracking
              </label>
              <label>
                <input
                  type="checkbox"
                  name="interests"
                  value="vitamins"
                  onChange={handleChange}
                /> Vitamin Supplements
              </label>
              <label>
                <input
                  type="checkbox"
                  name="interests"
                  value="consultation"
                  onChange={handleChange}
                /> Doctor Consultation
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
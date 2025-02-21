// src/components/ConsultNow.jsx
import React, { useState } from 'react';
import './consult.css';

const ConsultNow = () => {
  const [consultData, setConsultData] = useState({
    symptom: '',
    duration: '',
    urgency: 'normal',
    preferredTime: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle consultation request
    console.log('Consultation requested:', consultData);
  };

  return (
    <div className="consult-container">
      <div className="consult-content">
        <h1>Schedule a Consultation</h1>
        <p>Connect with our healthcare professionals</p>

        <form onSubmit={handleSubmit} className="consult-form">
          <div className="form-group">
            <label htmlFor="symptom">Primary Symptom/Concern</label>
            <input
              type="text"
              id="symptom"
              name="symptom"
              value={consultData.symptom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration of Symptoms</label>
            <select
              id="duration"
              name="duration"
              value={consultData.duration}
              onChange={handleChange}
              required
            >
              <option value="">Select Duration</option>
              <option value="today">Today</option>
              <option value="few-days">Few Days</option>
              <option value="week">About a Week</option>
              <option value="month">More than a Month</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="urgency">Urgency Level</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="normal"
                  checked={consultData.urgency === 'normal'}
                  onChange={handleChange}
                /> Normal
              </label>
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="urgent"
                  checked={consultData.urgency === 'urgent'}
                  onChange={handleChange}
                /> Urgent
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="preferredTime">Preferred Consultation Time</label>
            <input
              type="datetime-local"
              id="preferredTime"
              name="preferredTime"
              value={consultData.preferredTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description</label>
            <textarea
              id="description"
              name="description"
              value={consultData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Request Consultation</button>
        </form>
      </div>
    </div>
  );
};

export default ConsultNow;
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Plus, Calendar, Clock, Trash2 } from 'lucide-react';
import './SleepTracker.css';

const SleepTracker = () => {
  const [sleepRecords, setSleepRecords] = useState(() => {
    const savedRecords = localStorage.getItem('sleepRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    bedTime: '',
    wakeTime: '',
    quality: 'good',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('sleepRecords', JSON.stringify(sleepRecords));
  }, [sleepRecords]);

  const calculateSleepDuration = (bedTime, wakeTime) => {
    if (!bedTime || !wakeTime) return '0h 0m';
    
    const start = new Date(`2000/01/01 ${bedTime}`);
    const end = new Date(`2000/01/01 ${wakeTime}`);
    if (end < start) end.setDate(end.getDate() + 1);
    
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSleepRecord = (e) => {
    e.preventDefault();
    if (!newRecord.bedTime || !newRecord.wakeTime) return;

    const duration = calculateSleepDuration(newRecord.bedTime, newRecord.wakeTime);
    
    setSleepRecords(prev => [
      {
        ...newRecord,
        id: Date.now(),
        duration
      },
      ...prev
    ]);

    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      bedTime: '',
      wakeTime: '',
      quality: 'good',
      notes: ''
    });
  };

  const deleteSleepRecord = (id) => {
    setSleepRecords(prev => prev.filter(record => record.id !== id));
  };

  const calculateAverageSleep = () => {
    if (sleepRecords.length === 0) return '0h 0m';
    
    const totalMinutes = sleepRecords.reduce((acc, record) => {
      const [hours, minutes] = record.duration.split('h ');
      return acc + (parseInt(hours) * 60) + parseInt(minutes);
    }, 0);
    
    const avgMinutes = totalMinutes / sleepRecords.length;
    const hours = Math.floor(avgMinutes / 60);
    const minutes = Math.floor(avgMinutes % 60);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="sleep-tracker">
      <div className="sleep-stats">
        <div className="stat-card">
          <Moon size={24} />
          <h3>Average Sleep</h3>
          <p>{calculateAverageSleep()}</p>
        </div>
        <div className="stat-card">
          <Calendar size={24} />
          <h3>Total Records</h3>
          <p>{sleepRecords.length}</p>
        </div>
      </div>

      <form className="sleep-form" onSubmit={addSleepRecord}>
        <h3>Add Sleep Record</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={newRecord.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bed Time</label>
            <input
              type="time"
              name="bedTime"
              value={newRecord.bedTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Wake Time</label>
            <input
              type="time"
              name="wakeTime"
              value={newRecord.wakeTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Sleep Quality</label>
            <select
              name="quality"
              value={newRecord.quality}
              onChange={handleInputChange}
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input
              type="text"
              name="notes"
              value={newRecord.notes}
              onChange={handleInputChange}
              placeholder="Optional notes..."
            />
          </div>
        </div>

        <button type="submit" className="add-record-btn">
          <Plus size={20} /> Add Record
        </button>
      </form>

      <div className="sleep-records">
        <h3>Sleep History</h3>
        {sleepRecords.map(record => (
          <div key={record.id} className="record-card">
            <div className="record-header">
              <span className="record-date">{record.date}</span>
              <button
                className="delete-btn"
                onClick={() => deleteSleepRecord(record.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="record-details">
              <div className="record-time">
                <Clock size={16} />
                <span>{record.bedTime} - {record.wakeTime}</span>
              </div>
              <div className="record-duration">
                Duration: {record.duration}
              </div>
              <div className={`record-quality quality-${record.quality}`}>
                Quality: {record.quality}
              </div>
              {record.notes && (
                <div className="record-notes">
                  Notes: {record.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepTracker;
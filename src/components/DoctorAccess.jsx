
import React, { useState } from "react";
import "./DoctorAccess.css";

const doctorsList = [
  { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", location: "New York, NY" },
  { id: 2, name: "Dr. Emily Johnson", specialty: "Dermatologist", location: "Los Angeles, CA" },
  { id: 3, name: "Dr. Robert Williams", specialty: "Neurologist", location: "Chicago, IL" },
  { id: 4, name: "Dr. Sarah Brown", specialty: "Pediatrician", location: "Houston, TX" },
  { id: 5, name: "Dr. David Lee", specialty: "Orthopedic Surgeon", location: "San Francisco, CA" },
];

export default function DoctorAccess() {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = doctorsList.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctor-access-container">
      <h2>Find a Healthcare Provider</h2>
      <p>Search for doctors and book an appointment easily.</p>

      <input
        type="text"
        placeholder="Search by name or specialty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h3>{doctor.name}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Location:</strong> {doctor.location}</p>
              <button className="book-btn" onClick={() => setSelectedDoctor(doctor)}>
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>

      {selectedDoctor && (
        <div className="appointment-confirmation">
          <h3>Appointment Booked</h3>
          <p>You have successfully booked an appointment with <strong>{selectedDoctor.name}</strong>.</p>
          <button onClick={() => setSelectedDoctor(null)}>OK</button>
        </div>
      )}
    </div>
  );
}

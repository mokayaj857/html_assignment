import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectedCourses = ({ userId }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/user-courses/${userId}`)
      .then(response => {
        setSelectedCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching selected courses:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Selected Courses</h2>
      <ul>
        {selectedCourses.map(course => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedCourses;

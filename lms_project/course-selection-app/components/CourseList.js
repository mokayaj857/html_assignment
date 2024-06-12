import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div>
      <h2>Select Your Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.name}
            <button onClick={() => onSelectCourse(course._id)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

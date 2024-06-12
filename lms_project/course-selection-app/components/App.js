import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import CourseList from './components/CourseList';
import SelectedCourses from './components/SelectedCourses';

const App = () => {
  const [user, setUser] = useState(null);

  const handleRegister = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <h1>Course Selection App</h1>
      {!user ? (
        <RegistrationForm onRegister={handleRegister} />
      ) : (
        <div>
          <CourseList userId={user.id} />
          <SelectedCourses userId={user.id} />
        </div>
      )}
    </div>
  );
};

export default App;

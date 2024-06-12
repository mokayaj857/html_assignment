const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/courseApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Course Schema
const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Course = mongoose.model('Course', courseSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  selectedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const User = mongoose.model('User', userSchema);

// Routes

// Register new user
app.post('/register', async (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ username, email, selectedCourses: [] });
  await newUser.save();
  res.json(newUser);
});

// Get all courses
app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Select a course
app.post('/select-course', async (req, res) => {
  const { userId, courseId } = req.body;
  const user = await User.findById(userId);
  user.selectedCourses.push(courseId);
  await user.save();
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Use your MySQL username
  password: '', // Use your MySQL password
  database: 'learning_management'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Register new user
app.post('/register', (req, res) => {
  const { username, email } = req.body;
  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
  db.query(sql, [username, email], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, username, email });
  });
});

// Get all courses
app.get('/courses', (req, res) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Select a course
app.post('/select-course', (req, res) => {
  const { userId, courseId } = req.body;
  const sql = 'INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)';
  db.query(sql, [userId, courseId], (err, result) => {
    if (err) throw err;
    res.json({ userId, courseId });
  });
});

// Get selected courses for a user
app.get('/user-courses/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT courses.id, courses.name, courses.description
    FROM courses
    JOIN user_courses ON courses.id = user_courses.course_id
    WHERE user_courses.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

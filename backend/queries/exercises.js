const { pool } = require('../db');

const getAllExercises = () => {
  return pool.query('SELECT * FROM exercises');
};

const getExerciseById = (id) => {
  return pool.query('SELECT * FROM exercises WHERE id = $1', [id]);
};

module.exports = {
  getAllExercises,
  getExerciseById,
};

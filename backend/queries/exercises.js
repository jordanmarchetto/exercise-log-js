const { pool } = require('../db');

const getAllExercises = async () => {
  const res = await pool.query('SELECT * FROM exercises');
  return res.rows;
};

const getExerciseById = async (id) => {
  const res = await pool.query('SELECT * FROM exercises WHERE id = $1 limit 1', [id]);
  return res.rows[0];
};

module.exports = {
  getAllExercises,
  getExerciseById,
};

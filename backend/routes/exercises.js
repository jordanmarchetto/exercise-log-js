const router = require('express').Router();
const exercises = require('../queries/exercises');

router.get('/', async (_req, res) => {
  try {
    const result = await exercises.getAllExercises();
    res.json({ exercises: result.rows });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await exercises.getExerciseById(req.params.id);
    res.json({ ...result.rows[0] });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;

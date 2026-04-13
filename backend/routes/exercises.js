const router = require('express').Router();
const exercises = require('../queries/exercises');
const { serializeExercise, serializeExercises } = require('../serializers/exercises');

router.get('/', async (_req, res) => {
  try {
    const result = await exercises.getAllExercises();
    const exercises_result = serializeExercises(result);
    res.json({ exercises: exercises_result });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await exercises.getExerciseById(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: 'error',
        message: 'Exercise not found'
      });
    }
    const exercise = serializeExercise(result); 
    res.json(exercise);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
});

module.exports = router;

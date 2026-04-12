const router = require('express').Router();
const { pool } = require('../db');


router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * from exercises');
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
    const result = await pool.query(`SELECT * from exercises where id = $1`, [req.params.id]); //this is totally safe, right??? right???
    res.json({ exercises: result.rows });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;

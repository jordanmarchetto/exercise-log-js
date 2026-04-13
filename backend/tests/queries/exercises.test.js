jest.mock('../../db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const { pool } = require('../../db');
const exercises = require('../../queries/exercises');

describe('exercises queries', () => {
  test('getAllExercises returns rows from the database', async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, name: 'Bench Press' },
        { id: 2, name: 'Squat' },
      ],
    });

    await expect(exercises.getAllExercises()).resolves.toEqual([
      { id: 1, name: 'Bench Press' },
      { id: 2, name: 'Squat' },
    ]);

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM exercises');
  });
});

const {
  serializeExercise,
} = require('../../serializers/exercises');

describe('serializeExercise', () => {
  test('returns the public exercise shape', () => {
    const rawExercise = {
      id: 2,
      name: 'Bench Press',
      description: null,
      icon: 'bi-trophy-fill',
      created_at: '2024-06-24T03:32:32.164Z',
      updated_at: '2024-06-24T03:32:32.164Z',
      show_on_records: true,
      internal_flag: 'do not expose this',
    };

    expect(serializeExercise(rawExercise)).toEqual({
      id: 2,
      name: 'Bench Press',
      description: null,
      icon: 'bi-trophy-fill',
      created_at: '2024-06-24T03:32:32.164Z',
      updated_at: '2024-06-24T03:32:32.164Z',
      show_on_records: true,
    });
  });
});

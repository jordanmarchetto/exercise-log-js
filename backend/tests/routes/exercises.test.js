const router = require('../../routes/exercises');

const getRouteHandler = (method, path) => {
  const layer = router.stack.find(
    (entry) =>
      entry.route &&
      entry.route.path === path &&
      entry.route.methods[method],
  );

  return layer.route.stack[0].handle;
};

describe('exercises routes', () => {
  test('GET /:id returns 400 for a non-numeric id', async () => {
    const handler = getRouteHandler('get', '/:id');
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });

    await handler(
      { params: { id: 'abc' } },
      { status, json },
    );

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid exercise ID',
    });
  });
});

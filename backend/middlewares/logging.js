const logRequest = (req, res, next) => {
    console.log(`Inbound request to '${req.method} ${req.originalUrl}': `,{request:{path: req.originalUrl, method: req.method, body: req.body}});

    // for the sake of learning, I'm doing something that's very bad practice, and I'm going to intercept/log all responses.
    // it's just for funsies.
    const originalJson = res.json;

    res.json = function (body) {
      console.log('Response:', body);
      return originalJson.call(this, body);
    };

    next();
}

module.exports = { logRequest };
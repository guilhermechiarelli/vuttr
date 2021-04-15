const { verify } = require('jsonwebtoken');

module.exports = function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'JWT is missing.' });
  }

  const secret = process.env.JWT_SECRET || 'default';

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);

    const { id } = decoded;

    req.user = { id };

    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid JWT token.' });
  }
};

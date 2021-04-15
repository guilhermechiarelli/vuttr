const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserRepository = require('../repositories/UserRepository');

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password needed.' });
    }

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    delete user.password;

    const secret = process.env.JWT_SECRET || 'default';

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '8h' });

    return res.status(200).json({ user, token });
  }
}

module.exports = new AuthController();

const bcrypt = require('bcrypt');

const UserRepository = require('../repositories/UserRepository');

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Incorrect user info.' });
    }

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const user = await UserRepository.create({
      name,
      email,
      password: await bcrypt.hash(password, 8),
    });

    delete user.password;

    return res.status(201).json(user);
  }
}

module.exports = new UserController();

const User = require('../models/Users');

class UserRepository {
  constructor() {
    this.ormRepository = User;
  }

  async findByEmail(email = String) {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async create(userData = Object) {
    const user = await this.ormRepository.create(userData);

    return user;
  }
}

module.exports = new UserRepository();

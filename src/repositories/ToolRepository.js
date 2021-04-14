const Tool = require('../models/Tools');

class ToolRepository {
  constructor() {
    this.ormRepository = Tool;
  }

  async findById(id = String) {
    const tool = await this.ormRepository.findById(id);

    return tool;
  }

  async create(toolData = Object) {
    const tool = await this.ormRepository.create(toolData);

    return tool;
  }

  async updateOne(id = String, updateData = Object) {
    const tool = await this.ormRepository.updateOne({ _id: id }, updateData, {
      new: true,
    });

    return tool;
  }

  async deleteOne(id = String) {
    await this.ormRepository.deleteOne({ _id: id });

    return null;
  }

  async findAllTools(tag = String) {
    const query = {};

    if (tag) {
      query.tags = tag;
    }

    const tools = await this.ormRepository.find(query);

    return tools;
  }
}

module.exports = new ToolRepository();

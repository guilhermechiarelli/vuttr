const ToolRepository = require('../repositories/ToolRepository');

class ToolController {
  async get(req, res) {
    const tool = await ToolRepository.findById(req.params.id);

    if (!tool) {
      return res.status(400).json({ message: 'Tool not found.' });
    }

    return res.status(200).json(tool);
  }

  async index(req, res) {
    const { tag } = req.query;

    const tools = await ToolRepository.findAllTools(tag);

    return res.status(200).json(tools);
  }

  async store(req, res) {
    const { title, link, description, tags } = req.body;

    const tool = await ToolRepository.create({
      title,
      link,
      description,
      tags,
    });

    return res.status(201).json(tool);
  }

  async remove(req, res) {
    const { id } = req.params;

    await ToolRepository.deleteOne(id);

    return res.status(204).json({});
  }
}

module.exports = new ToolController();

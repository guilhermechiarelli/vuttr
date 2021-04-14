const { Router } = require('express');
const ToolController = require('../controllers/ToolController');

const router = Router();

router.get('/tool/:id', ToolController.get);

router.get('/tools', ToolController.index);

router.post('/tool', ToolController.store);

router.delete('/tool/:id', ToolController.remove);

module.exports = router;

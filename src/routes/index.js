const { Router } = require('express');
const ToolController = require('../controllers/ToolController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

const verifyJWT = require('../middlewares/verifyJWT');

const router = Router();

router.post('/user', UserController.store);

router.post('/login', AuthController.store);

router.get('/tool/:id', ToolController.get);
router.get('/tools', ToolController.index);
router.post('/tool', verifyJWT, ToolController.store);
router.delete('/tool/:id', verifyJWT, ToolController.remove);

module.exports = router;

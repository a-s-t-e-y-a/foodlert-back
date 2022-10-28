const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller.js');
const subTaskController = require('../controllers/subtask.controller');

const auth = require('./../middlewares/auth');

router.use(auth);

router.post('/create', taskController.createTask);
router.get('/:creatorId', taskController.getAllTask);
router.get('/:id', taskController.getTask);
router.patch('/edit/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

router.post('/sub/create/:id', subTaskController.createSubTask);
router.get('/sub/:id', subTaskController.getAllSubTask);
router.patch('/:id/sub/:subtaskId', subTaskController.updateSubTask);
router.delete('/:id/sub/delete/:subtaskId', subTaskController.deleteSubTask);

module.exports = router;

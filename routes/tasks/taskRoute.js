const router = require('express').Router();
const isAuth = require('../protectingRoute/protectingRoute');
const taskController = require('../../controllers/taskController');

router.get('/:projectId/tasks', isAuth, taskController.getTask);

router.post('/:taskId/delete', isAuth, taskController.postDeleteTask);

router.get('/:projectId/add-task', isAuth, taskController.getAddNewTask);

router.post('/:projectId/add-task', isAuth, taskController.postAddNewTask);

router.post('/:taskId/change-status', isAuth, taskController.postChangeStatus);

module.exports = router;
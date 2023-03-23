const isAuth = require('../routes/protectingRoute/protectingRoute');
const router = require('express').Router();
const projectController = require('../controllers/projectController');

// TODO PErnao to user Id sta alla routes
router.get('/', isAuth, projectController.getProjectMenu);

router.get('/create-project', isAuth, projectController.getCreateProject);

router.post('/create-project', isAuth, projectController.postCreateProject);

router.get('/edit-project/:projectId', isAuth, projectController.getEditProject);

router.post('/edit-project/:projectId', isAuth, projectController.postEditProject);

router.post('/delete', isAuth, projectController.postDeleteProject);

module.exports = router;
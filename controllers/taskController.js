const Project = require('../model/projectModel');
const Task = require('../model/taskModel');


// showing all tasks for project
exports.getTask = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await Project.findOne({where: {id: projectId}});

        // if project does not exist redirect
        if (!project) {
            return res.redirect('/projects-menu');
        }

        const tasks = await project.getTasks();

        res.render('tasks/showTasks', {
            tasks: tasks,
            projectId
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/projects-menu');
    }
}


exports.getAddNewTask = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await Project.findOne({where: {id: projectId}});

        if (!project) {
            return res.redirect('/projects-menu');
        }

        res.render('tasks/addNewTask', {
            projectId
        });

    } catch (e) {
        console.log(e.body);
    }
}

// adding a new task in the project I have
exports.postAddNewTask = async (req, res) => {
    const projectId = req.params.projectId;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;

    try {
        const project = await Project.findOne({where: {id: projectId}});

        if (!project) {
            return res.redirect('/projects-menu');
        }

        const newTask = await Task.create({
            name: taskName,
            description: taskDescription,
            ProjectId: projectId
        });

        if (newTask) {
            return res.redirect(`/${projectId}/tasks`);
        }

        res.redirect(`/${projectId}/add-task`);

    } catch (e) {
        console.log(e);
    }
}


exports.postChangeStatus = async (req, res) => {
    const status = req.body.taskStatus;
    const taskId = req.params.taskId;
    const projectId = req.body.projectId;

    try {
        const task = await Task.findOne({where: {id: taskId}});
        // console.log(task);
        if (!task) {
            return res.redirect(`/projects-menu`);
        }
        console.log(status);
        await Task.update({
                status: status
            },
            {
                where: {id: taskId}
            }
        );

        return res.redirect(`/${projectId}/tasks`);

    } catch (err) {
        console.log(err)
    }

}


exports.postDeleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const projectId = req.body.projectId;

    try {
        const task = await Task.findOne({where: {id: taskId}});
        const project = await Project.findOne({where: {id: projectId}});

        if(!task || !project) {
            return res.redirect('/projects-menu');
        }

        await Task.destroy({
            where: {
                id: taskId
            }
        });


        return res.redirect(`${projectId}/tasks`);

    } catch (err) {
        console.log(err);
    }

}





















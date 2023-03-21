const Project = require('../model/projectModel');
const User = require('../model/userModel');

exports.getProjectMenu = async (req, res) => {

    try {
        const userId = req.session.UserId;

        const user = await User.findOne({where: {id: userId}});

        const projects = await user.getProjects();
        console.log(projects);

        console.log(req.projectExist)
        res.render('projects/projectsMenu', {
            projects: projects
        });
    } catch (err) {
        console.log(err);
    }
}

// CREATE PROJECT
exports.getCreateProject = (req, res) => {
    res.render('projects/createProject');
}

exports.postCreateProject = async (req, res) => {
    const projectName = req.body.projectName;
    const projectDesc = req.body.projectDesc;
    const userId = req.session.UserId;

    // Create a new Project
    await Project.create({
        title: projectName, description: projectDesc, UserId: userId
    });


    res.redirect('/projects-menu');
}

// EDIT PROJECT
exports.getEditProject = (req, res) => {
    const projectId = req.params.projectId;

    res.render('projects/editProject', {
        projectId
    });
}

exports.postEditProject = async (req, res) => {
    const projectId = req.params.projectId;
    const newTitle = req.body.projectTitle;
    const newDesc = req.body.projectDesc;

    await Project.update(
        {
            title: newTitle,
            description: newDesc
        },
        {where: {id: projectId}});
    res.redirect('/projects-menu');
}


// DELETE PROJECT
exports.postDeleteProject = async (req, res) => {
    const projectId = req.body.deleteProjectId;

    try {
        await Project.destroy({
            where: {
                id: projectId
            }
        });

        res.redirect('/projects-menu');
    } catch (err) {
        console.log(err)
    }
}
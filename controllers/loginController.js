const User = require('../model/userModel');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login');
}


// checking if user gave correct credentials to login
exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({where: {email: email}});

    // check if user exists
    if(!user) {
        console.log('user does not Exist');
        return res.redirect('/register');
    }

    // check if password is correct and if it is, create a session
    if(await bcrypt.compare(password, user.password)) {
        req.session.UserId = user.id;
        req.session.isLoggedIn = true;

        await req.session.save(err => {
            console.log(err.body);
        });

        return res.redirect('/projects-menu');
    }

    // if password is incorrect
    console.log('your password is incorrect');
    return res.redirect('/login');
}
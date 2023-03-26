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
    if (!user) {
        console.log('user does not Exist');
        return res.redirect('/register');
    }

    // check if password is correct and if it is, create a session
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        req.session.UserId = await user.id;
        req.session.isLoggedIn = true;

        console.log(req.session.UserId + "\n\n");
        console.log(req.session.isLoggedIn + '\n\n');

        req.session.save((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            } else {
                return res.redirect('/projects-menu');
            }
        });

    } else {
        // if password is incorrect
        console.log('your password is incorrect');
        return res.redirect('/login');
    }
}
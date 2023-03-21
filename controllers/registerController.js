const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 12;


exports.getRegister = (req, res) => {
    res.render('register');
}


exports.postRegister = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
        // checking if user exists
        if (await User.count() > 0) {
            await isUnique(email);
        }

        // encrypting password and storing user to db
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            await User.create({
                email, username, password: hash
            });
            // creating session
            const user = await User.findOne({where: {email: email}});
            req.session.UserId = user.id;
            req.session.isLoggedIn = true;

            // saving session
            await req.session.save(err => {

            });

            res.redirect(`/projects-menu`);
        });

    } catch (err) {
        console.error(err)
        return res.redirect('/register');
    }
}

// checking if user exists
async function isUnique(email) {
    const number = await User.count({
        where: {
            email: email
        }
    });

    if (number > 0) {
        throw new Error('This user already exists');
    }
}
module.exports = (req, res, next) => {
    req.session.reload(function(err) {
        if(!req.session.isLoggedIn) {
            console.log('This is it:' + req.session.isLoggedIn);
            return res.redirect('/');
        }
        next();
    });
}
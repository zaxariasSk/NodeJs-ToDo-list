exports.logout = (req, res) => {
    req.session.destroy(function(err) {
        console.log(err);
    });

    res.redirect('/');
}



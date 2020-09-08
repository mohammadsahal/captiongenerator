const firebase = require("firebase/app");

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    // res.setHeader('content-type', 'text/html');
    if (user) {
        res.redirect('image');
    } else {
        res.render('signin', {
            title: 'CC: Sign In',
            loginFlag: false
        });
    };
}

function signin(req, res, next) {
    const email = req.body.emailSignin;
    const password = req.body.passwordSiginin;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        res.redirect('image');
    }).catch(function(error) {
        var errorMessage = error.message;
        res.render('signIn', {
            title: 'CC: Failed Sign In',
            error: errorMessage,
            loginFlag: false
        });
    });
}

module.exports = {
    signin: signin,
    render: render
}
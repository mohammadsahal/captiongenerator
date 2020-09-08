const firebase = require("firebase/app");

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.redirect('image');
    } else {
        res.render('register', {
            title: 'CC: Register',
            loginFlag: false
        });
    };
}

function createUser(req, res, next) {
    //get user information
    const username = req.body.usernameRegister
    const email = req.body.emailRegister
    const password = req.body.passwordRegister
    const confirmPassword = req.body.confirmPasswordRegister


    //create user and login
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        const addUser = firebase.firestore().collection('users').add({
            username: username,
            email: email,
            password: password
        });
        return addUser.then(function() {
            res.redirect('image');
        });
    }).catch(error => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                console.log('Email address ' + email + ' already in use.');
                return res.render('register', {
                    title: 'CC: Register Failed',
                    error: 'Email address ' + email + ' already in use.',
                    loginFlag: false
                });
            case 'auth/invalid-email':
                console.log('Email address ' + email + ' is invalid.');
                return res.render('register', {
                    title: 'CC: Register Failed ',
                    error: 'Email address ' + email + ' is invalid.',
                    loginFlag: false
                });
            case 'auth/operation-not-allowed':
                console.log('Error during sign up.');
                return res.render('register', {
                    title: 'CC: Register Failed',
                    error: 'Error during sign up.',
                    loginFlag: false
                });
            case 'auth/weak-password':
                console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                return res.render('register', {
                    title: 'CC: Register Failed',
                    error: 'Password is not strong enough. Add additional characters including special characters and numbers.',
                    loginFlag: false
                });
            case password != confirmPassword:
                console.log('Password does not match confirm password! Please try again!');
                return res.render('register', {
                    title: 'CC: Register Failed',
                    error: 'Password does not match confirm password! Please try again!',
                    loginFlag: false
                });
            default:
                console.log(error.message);
                return res.render('register', {
                    title: 'CC: Register Failed',
                    error: error.message,
                    loginFlag: false
                });
        }
    })


}


module.exports = { createUser: createUser, render: render }
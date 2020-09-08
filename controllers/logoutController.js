const firebase = require("firebase/app");

function logout(req, res, next) {
    firebase.auth().signOut().then(function() {
        res.redirect('/');
    });
}

module.exports.logout = logout
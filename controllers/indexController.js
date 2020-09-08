const firebase = require("firebase/app");

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('index', {
            title: 'CC: Home',
            loginFlag: true
        });
    } else {
        res.render('index', {
            title: 'CC: Home',
            loginFlag: false
        })
    }
}
module.exports = {
    render: render
}
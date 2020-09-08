const firebase = require("firebase/app");

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('caption', {
            title: 'CC: Home',
            error: false,
            loginFlag: true
        });
    } else {
        res.redirect('signin');
    };
}

function addCaption(req, res, next) {
    const caption = {
        caption: req.body.caption,
        hashtagOne: req.body.hashtagOne.replace(/\s/g, ''),
        hashtagTwo: req.body.hashtagTwo.replace(/\s/g, ''),
        hashtagThree: req.body.hashtagThree.replace(/\s/g, ''),
        username: firebase.auth().currentUser.email
    };
    const addCaption = firebase.firestore().collection('captions').add(caption);

    return addCaption.then(function() {
        res.render('caption', {
            title: 'CC: Caption',
            error: false,
            message: 'Successfully added caption!',
            loginFlag: true
        });
    }).catch(err => {
        return res.render('caption', {
            title: 'CC: Caption',
            error: 'An error occured when saving your caption!' + err,
            message: false,
            loginFlag: true
        });
    });
}

module.exports = {
    addCaption: addCaption,
    render: render
}
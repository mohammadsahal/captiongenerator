const firebase = require('firebase/app');

async function searchedHash(req, res, next) {
    const captions = [];
    const search = req.body.search;
    const user = firebase.auth().currentUser;
    const captionRef = firebase.firestore().collection('captions');

    await captionRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                if (search.toLowerCase().replace(/\s/g, '') == doc.data().hashtagOne.toLowerCase().replace(/\s/g, '')) {
                    captions.push("'" + doc.data().caption + "'. Submitted by " + doc.data().username + ".");
                } else if (search.toLowerCase().replace(/\s/g, '') == doc.data().hashtagTwo.toLowerCase().replace(/\s/g, '')) {
                    captions.push("'" + doc.data().caption + "'. Submitted by " + doc.data().username + ".");
                } else if (search.toLowerCase().replace(/\s/g, '') == doc.data().hashtagThree.toLowerCase().replace(/\s/g, '')) {
                    captions.push("'" + doc.data().caption + "'. Submitted by " + doc.data().username + ".");
                }
            });
        })
        .catch(err => {
            captions.push('Error getting documents', err);
        });

    if (captions.length == 0) {
        captions.push('Failed to find a caption related to ' + search);
    }

    if (user) {
        res.render('searchedHash', {
            title: 'CC: Search for ' + search,
            search: search,
            captions: captions,
            loginFlag: true
        });
    } else {
        res.render('searchedHash', {
            title: 'CC: Search for ' + search,
            search: search,
            captions: captions,
            loginFlag: false
        });
    }
}

module.exports.searchedHash = searchedHash;
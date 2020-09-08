const firebase = require("firebase/app");
const functions = require("../public/javascript/functions");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'CaptionGenerator.json'
});

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('image', {
            title: 'CC: Upload Image',
            loginFlag: true
        });
    } else {
        res.redirect('signin');
    };
}

async function checkImage(req, res, next) {
    //setup lables array and get arrary
    var unique = [];
    const imageHashtags = [];
    const userCaptions = [];
    const userImage = req.body.imageRef;
    const imageLink = req.body.imageLink;
    const captionRef = firebase.firestore().collection('captions');

    //vision lable detection
    const [result] = await client.labelDetection(`gs://captiongenerator-268515.appspot.com/${userImage}`);
    const hashtag = result.labelAnnotations;
    hashtag.forEach(label => imageHashtags.push(label.description));
    //get all captions then compare 
    await captionRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                for (var i = 0; i < imageHashtags.length; i++) {
                    if (imageHashtags[i].toLowerCase().replace(/\s/g, '') == doc.data().hashtagOne.toLowerCase().replace(/\s/g, '')) {
                        userCaptions.push("'" + doc.data().caption + "'. Submitted by " + doc.data().username + ".")
                    } else if (imageHashtags[i].toLowerCase().replace(/\s/g, '') == doc.data().hashtagTwo.toLowerCase().replace(/\s/g, '')) {
                        userCaptions.push("'" + doc.data().caption + "'. Submitted by " + doc.data().username + ".")
                    } else if (imageHashtags[i].toLowerCase().replace(/\s/g, '') == doc.data().hashtagThree.toLowerCase().replace(/\s/g, '')) {
                        userCaptions.push("'" + doc.data().caption + "'. Submitted by " + doc.data().username + ".")
                    }
                }
            });
        })
        .catch(err => {
            userCaptions.push('Error getting documents', err);
        });

    if (userCaptions.length == 0) {
        userCaptions.push('Failed to find a caption for this image! Try uploading a caption!');
        res.render('imageCaption', {
            title: 'CC: Upload Image',
            hashtags: imageHashtags,
            captions: userCaptions,
            image: imageLink,
            loginFlag: true
        });
    } else {
        unique = functions.cleanArray(userCaptions)
        res.render('imageCaption', {
            title: 'CC: Upload Image',
            hashtags: imageHashtags,
            captions: unique,
            image: imageLink,
            loginFlag: true
        });
    }
}


module.exports = {
    checkImage: checkImage,
    render: render
}
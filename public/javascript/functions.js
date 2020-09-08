function cleanArray(myArray) {
    var unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
    return unique
}

module.exports.cleanArray = cleanArray
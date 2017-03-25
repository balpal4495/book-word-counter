module.exports = { isPrime, wordCounter, cleanString, arrayFromString, removeEmptyElements };

function isPrime(n) {
    if (n < 2) return false;

    let q = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= q; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

function wordCounter(array) {
     let objectToReturn = {};
     array.forEach(function (word) {
        word = word.toLowerCase();
        if (objectToReturn[word]) objectToReturn[word]++;
        else objectToReturn[word] = 1;
    });
    return objectToReturn;
}

function cleanString(string) {
    return string.replace(/[^a-zA-Z ]/g, ' ');
}

function arrayFromString(string) {
    return string.split(" ");
}

function removeEmptyElements(array) {
    return array.filter((word) => {
        return /\S/.test(word);
    });
}
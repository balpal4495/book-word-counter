/**
 * second attempt with less external libraries used and mostly contained within the readfile function
 */

const fs = require('fs');
const isPrime = require('./utils').isPrime;
const wordCounter = require('./utils').wordCounter;
const cleanString = require('./utils').cleanString;
const arrayFromString = require('./utils').arrayFromString;
const removeEmptyElements = require('./utils').removeEmptyElements;

console.time('createBookObject2');
fs.readFile('largeTest.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let book = data;
  book = cleanString(book);
  book = arrayFromString(book);
  book = removeEmptyElements(book);

  let words = wordCounter(book);

  let wordsWithPrime = [];
  for (let word in words) {
    let primeObject = {word: word, occurence: words[word], isPrime: null};
    if(isPrime(words[word])) {
        primeObject.isPrime = true;
    } else {
        primeObject.isPrime = false;
    }
    wordsWithPrime.push(primeObject);
  }
  fs.writeFile('test2.json', JSON.stringify(wordsWithPrime), (err) => {
     if (err) return console.log(err);
  });
});
console.timeEnd('createBookObject2');

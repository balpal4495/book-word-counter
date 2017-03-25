/**
 * This will be a mix of libraries without using promises
 */

const fs = require('fs');
const natural = require('natural');
      tokenizer = new natural.WordTokenizer();
const primality = require('primality');
const wordCounter = require('./utils').wordCounter;
const cleanString = require('./utils').cleanString;

console.time('createBookObject3');
fs.readFile('largeTest.txt', 'utf8', function (err, data) {
  if (err) return console.log(err);
  let book = data;
  book = cleanString(book);
  book = tokenizer.tokenize(book);  

  let words = wordCounter(book);

  let wordsWithPrime = [];
  for (let word in words) {
    let primeObject = {word: word, occurence: words[word], isPrime: null};
    if(primality(words[word])) {
        primeObject.isPrime = true;
    } else {
        primeObject.isPrime = false;
    }
    wordsWithPrime.push(primeObject);
  }
  fs.writeFile('test3.json', JSON.stringify(wordsWithPrime), (err) => {
     if (err) return console.log(err);
  });
});
console.timeEnd('createBookObject3');

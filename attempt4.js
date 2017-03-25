/**
 * Now comparing to see how promise based performance 
 * is without external libraries
 */

const fs = require('fs');
const isPrime = require('./utils').isPrime;
const cleanString = require('./utils').cleanString;
const arrayFromString = require('./utils').arrayFromString;
const removeEmptyElements = require('./utils').removeEmptyElements;

createBookObject('largeTest.txt');

console.time('createBookObject4');
function createBookObject(bookFile) {
    return _readBookData()
           .then(_calculateWords)
           .then(_calculatePrime)
           .then(_createJson)
           .then(_finish);

    function _readBookData() {
        return new Promise((resolve, reject) => {
            fs.readFile(bookFile, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    function _calculateWords(book) {        
      book = cleanString(book);
      book = arrayFromString(book);
      let wordsArray = removeEmptyElements(book);

      const wordsGrouped = wordsArray.reduce((allWords, word) => { 
        word = word.toLowerCase();
        if (word in allWords) {
            allWords[word]++;
        } else {
            allWords[word] = 1;
        }
        return allWords;
      }, {});

      return Promise.resolve(wordsGrouped);
    }

    function _calculatePrime(words) {        
      let wordsWithPrimes = [];
        for (let word in words) {
            let primeObject = {word: word, occurence: words[word], isPrime: null};
            if(isPrime(words[word])) {
                primeObject.isPrime = true;
            } else {
                primeObject.isPrime = false;
            }
            wordsWithPrimes.push(primeObject);
        }               
      return Promise.resolve(wordsWithPrimes);
    }

    function _createJson(wordsWithPrimes) {        
        return new Promise((resolve, reject) => {
            fs.writeFile('test4.json', JSON.stringify(wordsWithPrimes), 'utf-8', (err) => {
                if (err){
                    console.log('error::', err);
                    reject(err);
                } 
                else {
                    resolve(wordsWithPrimes);
                }
            });
        });
    }

    function _finish() {
        console.timeEnd('createBookObject4');
        return Promise.resolve();
    }
  }
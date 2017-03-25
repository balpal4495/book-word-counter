/**
 * This is to compare bluebird promises performance with native
 */

const Promise = require("bluebird");
const natural = require('natural');
      tokenizer = new natural.WordTokenizer();
const fs = require('fs');
const primality = require('primality');
const cleanString = require('./utils').cleanString;


console.time('createBookObject5');
createBookObject('largeTest.txt');

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
      let wordsArray = tokenizer.tokenize(book);      

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
      Object.keys( words ).forEach( word => {
          let newObject = {word: word, occurence: words[word], isPrime: null};
          if(primality(words[word])) {
              newObject.isPrime = true
          } else {
              newObject.isPrime = false
          } 
          wordsWithPrimes.push(newObject);
      });        
      return Promise.resolve(wordsWithPrimes);
    }

    function _createJson(wordsWithPrimes) {
        return new Promise((resolve, reject) => {
            fs.writeFile('test5.json', JSON.stringify(wordsWithPrimes), 'utf-8', (err) => {
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
        console.timeEnd('createBookObject5');
        return Promise.resolve();
    }
  }
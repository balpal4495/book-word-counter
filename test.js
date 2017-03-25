const assert = require('chai').assert;
const isPrime = require('./utils').isPrime;
const cleanString = require('./utils').cleanString;
const arrayFromString = require('./utils').arrayFromString;
const removeEmptyElements = require('./utils').removeEmptyElements;
const wordCounter = require('./utils').wordCounter;
const primality = require('primality');
const natural = require('natural');
      tokenizer = new natural.WordTokenizer();


describe('prime validation', () => {
    describe('primality test', () => {
        it('should confirm 3 is a prime number', () => {
            let result = isPrime(3);
            assert.isOk(result);
        });
        it('should confirm 4 is not a prime number', () => {
            let result = isPrime(4);
            assert.isNotOk(result);
        });
    });

    describe('isPrime test', () => {
        it('should confirm 4 is not a prime number', () => {
            let result = isPrime(4);
            assert.isNotOk(result);
        });
        it('should confirm 3 is a prime number', () => {
            let result = isPrime(3);
            assert.isOk(result);
        });
    });
});


describe('String manipulation', () => {
    it('should remove special characters and replace with a space', () => {
        let cleanData = 'This is a sentence';
        let unCleanData = 'This&is$a%sentence';
        let dataCleanUp = cleanString(unCleanData);
        assert(dataCleanUp === cleanData);
    });

    it('should return an array from string', () => {
        let data = 'This is a sentence';
        let dataArray = arrayFromString(data);
        assert.isArray(dataArray);
    });
});


describe('array manipulation', () => {
    it('should remove empty elements from array', () => {
        let goodArray = ['This', 'is', 'a', 'sentence'];
        let badArray = ['This', '', 'is', 'a', 'sentence'];
        let arrayCleanUp = removeEmptyElements(badArray);        
        assert.deepEqual(arrayCleanUp, goodArray);
    });

    it('compare tokenize to native', () => {
        let data = 'This is a sentence';
        data = cleanString(data);
        let tokenizerArray = tokenizer.tokenize(data);  
        let nativeArray = arrayFromString(data);
        nativeArray = removeEmptyElements(nativeArray);
       
        assert.deepEqual(nativeArray, tokenizerArray);
    });

    it('should count occurences from array', () => {
        let data = ['This', 'is', 'is',  'a', 'a', 'sentence'];
        let comparison = {
            this: 1,
            is: 2,
            a: 2,
            sentence: 1
        }

        let groupedData = wordCounter(data);

        assert.deepEqual(groupedData, comparison);
    });
});

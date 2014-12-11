/*jslint browser: true, devel: true */
/*jslint unparam: true*/

// Basic Promise construction.
var basicPromise = new Promise(function (resolve, reject) {
        var basicOperation = true;
        if (basicOperation) {
            resolve('play to win');
        } else {
            reject('crash and burn');
        }
    });

// A Promise constructor returns a Promise object;
function evenOdds() {
    return new Promise(function (resolve, reject) {
        if (Math.random() > 0.5) {
            resolve('beautiful');
        } else {
            reject('horrific');
        }
    });
}

// Constructing resolve and reject functions to operate on an eventual Promise value;
function get(value) {
    console.log('everything is ' + value);
}

function throwOut(value) {
    console.log('so wrong ' + value);
}

// evenOdds().then(get, throwOut);

function fail(value) {
    return 'so ' + value;
}

function give(val) {
    return 'so extremely ' + val;
}

// Passing a value with the 'then' method.
// evenOdds().then(give, fail).then(get, throwOut);

// Promise constructor that takes a variable;
function gotcha(value) {
    return new Promise(function (resolve, reject) {
        if (value.length > 0) {
            value = 'so extremely ' + value;
            resolve(value);
        } else {
            reject('sorry');
        }
    });
}

// Chaining two Promises together is joyful!
// evenOdds.then(gotcha);


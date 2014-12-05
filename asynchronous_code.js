/*jslint browser: true, devel: true */
/*jslint unparam: true*/

// Expected behaviour from synchrous function.
function output(value) {
    return value;
}
var sync = output('jumbalaya');

console.log("sync === 'jumbalaya'");
console.log(sync === 'jumbalaya');    // true

// Difficulty in capturing value from asynchronous call.
var async = setTimeout(function () {
    console.log('stay classy');
    return 'to the depths';
}, 1500);

console.log("async === 'to the depths'");
console.log(async === 'to the depths');    // false

// The function setTimeout can operate on a global variable
// in order to make it's product available.
var deffered = 'bric a brac';   // global variable
var passingOut = setTimeout(function () {
    deffered = 'captured value';
    console.log('check deffered now');
}, 3000);

console.log("deffered === 'captured value'");
console.log(deffered === "captured value");    // false

// Another way to set a global variable.
function setGlobal () {
    window.greeting = 'namaste';
}

// Example of chained synchronous functions.

'run'.concat(' away').bold();   // <b>run away</b>

// Nested asynchronous functions.
function chains() {
    var arcane = 'chains';
    setTimeout(function () {        // outer function
        arcane += ' of ';
        setTimeout(function () {    // inner function
            arcane += 'mephistopheles';
            console.log(arcane)
        }, 700);
    }, 700);
    return arcane;
}

// Promises can't return a value to function caller.
var basicPromise = new Promise(function (resolve, reject) {
    if (resolve) {
        resolve('play to win');
    } else {
        reject('crash and burn');
    }
});

var give = function (val) {
    console.log(val);
    return 'gets passed to new Promise';
};

// Promises can pass value to another function with then keyword.
console.log("basicPromise.then(give) === 'play to win'");
console.log(basicPromise.then(give) === 'play to win');    // false
console.log("basicPromise === 'doesn't really matter'");
console.log(basicPromise === 'doesn\'t really matter');    // false

var get = function (val) {
    console.log('don\'t forget we always' + val);
    resolve('go fishing!');
};


// Returning a promise
function evenOdds () {
    return new Promise(function (resolve, reject) {
        if (Math.random() > .5) {
            resolve('beautiful');
        } else {
            reject('try again')
        }
    });
}

// testing beleaguered premise
function conjuction() {
    var terse = 'nam nam';
    setTimeout(function () {
        console.log(terse);
        setTimeout(function () {
            console.log(terse);
        }, 500);
    }, 500);
}

// Promise constructor that takes a variable
function got(value) {
    return new Promise(function (resolve, reject) {
        if (value) {
            value = 'everything is so ' + value;
            resolve(value);
        } else {
            reject(value);
        }
    });
}


/*jslint browser: true, devel: true */
/*jslint unparam: true*/

//Expected behaviour from synchrous function.
function output(value) { return value; }
var sync = output("jambalaya");

console.log('sync === "jambalaya"');
console.log(sync === "jambalaya"); //true

//Difficulty in capturing value from asynchronous call.
var async = setTimeout(function () {
    console.log("Stay Great");
    return "to the depths";
}, 1500);

console.log('async === "to the depths"');
console.log(async === "to the depths"); //false

// The function setTimeout can operate on a global variable
// in order to make it's product available.
var deffered = "bric a brac";

var passingOut = setTimeout(function () {
    deffered = "captured value";
    console.log("check deffered now");
}, 3000);

console.log('deffered === "captured value"');
console.log(deffered === "captured value"); //true

//Example of nested callback chain using non-global variable.
//This may not work in some versions of IE.
function subject(callback, sentence) {
    setTimeout(function () {
        var who = "I ";
        sentence = who + sentence;
        callback(sentence);
    }, 1500, sentence);
}

function say(sentence) {
    console.log(sentence);
}

function object(sentence) {
    setTimeout(function () {
        var where = "home.";
        sentence += where;
        say(sentence);
    }, 2000, sentence);
}

function action(sentence) {
    setTimeout(function () {
        var what = "will go ";
        sentence = sentence + what;
        object(sentence);
    }, 2500, sentence);
}

function saySomething() {
    var sentence = '';
    subject(action, sentence);
}

//Promises can't return a value to function caller.
var basicPromise = new Promise(function (resolve, reject) {
    if (resolve) {
        resolve("Play to Win");
    } else {
        reject("Crash and Burn");
    }
});

var give = function (val) {
    console.log(val);
    return "Doesn't Matter Anyways";
};

//Promises can pass value to another function with then keyword.
console.log('basicPromise.then(give) === "Play to Win"');
console.log(basicPromise.then(give) === "Play to Win"); //false

var get = function (val) {
    console.log("don't forget we always" + val);
    resolve("absalom absalom");
};

var ansy = new Promise(function (resolve, reject) {
    async;
});
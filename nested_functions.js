// Nested asynchronous functions perform sequentially waiting for
// preceding function to resolve before calling next level.
function axiom() {
    var friends = "forever";
    setTimeout(function () {
        var boundaries = "necessary";
        setTimeout(function () {
            console.log("friends are " + friends + " " + boundaries);
        }, 1200)
    }, 1200);
}

//Example of nested callback chain using non-global variable.
function subject(callback, sentence) {
    setTimeout(function () {
        var who = "I ";
        sentence = who + sentence;
        callback();
    }, 1500);
}

function object(sentence) {
    setTimeout(function () {
        var where = "home.";
        sentence += where;
        say(sentence);
    }, 2000);
}

function action(sentence) {
    setTimeout(function () {
        var what = "will go ";
        sentence = sentence + what;
        object(sentence);
    }, 2500);
}

function say(sentence) {
    console.log(sentence);
}

function saySomething() {
    var sentence = '';
    subject(action, sentence);
}


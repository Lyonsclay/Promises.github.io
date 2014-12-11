/*jslint browser: true, devel: true */
/*jslint unparam: true*/

// Expected behaviour from synchrous function.
function output(value) {
    return value;
}
var sync = output('jumbalaya');

console.log("sync === 'jumbalaya'");
console.log(sync === 'jumbalaya');    // true

// Chaining synchronous functions with dot operator.
'run'.concat(' away').bold();  // <b>run away</b>

// Difficulty in capturing value from asynchronous call.
var async = setTimeout(function () {
    console.log('stay classy');
    return 'above all else';
}, 1500);

console.log("async === 'above all else'");
console.log(async === 'above all else');    // false

// The function setTimeout can operate on a global variable
// in order to make it's product available.
var deffered = 'bric a brac';   // global variable

var passingOut = setTimeout(function () {
    deffered = 'captured value';
    console.log('check deffered now');
}, 3000);

console.log("deffered === 'captured value'");
console.log(deffered === 'captured value');    // false

// Another way to set a global variable;
function setGlobal() {
    window.greeting = 'namaste';
}


// Nested asynchronous functions;
function chains() {
    var arcane = 'chains';
    setTimeout(function () {        // outer function
        arcane += ' of ';
        setTimeout(function () {    // inner function
            arcane += 'mephistopheles';
            console.log(arcane);
        }, 700);
    }, 700);
    return arcane;
}

var breakable = chains();


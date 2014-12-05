// Basic Promise construction.
var basicPromise = new Promise(function (resolve, reject) {
        var basicOperation = true;
        if (basicOperation) {
            resolve('play to win');
        } else {
            reject('crash and burn');
        }
    }
});

// Return a Promise from a function.
function get(value) {
    console.log('everything is ' + value);
}

function throwOut(value) {
    console.log('so wrong ' + value);
}
// evenOdds().then(get, throwOut);

// Passing a value with the 'then' method.
function give(val) {
    return 'so extremely ' + val;
}
// evenOdds().then(give, throwOut).then(get, throwOut);

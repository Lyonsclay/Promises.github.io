EcmaScript6 has introduced a native Promises spec which "promises" to make asynchronous chaining much simpler.

Promises are a new pattern to handle asynchronous JavaScript functions. They provide a way of chaining multiple asynchronous functions that allows them to operate sequentially and pass values to each other. This means that each function will wait for the previous function to pass a value and then can operate on that value.

This is a relatively new pattern and might not work out of the box on older browsers.
[Browser Compatability](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#AutoCompatibilityTable)

Despite the simplicity of the Promise pattern I've found that the descriptions and numerous tutorials on the web to be insufficient for completely grasping the concept. One of the failings I have observed is the general attempt to learn Javascript patterns with contrived examples.

Instead I am going illustrate a solution to an actual problem: capturing the latitude and longitude of a broswer with the [HTML5 Geolocation Api](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) and then turning that into a physical address. If you are already familiar with asynchronous JavaScript code feel free to skip to the [Promises](#promises) section.

* [Getting Started](#getting_started)
* [Synchronous Code](#synchronous_code)
* [Asynchronous Code](#asynchronous_code)
* [Promises](#promises)
* [Geolocation Method](#geolocation_method)
* [Geolocation Promise](#geolocation_as_promise)
* [Reverse Geocoding](#reverse_geocoding)
## Getting Started

You can checkout my [Github repo](https://github.com/Lyonsclay/Promises-Promises.git) it has all the function defintions for this tutorial. I've included a simple ruby server that will become necessary when the HTML5 geolocation feature is used.

## Synchronous Code

A typical javascript function definition is an example of synchronous code. Synchronous code is run sequentially from one line to the next and blocks execution of further tasks until the present routine is complete. Synchronous code can return a value to the function caller with the `return` statement.

```javascript
function output(value) {
    return value;
}

var sync = output('jumbalaya');
console.log(sync === 'jumbalaya');   // true
```

## Asynchronous Code

Now let's look at an asynchronous function using [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers.setTimeout) as the example. With an asynchronous function you can't capture the output directly with a return statement.

```javascript
var async = setTimeout(function () {
    console.log('stay classy');
    return 'to the depths';
}, 1500);

console.log(async === 'to the depths');   // false
```

The return statement inside the `setTimeout` is actually ignored and `async` is set to equal the numerical id of the timeout. This id can then be used with the `clearTimeout` function to end an active `setTimeout`timer.

One way of capturing a value from a `setTimeout` is to define a global variable so that all functions can access it.

```javascript
var deffered = 'bric a brac';   // global variable
var passingOut = setTimeout(function () {
    deffered = 'captured value';
    console.log('check deffered now');
}, 3000);

console.log(deffered === "captured value");    //false
```

The global variable can also be set inside a function.[window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

```javascript
function setGlobal () {
    window.greeting = 'namaste';
}
```

Either way it is declared a global variable refers to a variable in the [global execution context](http://www.ecma-international.org/ecma-262/5.1/#sec-10.2.3) which means that all functions declared in the immediate scope and it's descendants have access to a global variable.

Synchronous functions can be chained together so that the output of one function is the input of the next. This works because all functions declared inside an outer function have access to it's variables.[scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

```javascript
'run'.concat(' away').bold(); // <b>run away</b>
```

To chain asynchronous functions together they have to be nested so that they are forced to operate in sequence.

```javascript
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
```

The execution of each nested asynchronous function is contingent upon the completion of an event called by the outer function that encompasses it. In the above case that event is a delay of 700 milliseconds. As with any function the code encapsulated executes sequentially. By nesting a function we wait for the outer function to complete before executing the lines of code in the inner function.

If we set a variable equal to the output of the function `chains` that variable will still have the value given in the initial declaration `var arcane = "chains"`. Each time an asynchronous function like `setTimeout` is called it gets processed in it's own time and doesn't block subsequent code. That means that the value for `arcane` has returned before the functions passed to the `setTimeout`s adds the text "of" and "mephistopheles" respectively to `arcane`.

##Promises

The native EcmaScript6 Promise is based off of the [Promises/A+](https://promisesaplus.com) proposal which has a nice clear specification that is worth checking out.

Here is a simple promise to illustrate the pattern.

```javascript
var basicPromise = new Promise(function (resolve, reject) {
		var basicOperation = true;
    if (basicOperation) {
        resolve("play to win");
    } else {
        reject("crash and burn");
    }
});
```

If you enter `basicPromise` in the console you will see what a Promise object looks like and what value it has resolved to.

If you get an error stateing that Promise is not defined your browser may not support Promises( currently no version of IE does). Consider updating your browser or include the polyfill recommended by [Forbes Lindesay](https://www.promisejs.org).

```javascript
basicPromise // Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "play to win"}
```

A promise takes a function with two arguments, which by convention are "resolve" and "reject". These names can be anything, but it's better to stick with convention. Inside the function body will live the core operations of the Promise, in this case it is simply setting the variable `basicOperation` to `true`. After the core operations are concluded you are responsible for calling "resolve" or "reject", otherwise the Promise will forever have the status of "pending". Both "resolve" and "reject" take an argument which can be any object that then becomes the PromiseValue. It's important to note that while you can name "resolve" and "reject" anything you want these are not functions you define, but are rather functions defined on the Promise prototype that you call with arguments that you provide.

A promise can be "pending", "resolved", or "rejected". Once a Promise has resolved it's state to "resolved" or "rejected" it never changes status after that. If you want to invoke the same operation multiple times and use the Promise pattern then just return a Promise from a function.

```javascript
function evenOdds() {
    return new Promise(function (resolve, reject) {
        if (Math.random() > .5) {
            resolve('beautiful');
        } else {
            reject('horrific')
        }
    });
}
```

If you enter `evenOdds();` multiple times in the console the `PromiseValue`will equal "resolve" or "reject" randomly. Now let's say we want to pass the `PromiseValue` to a function that does something with it's value. For that we are provided with a `then` method that allows us to chain functions so that they perform sequentially and are able to pass values to subsquent functions.

```javascript
function get(value) {
	console.log('everything is ' + value);
}

function throwOut(value) {
	console.log('so wrong ' + value);
}

evenOdds().then(get, throwOut);
```

Try entering `evenOdds().then(get, throwOut);` multiple times and you will observe the value geting passed randomly to `get` or `throwOut`.

According to the [Promises A+]() specification the `then` method receives two arguments that are ignored if they are not functions. The `then` method passes the `promiseValue` to the first function if it is resolved or the second method if the promise has rejected.

The term 'thenable' refers to an object or function that has a `then` method. This is the most essential characteristic of a Promise and is what allows for Promises of different libraries to interact. There is some speculation that JavaScript asynchronous functions that are currently using the Callback pattern will be adapted to the Promise pattern.

What if you want to pass a value from `get` to another function to operate on? A simple way to do this is to add a return statement which shares a value down the chain.

```javascript
function give(val) {
	return 'so extremely ' + val;
}

evenOdds().then(give, throwOut).then(get, throwOut);
```

##Promise Land

So we are now passing a series of asynchronous functions through the Promise interface; this doesn't seem right. It doesn't seem right because we are in the Promise Land and all code in Promise Land is clean and beautiful. What I like about the Promise object is that

A more readable homogenous way of doing it is to pass a promise generator through a `then` statement.

```javascript
function got(value) {
    return new Promise(function (resolve, reject) {
        if (value) {
            value = 'so extremely ' + value;
            resolve(value);
        } else {
            reject('sorry');
        }
    });
}

evenOdds().then(got).then(give, throwOut);
```

##Geolocation Method

HTML5 has a native function [getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) to acquire geolocation data from a particular piece of hardware running a browser such as a laptop or mobile device. You can test your browser's ability use the HTML5 geolocation service with this [demo app](https://mdn.mozillademos.org/en-US/docs/Web/API/Geolocation/Using_geolocation$samples/Geolocation_Live_Example?revision=635775) provided by Mozilla.

In order to get location data from a device we use the asynchronous method `getCurrentPosition` which is called on the `navigator.geolocation` object and takes two callbacks `success` and `error`. [Callbacks](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/) are functions that get passed into a host function in order to be called after some operations.

The Callback pattern is perhaps the most widely used design for asynchronous code. The essential mechanism of passing a function as another functions parameter is the fundamental way to interact with events that are non blocking. In fact, the first argument of [setTimeout](#asynchronous_code) can be considered a callback function for all intensive purposes. What's different is that `getCurrentPosition`takes an optional second callback, `error`, which is triggered if `getCurrentPosition` can't get geolocation data for the device it is running on.

```javascript
navigator.geolocation.getCurrentPosition(success, error, options)
```

So now let's implement a `find` method and define a `success` and `error` function with some standard `options` for the output data.

```javascript
function find() {
	navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(position) {
	console.log("Your current position is;");
    console.log(position.coords.latitude, position.coords.longitude);
}

function error() {
    alert("Sorry, no position available.");
}

// These are some standard options, it's actually not required
// to provide the parameter of options.
var options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};
```

If you enter `find();` in your developer's console you will get an output of your current location assuming you are on a the modern browser and have given it permission to check location.

Our next challenge will be to take the latitude and longitude coordinates and turn that data into a physical address. Before we do this we are going to turn the `find` function in to a Promise in preparation of chaining the two functions together.




##Geolocation Promise

First off we'll create a Promise constructor for the geolocation service. If you recall the function to acquire geolocation data takes a `success` and `error` callback.

```javascript
navigator.geolocation.getCurrentPosition(success, error, options)
```

This makes it easy to pipe into a Promise as `success` and `error` correspond to `resolve` and `reject`. For the sake of simplicity we will ignore the `options` argument.

```javascript
function geoLocate() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
```

Let's create a function that turns the geolocation object into latitude and longitude and wrap that function into a Promise.

```javascript
function getCoordinates(position) {
    return new Promise(function(resolve, reject) {
        if (position) {
            coords = [position.coords.latitude, position.coords.longitude];
            resolve(coords);
        } else {
            reject(position);
        }
    });
}
```

Now let's create a fresh logging function `grab` to display the result and for good measure we'll recycle `throwOut` so we have an error function to pass.

```javascript
function grab(val) {
	console.log(val);
}

function throwOut(value) {
	console.log("so wrong " + value);
}

geoLocate().then(getCoordinates).then(grab, throwOut);
```

##Reverse Geocoding

Reverse Geocoding is the process of getting a physical address from latitude and longitude coordinates.
We are going to use the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) to perform the [Reverse Geocoding](https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse).

To start with you have to include the script that contains the Google Maps Javascript code for connection to the API.

```javascript
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
```

The Google Maps API is fairly extensive performing many services which we are only using a small portion of.

```javascript
function reverseGeocode(coords) {
    var geocoder = new google.maps.Geocoder(),
        coordinates = new google.maps.LatLng(coords[0], coords[1]),
        setting = { 'latLng': coordinates };
    geocoder.geocode(setting, function (results, status) {
        if (status === 'OK') {
            var address = (results[0].formatted_address);
            console.log(address);
        } else {
            alert(status);
        }
    });
}
```

http://blog.parse.com/2013/01/29/whats-so-great-about-javascript-promises/
http://stackoverflow.com/questions/4862193/javascript-global-variables
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
http://fuqua.io/blog/2014/02/native-javascript-promises-and-browser-apis/

"Function statement should only be done at the top level." - Douglass Crockford [Because of hoisting?]
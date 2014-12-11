/*jslint browser: true, devel: true */
/*jslint unparam: true*/

// In order to use Geolocation services in the browser
// from this code you must run a local server.
// Type the following from the command line in the root folder;
// ruby simple_server.rb

// Convert geolocation service to Promise;
function geoLocate() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

var where = geoLocate();

// Extract coordinates from Geoposition object;
function getCoordinates(position) {
    return new Promise(function (resolve, reject) {
        if (position) {
            var coordinates = [position.coords.latitude, position.coords.longitude];
            resolve(coordinates);
        } else {
            reject(position);
        }
    });
}

// A simple logging function;
function grab(val) {
    console.log(val);
}

function throwOut(value) {
    console.log('so wrong ' + value);
}

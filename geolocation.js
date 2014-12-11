/*jslint browser: true, devel: true */
/*jslint unparam: true*/

// Basic geolocation request;
// navigator.geolocation.getCurrentPosition(success, error, options)

// Success function logs current devices latitude and longitude.
function success(position) {
    console.log("Your current position is;");
    console.log(position.coords.latitude, position.coords.longitude);
}

function error() {
    alert("Sorry, no position available.");
}

var options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};

// Geolocation request in a function;
function finder() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}
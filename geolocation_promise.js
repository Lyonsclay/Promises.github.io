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

var options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};

//////////////////////////////////////////


// var sendLocation = function (geo) {
//     var coordinates = geo;
//     alert(coordinates);
//     return coordinates;
// }

// var displayLocation = function(coords) {
//     var locationJSON = JSON.stringify(coords)
//     demo.insertAdjacentHTML('beforeend', "<p>" + locationJSON + "</p>");
// }



// Convert geolocation service to promise

function geoLocate() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}



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

// reverse geocode using google maps api

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

function getAddress(coords){
    return new Promise(function (resolve, reject) {
        var geocoder = new google.maps.Geocoder();
        var coordinates = new google.maps.LatLng(coords[0], coords[1]);
        var setting = { 'latLng': coordinates };
        geocoder.geocode(setting, function (results, status) {
            if (status === 'OK') {
                resolve(results[0].formatted_address);
            } else {
                reject(status);
            }
        });
    });
}

function grab(val) {
    console.log(val);
}

function throwOut(val) {
    console.log('so wrong ' + val);
}





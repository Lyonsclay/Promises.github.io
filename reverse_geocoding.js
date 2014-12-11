/*jslint browser: true, devel: true */
/*jslint unparam: true*/

// In order to use Google Maps API you must load the following script.
// <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
// This has already been included in index.html.

// Reverse geocoding using Google Maps API;
function reverseGeocode(points) {
    var geocoder = new google.maps.Geocoder(),
        coordinates = new google.maps.LatLng(points[0], points[1]),
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

// Turning the reverse geocode interface into a Promise;
function getAddress(points) {
    return new Promise(function (resolve, reject) {
        var geocoder = new google.maps.Geocoder(),
            coordinates = new google.maps.LatLng(points[0], points[1]),
            setting = { 'latLng': coordinates };
        geocoder.geocode(setting, function (results, status) {
            if (status === 'OK') {
                resolve(results[0].formatted_address);
            } else {
                reject(status);
            }
        });
    });
}

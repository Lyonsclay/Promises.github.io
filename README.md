Promises-Promises
=================

This is the code for a [basic tutorial](http://lyonsclay.github.io/Promises.github.io/) on native JavaScript Promises. You can clone the repo and follow the demonstrations in your browser.

Promises are relatively new implementation and might not work out of the box on older browsers.
[Browser Compatability](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#AutoCompatibilityTable)

I've included a simple ruby server in the repo that will become necessary when the HTML5 geolocation feature is used. To run the server enter `ruby simple_server.rb` in the command line from the root folder then enter `localhost:\\8000`in your browser header. You should see 'Welcome to the Promise Land' at the top of the screen.

Now select the developer's console of your browser( on a Mac it's `command-shift-'i'`). If a window opens at the bottom of your screen you should see the output of various functions in the example code. All of the functions definitions are in the code so that you can simply experiment with calling the demo functions from the developer's console.

If you get an error stateing that Promise is not defined your browser may not support Promises( currently no version of IE does). Consider updating your browser or include the polyfill recommended by [Forbes Lindesay](https://www.promisejs.org).
Promises-Promises
=================

This is the code for a basic tutorial on native JavaScript Promises. You can clone the repo and follow the demonstrations in your browser.

Assuming you have git installed open up a terminal session and cd to the folder you want to store the repo.

'''console
git clone https://github.com/Lyonsclay/Promises-Promises.git
'''

Or if you have the GitHub desktop app you can simply use the `Clone in Desktop` button to the right.

This is a relatively new pattern and might not work out of the box on older browsers.
[Browser Compatability](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#AutoCompatibilityTable)

I've included a simple ruby server in the repo that will become necessary when the HTML5 geolocation feature is used. To run the server enter `ruby simple_server.rb` in the command line from the root folder then enter `localhost:\\8000`in your browser header. You should see 'Welcome to Promise Land' at the top of the screen.

Now select the developer's console of your browser( in Chrome its `command-shift-'i'`). If a window opens at the bottom of your screen you should see the output of various functions in the example code. It's also where you can enter code as you go through the tutorial.

All of the functions definitions are in the code so that you can simply experiment with calling the demo functions from the developer's console.

If you get an error stateing that Promise is not defined your browser may not support Promises( currently no version of IE does). Consider updating your browser or include the polyfill recommended by [Forbes Lindesay](https://www.promisejs.org).
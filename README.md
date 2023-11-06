## Dice Roller Collection

### C
Coming soon...

### C++
Coming soon...

### GO

The GOLANG implementation of diceRoller is built on a server/client architecture.

```
diceRoller_server -p <default: 8001>
diceRoller_client -h <default: localhost> -p <default: 8001> -number <default: 10> -numsides <default: 6>
```

The GOLANG implementation of diceRoller uses http, but while one could access it from a browser, it doesn't provide the "extended" web interface that the node.js implementation does.  Rather, it merely spits out a json string based on the values in the GET request issued by a/the client.  

### Node.js

A dice rolling server node.js application.

Here we implement diceRoller as an http application (web app).

It accepts one command line argument: a port number between 1024 and 65535.  If no number is provided at the command line, the server defaults to listening to port 8001.  Non-numeric input on the command line is ignored and attempts to bind the server to a port already in use throws an unhandled error (we didn't implement error handling in this demo).

We implement the http server (http/1.1) with an excerpted version of our Legate protocol-handling library (a very lightweight routing wrapper around the node.js http module).

Unlike the other diceRoller implementations in this repository, the node.js implementation uses a web interface to select and pass both the number of dice and the number of sides those dice have to the server.  The server then calculates the die roll using the cryptographically secure Crypto.randomInt() function.  This is almost certainly overkill (dice rolls probably don't require crytographically secure random numbers), but... we like our dice well-shaken.

The root, dice results, and about pages are all the output of functions, rather than individual files, but there is an "external" .css file in the /public/inc/ directory.  We chose this approach because the pages themselves are very simple.  The .css file is separate to ease customization of the app's appearance.

### Python
Coming soon...

### WebAssembly
Coming soon...

# Dockerized GO implementation of diceServer

Docker will probably require a linux exec format for the binary, so first you'll need to (cross-)compile the diceServer for that platform:

```
env GOOS=linux GOARCH=amd64 go build -ldflags="-extldflags=-static"  
```

Once the binary is compiled, you can build the image:
```
docker build --tag diceserver .
```

Once the image is built, you can run it with the following command.  Note that it "publishes" the exposed container port(s) to the host.  Further note that, in this scenario, we're running the diceServer on its default port (8001).
```
docker run --rm -it -p 8001:8001 diceserver
```

Once the containerized version of diceRoller_server is running, you can test it by navigating to http://localhost:8001/diceServer

This should return a ```400``` status code.
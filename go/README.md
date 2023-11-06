# diceRoller, a GOLANG server/client implementation
The GOLANG implementation of diceRoller is built on a server/client architecture.

```
diceRoller_server -p <default: 8001>
diceRoller_client -h <default: localhost> -p <default: 8001> -number <default: 10> -numsides <default: 6>
```

The GOLANG implementation of diceRoller uses http, but while one could access it from a browser, it doesn't provide the "extended" web interface that the node.js implementation does.  Rather, it merely spits out a json string based on the values in the GET request issued by a/the client.  
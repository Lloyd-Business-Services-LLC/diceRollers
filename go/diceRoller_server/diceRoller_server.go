package diceroller_server

import (
	"crypto/rand"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/justinas/alice"
	"github.com/justinas/nosurf"
)

func getQuery(request *http.Request) (string, string) {
	u := request.URL
	m, _ := url.ParseQuery(u.RawQuery)
	n := ""
	ns := ""
	if m.Has("num") && m.Has("nsides") {
		n = m["num"][0]
		ns = m["nsides"][0]
	} else {
		n = "null"
		ns = "null"
	}
	return n, ns
}

func getDiceRoll(num string, nsides string) string {
	n, err := strconv.Atoi(num)
	if err != nil {
		fmt.Println("diceRoller server: Type conversion (Atoi): error")
	}
	ns := new(big.Int)
	ns, ok := ns.SetString(nsides, 10)
	if !ok {
		fmt.Println("diceRoller server: SetString: error")
	}
	s := ""
	for i := 0; i < n; i++ {
		rn, err := rand.Int(rand.Reader, (ns))
		if err != nil {
			fmt.Printf("diceRoller server: RNG error:%s\n", err)
		}
		rnStr := rn.String()
		rnsInt, err := strconv.Atoi(rnStr)
		if err != nil {
			panic(err)
		}
		rnsInt = rnsInt + 1
		s += strconv.Itoa(rnsInt)
		s += ","

	}
	s = strings.TrimSuffix(s, ",")
	s = "[" + s + "]"
	return s
}

func diceRollerHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		n, ns := getQuery(r)
		if n == "null" || ns == "null" {
			w.Write([]byte("400"))
		} else {
			dr := getDiceRoll(n, ns)
			jsonStr, err := json.Marshal(dr)
			if err != nil {
				panic(err)
			}
			w.Write([]byte(jsonStr))
			fmt.Printf("diceRoller server: Serving dice roll to client %s\n", r.RemoteAddr)
		}
	}

	return http.HandlerFunc(fn)
}

func timeoutHandler(h http.Handler) http.Handler {
	return http.TimeoutHandler(h, 1*time.Second, "diceRoller server: Timed out")
}

func final(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("421"))
}

func main() {
	// we define the default port and commandline flag
	portInt := flag.Int("port", 8001, "port number")
	flag.Parse()
	portStr := strconv.Itoa(*portInt)
	// we create a request multiplexer
	mux := http.NewServeMux()
	// we assign our route handler functions to the multiplexer
	dr := diceRollerHandler()
	mux.Handle("/diceRoller", dr)
	finalhandler := http.HandlerFunc(final)
	// for our document root, we run a chain of middleware via Alice
	mux.Handle("/", alice.New(timeoutHandler, nosurf.NewPure).Then(finalhandler))
	//console output
	log.Print("diceRoller server: Listening on :" + portStr)
	// our http server begins listening at the port defined above
	// it will serve the multiplexed handlers
	err := http.ListenAndServe(":"+portStr, mux)
	log.Fatal(err)
}

package diceroller_client

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	// we define the default port and other commandline flags
	hostStr := flag.String("host", "localhost", "host address")
	portInt := flag.Int("port", 8001, "port number")
	numStr := flag.String("number", "10", "number of dice")
	nSideStr := flag.String("numsides", "6", "number of sides per die")
	flag.Parse()
	//portStr := strconv.Itoa(*portInt)

	reqURL := fmt.Sprintf("http://%s:%d/diceRoller?num=%s&nsides=%s", *hostStr, *portInt, *numStr, *nSideStr)
	fmt.Println("diceRoller client: Connecting to diceRoller server...")
	req, err := http.NewRequest(http.MethodGet, reqURL, nil)
	if err != nil {
		fmt.Printf("diceRoller client: Could not create request %s\n", err)
		os.Exit(1)
	}

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("diceRoller client: Error making http request: %s\n", err)
		os.Exit(1)
	}

	fmt.Printf("diceRoller client: Got response\n")
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("diceRoller client: Could not read response body: %s\n", err)
		os.Exit(1)
	}
	resStr := string(resBody)
	resJson := ""
	json.Unmarshal([]byte(resStr), &resJson)
	if resStr == "421" {
		fmt.Printf("diceRoller client: Improper address request: %s\n", resStr)
		fmt.Printf("diceRoller client: Please try again...")
		os.Exit(1)
	}
	fmt.Printf("diceRoller client: Status code %d\n", res.StatusCode)
	fmt.Printf("diceRoller client: Your dice roll: %s\n", resJson)

}

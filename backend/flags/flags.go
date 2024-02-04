package flags

import "flag"

func GetAll() (int, string, string) {
	port := flag.Int("port", 0, "http/https port")
	cert := flag.String("cert", "", "certificate file")
	key := flag.String("key", "", "certificate key file")

	flag.Parse()

	return *port, *cert, *key
}

dev:
	clear && gow -s -v run cmd/main.go --port 8000

build:
	go build -o bin/app cmd/main.go

run: build
	./bin/app --port 8000

flags = --port 8000

dev:
	clear && gow -s -v run cmd/main.go $(flags)

build:
	go build -o bin/app cmd/main.go

run: build
	./bin/app $(flags)

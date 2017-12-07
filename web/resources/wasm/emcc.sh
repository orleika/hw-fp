#!/bin/sh
set -eu
docker run --rm -t -v "$(pwd)":/src apiaryio/emcc emcc $1 -s WASM=1 -o hello.html

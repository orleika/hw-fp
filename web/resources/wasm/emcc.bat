@echo off
docker run --rm -t -v %~dp0:/src apiaryio/emcc emcc %1 -s WASM=1 -o hello.html

#!/bin/bash
docker build -t tojs . && docker run -it -v "$(pwd):/out" tojs

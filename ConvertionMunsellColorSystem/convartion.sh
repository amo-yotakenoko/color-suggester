#!/bin/bash
docker build -t tojs .
docker --it run $(pwd):/code tojs

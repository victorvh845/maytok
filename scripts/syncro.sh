#!/usr/bin/env bash

git stash
git pull origin master
composer update --prefer-dist --optimize-autoloader -vv
./scripts/limpiar

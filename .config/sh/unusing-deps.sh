#!/usr/bin/env bash

DEPS=$(yarn knip --no-exit-code --dependencies | ggrep -oP '.*(?=(\s*package\.json))' | sed 's/ //g' | tr '\n' ' ')

echo $DEPS
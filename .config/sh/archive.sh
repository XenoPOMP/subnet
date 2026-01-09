#!/usr/bin/env bash

ACTION=$1
FILE=$2

if [ -z $ACTION ]; then
  echo "Action is not selected!"
  exit 1
fi

if [ -z $FILE ]; then
  echo "File is not defined!"
  exit 1
fi

mkdir -p ./.config/archive/$(dirname "$FILE")

case "$ACTION" in
  archive)
    if [ ! -f "$FILE" ]; then
      echo "File does not exist!"
      exit 1
    fi

    echo "🏛️ Archiving file: $(basename "$FILE")"
    cp $FILE ./.config/archive/$FILE
    echo "✅ Successfully archived file: $(basename "$FILE")"
    exit 0
    ;;

  restore)

    ;;
  *)
    echo This command is not allowed.
    echo Allowed options:
    echo - archive
    echo - restore
    echo - list
    exit 1
    ;;
esac

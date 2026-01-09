#!/usr/bin/env bash

ACTION=$1
FILE=$2

if [ -z $ACTION ]; then
  echo "Action is not selected!"
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
      if [ ! -f "./.config/archive/$FILE" ]; then
        echo "File is not archived!"
        exit 1
      fi

      echo "🏛️ Restoring file: $(basename "$FILE")"
        cp ./.config/archive/$FILE $FILE
        echo "✅ Successfully restored file: $(basename "$FILE")"
      exit 0
    ;;

  list)
    find ./.config/archive -type f
    exit 0
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

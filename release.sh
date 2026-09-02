#!/bin/bash
set -e

IMAGE=$(cat package.json | jq '.name' -r)
VERSION=$(cat package.json | jq '.version' -r)

RELEASE_DIR="$(pwd)/release/subnet"

if [ ! -d "$RELEASE_DIR" ]; then
  echo "Output folder not found. Seems like script is being called from wrong dir."
  exit 1
fi

# ===================================
echo "Starting build sequence for image $IMAGE:$VERSION"

# ===================================
if [[ ! "$(ls $RELEASE_DIR/images)" == "" ]]; then
  echo "Clearing images output folder at $RELEASE_DIR"
  rm -f $RELEASE_DIR/images/*
fi

# ===================================
docker buildx build \
  --platform linux/amd64 \
  -t $IMAGE:$VERSION \
  .

# ===================================
echo "Archiving image into .tar file"
docker save --platform linux/amd64 \
  -o $RELEASE_DIR/images/$IMAGE:$VERSION.tar $IMAGE:$VERSION

echo "Normalizing image names"
for image in $(find $RELEASE_DIR/images -type f -name "*.tar"); do
  new_filename=$(echo "$image" | sed 's/:/_/g')
  mv "$image" "$new_filename"
  echo "- Normalized: $(basename $image) -> $(basename $new_filename)"
done
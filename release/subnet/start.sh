#!/bin/bash

compose() {
  docker-compose -p "subnet-app" $@
}

load_tar() {
  PATTERN="$1"
  TAG=$(find ./images -type f -name "$PATTERN" | sed 's#./images/##g')
  docker load -i ./images/$TAG > /dev/null 2>&1
  FORMATTED_TAG=$(echo "$TAG" | sed 's/.tar//g' | sed 's/_/:/g')
  echo "$FORMATTED_TAG"
}

echo "Останавливаю приложение"
compose down

echo "Удаляю старые образы приложения"
for image in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep subnet); do
  docker rmi $image
done
docker image prune

echo "Загружаю образ фронта"
FRONT_IMAGE_TAG=$(load_tar "subnet_*.tar")

echo "Записываю данные в .env"
if [[ -f .env ]]; then
  rm -f .env
fi
touch .env
echo "FRONT_IMAGE_TAG=$FRONT_IMAGE_TAG" >> .env

echo "Запускаю проект \"subnet-app\""
compose up -d
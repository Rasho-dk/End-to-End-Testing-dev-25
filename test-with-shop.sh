#!/bin/bash

wait_for_healthy() {
    while true; do
        status=$(docker inspect --format='{{json .State.Health.Status}}' js_webshop)
        if [ "$status" == "\"healthy\"" ]; then
            break
        fi
        sleep 2
    done
}

# Start js_webshop in detached mode
docker-compose up --build -d

echo "Waiting for js_webshop to be healthy..."
wait_for_healthy

echo "js_webshop is healthy. Running tests..."
dotnet test SeleniumTestC-sharp

# rebuild and restart, then wait again if needed
docker-compose up --build -d
echo "Waiting for js_webshop to be healthy again..."
wait_for_healthy

(cd cypress_tst && npm install && npm run e2e:chrome)

docker-compose down
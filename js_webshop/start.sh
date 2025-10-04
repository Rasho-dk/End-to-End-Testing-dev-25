#!/bin/sh
# filepath: c:\Users\shero\source\repos\End-to-End-Testing-dev-25\js_webshop\start.sh
# Start nginx in the background
nginx -g "daemon off;" &
# Start json-server
json-server --watch /data/users.json --host 0.0.0.0 --port 3000
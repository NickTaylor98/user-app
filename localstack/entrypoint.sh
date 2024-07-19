#!/bin/bash

# Start LocalStack in the background
docker-entrypoint.sh &

# Run the custom script
/usr/local/bin/localstack.sh

# Keep the container running
tail -f /dev/null
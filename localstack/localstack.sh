#!/bin/bash

# Function to extract a property from a JSON object
extract_prop() {
  local jsonObject="$1"
  local propertyName="$2"

  # Use jq to extract the property
  echo "$jsonObject" | jq -r ".$propertyName"
}

# Create an SNS topic
topic_arn=$(awslocal sns create-topic --name user-events-topic --output json)
topic_arn=$(extract_prop "$topic_arn" "TopicArn")
echo "Topic ARN: $topic_arn"

# Create an SQS queue
queue_url=$(awslocal sqs create-queue --queue-name user-events-queue --output json)
queue_url=$(extract_prop "$queue_url" "QueueUrl")
echo "Queue URL: $queue_url"

# Get queue attributes
queue_attributes=$(awslocal sqs get-queue-attributes --queue-url "$queue_url" --attribute-names All --output json)
queue_attributes=$(extract_prop "$queue_attributes" "Attributes")

# Extract queue ARN
queue_arn=$(echo "$queue_attributes" | jq -r '.QueueArn')
echo "Queue ARN: $queue_arn"

# Subscribe the SNS topic to the SQS queue
awslocal sns subscribe --topic-arn "$topic_arn" --protocol sqs --notification-endpoint "$queue_arn"
function ExtractProp {
    param (
        $jsonObject,
        $propertyName
    )

    $jsonObject | ConvertFrom-Json | Select-Object -ExpandProperty $propertyName
}

$topicArn = awslocal sns create-topic --name user-events-topic
$topicArn = ExtractProp $topicArn 'TopicArn'
echo $topicArn

$queueUrl = awslocal sqs create-queue --queue-name user-events-queue
$queueUrl = ExtractProp $queueUrl 'QueueUrl'
echo $queueUrl

$queueAttributes = awslocal sqs get-queue-attributes --queue-url $queueUrl --attribute-names All
$queueAttributes  = ExtractProp $queueAttributes 'Attributes'

$queueArn = $queueAttributes.QueueArn
echo $queueArn

awslocal sns subscribe --topic-arn $topicArn --protocol sqs --notification-endpoint $queueArn

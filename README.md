Test app with usage of NestJS, PostgreSQL and LocalStack services (SNS, SQS)

For startup you need to do following steps:

1. open `infrastrusture` folder
2. [install Docker and Docker-Compose](https://docs.docker.com/engine/install/)
3. run `./make-env.ps1` (on Windows) - script for inserting `.env` files based on `.env.example`
4. run `docker-compose up -d --build` - for launching whole app

## Swagger

open URL: <http://localhost:3000/api>

## Authentication

user these credentials to get auth token
email: `example@example.com`
password: `Test1234!`
API request: <http://localhost:3000/api#/Auth%20API/AuthController_signIn>

## Troubleshooting

1. In case of troubles with execution of script in step 2, it is useful to run `Set-ExecutionPolicy RemoteSigned` and then try again step 2

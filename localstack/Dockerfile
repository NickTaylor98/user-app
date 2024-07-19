FROM localstack/localstack:3.5.0

RUN apt-get install jq -y

COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
COPY ./localstack.sh /usr/local/bin/localstack.sh

RUN chmod +x /usr/local/bin/localstack.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
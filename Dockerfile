FROM mhart/alpine-node:5.5
MAINTAINER José Padilla <hello@jpadilla.com>

WORKDIR /src
ADD . .

RUN apk add --update python build-base && \
  npm install && \
  apk del python build-base && \
  rm -rf /var/cache/apk/*

CMD ["node", "server.js"]

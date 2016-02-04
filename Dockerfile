FROM mhart/alpine-node:5.5
MAINTAINER José Padilla <hello@jpadilla.com>

# Dependencies for contextify
RUN apk add --update \
    python \
    build-base \
  && rm -rf /var/cache/apk/*

WORKDIR /src
ADD . .

RUN npm install

CMD ["node", "server.js"]

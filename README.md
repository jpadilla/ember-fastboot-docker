# ember-fastboot-docker

Dockerized Node.js server for running Ember FastBoot apps. Based on [Ember FastBoot for AWS Elastic Beanstalk](https://github.com/tomdale/ember-fastboot-elastic-beanstalk) by [@tomdale](https://github.com/tomdale).

## Usage

```
$ docker run \
  --rm -it \
  -p 8080:3000 \
  -v $(pwd)/fastboot-dist:/src/fastboot-dist \
  jpadilla/ember-fastboot-server
```

#### Environment variables

For basic auth support specify `FASTBOOT_USERNAME` and `FASTBOOT_PASSWORD` environment variables when running.

Default port is `3000`. To override specify a different `PORT` environment variable when running.

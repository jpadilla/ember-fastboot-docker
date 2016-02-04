# ember-fastboot-docker

Dockerized Node.js server for running Ember FastBoot apps. Based on [Ember FastBoot for AWS Elastic Beanstalk](https://github.com/tomdale/ember-fastboot-elastic-beanstalk) by [@tomdale](https://github.com/tomdale).

## Usage

### Building

```
$ docker build -t ember-fastboot-docker .
```

### Running

```
$ docker run \
  --rm -it \
  -e "PORT=3000" \
  -p 3000:3000 \
  -v ${pwd}/fastboot-dist:/src/fastboot-dist \
  ember-fastboot-docker
```

#### Environment variables

For basic auth support specify `FASTBOOT_USERNAME` and `FASTBOOT_PASSWORD` environment variables when running.

Default port is `3000`. To override specify a different `PORT` environment variable when running.

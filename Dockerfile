FROM node:6.2

MAINTAINER Mark Shlick <markshlick@gmail.com>

# hack
# cache node_modules for speedier builds
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
WORKDIR /src

ADD package.json /src/package.json

EXPOSE 8888

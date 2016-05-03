FROM node:4.4.3

RUN mkdir /code
WORKDIR /code
ADD . /code/

RUN npm install

EXPOSE 8080
VOLUME /code

CMD ["npm", "start"]

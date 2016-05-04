FROM node:4.4.3
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm install
ENV HOST 0.0.0.0
ENV PORT 8000
EXPOSE 8000
CMD ["npm", "start"]

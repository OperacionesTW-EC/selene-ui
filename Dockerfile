FROM node:4.4.3
RUN mkdir /ui
WORKDIR /ui
ADD . /ui/
RUN npm install
CMD ["npm", "start"]

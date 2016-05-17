FROM node:4.4.4
RUN mkdir /ui
WORKDIR /ui
ADD . /ui/
RUN npm install
CMD ["npm", "run", "build"]

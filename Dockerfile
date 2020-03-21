FROM node:12 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./

EXPOSE 60
CMD ["npm", "start"]
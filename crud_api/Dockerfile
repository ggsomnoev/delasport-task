FROM node:22.13.1

WORKDIR /crud_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
ENTRYPOINT ["./docker/entrypoint.sh"]
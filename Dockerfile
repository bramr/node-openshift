FROM node:10-alpine
COPY serve.js ./
EXPOSE 3000
CMD [ "node", "serve.js"]

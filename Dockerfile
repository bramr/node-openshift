FROM node:10
COPY serve.js ./
EXPOSE 3000
CMD [ "node", "serve.js"]

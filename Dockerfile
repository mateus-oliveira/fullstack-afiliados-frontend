# Node.js v16
FROM node:16

# work directory
WORKDIR /app

COPY afiliados/ .

# Listen 3000 port
EXPOSE 3000

# Building project
RUN npm install
RUN npm run build

# Start application
CMD ["npm", "start"]

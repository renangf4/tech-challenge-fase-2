FROM node:18

# Diretório de trabalho
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3002

CMD ["npm", "start"] 
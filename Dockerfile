# Dockerfile para Node.js
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia o restante do código
COPY . .

# Expõe a porta (padrão do projeto)
EXPOSE 3002

# Comando para iniciar a aplicação
CMD ["npm", "start"] 
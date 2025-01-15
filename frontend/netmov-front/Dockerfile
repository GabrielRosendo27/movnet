# Etapa de construção
FROM node:18 AS build

WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências do frontend
RUN npm install

# Copiar o restante dos arquivos do frontend
COPY . ./

# Rodar o build de produção
RUN npm run build

# Etapa de produção (serve)
FROM nginx:alpine

# Copiar o build de produção do frontend para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]

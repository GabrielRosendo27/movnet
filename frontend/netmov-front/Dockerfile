# Etapa de construção
FROM node:22.13-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Etapa de produção
FROM nginx:1.25-alpine
RUN apk add --no-cache certbot openssl && \
    mkdir -p /etc/letsencrypt && \
    chmod -R 755 /etc/letsencrypt
    
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
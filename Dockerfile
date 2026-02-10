# ====== stage 1: build ======
FROM node:20-slim AS build
WORKDIR /app

# instala deps
COPY package.json package-lock.json* ./
RUN npm ci

# copia o código
COPY . .

# build (gera /app/dist)
RUN npm run build

# ====== stage 2: serve ======
FROM nginx:alpine

# SPA fallback (React Router / Vite SPA)
RUN rm -f /etc/nginx/conf.d/default.conf && \
  printf 'server {\n\
  listen 8080;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

# copia o build pronto
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

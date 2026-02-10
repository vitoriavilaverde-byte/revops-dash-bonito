# ---------- Build stage ----------
FROM node:20-slim AS build
WORKDIR /app

# Instala deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copia código e builda
COPY . .
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:alpine

# SPA fallback + porta do Cloud Run
RUN printf 'server {\n\
  listen 8080;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine as build

WORKDIR /app


ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install static server
RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]



# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

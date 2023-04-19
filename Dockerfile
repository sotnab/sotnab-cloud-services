FROM node:18-alpine

WORKDIR /app

COPY backend/package.json backend/
COPY frontend/package.json frontend/

WORKDIR /app/backend
RUN npm install

WORKDIR /app/frontend
RUN npm install

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN npm run build

EXPOSE 20177

WORKDIR /app/backend
CMD ["npm", "start"]
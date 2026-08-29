FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "PORT=${PORT:-3000} npm start"]
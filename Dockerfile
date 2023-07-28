ARG CLIENTID
ARG GUILDID
ARG TOKEN
ARG API_KEY_YOUTUBE
ARG API_KEY_GIPHY
ARG ENVIRONMENT
ARG NIXPACKS_NODE_VERSION

#? stage fot install dependecies for the app
FROM node:18-alpine3.16 AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production
# or RUN npm ci

#? stage for run the app
FROM node:18-alpine3.16 AS runner
WORKDIR /app

#* redefine ARG
ARG CLIENTID
ARG GUILDID
ARG TOKEN
ARG API_KEY_YOUTUBE
ARG API_KEY_GIPHY
ARG ENVIRONMENT
ARG NIXPACKS_NODE_VERSION

# DEFINE ENVIRONMENT VARIABLES
ENV clientId=$CLIENTID
ENV guildId=$GUILDID
ENV token=$TOKEN
ENV api_key_youtube=$API_KEY_YOUTUBE
ENV api_key_giphy=$API_KEY_GIPHY
ENV environment=$ENVIRONMENT
ENV NIXPACKS_NODE_VERSION=$NIXPACKS_NODE_VERSION

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

USER api

CMD ["npm", "start"]
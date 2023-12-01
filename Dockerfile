ARG NODE_ENV
FROM mcr.microsoft.com/playwright:v1.40.1-jammy

RUN apt-get update && apt-get install -y curl
RUN npm install -g modclean

WORKDIR /app

COPY ["package*.json", "./"]
RUN npm ci

# Install Playwright dependencies (browser binaries)
RUN npx playwright install

# Cleanup
RUN modclean -r
RUN npm uninstall modclean
RUN npm cache clean --force
RUN rm -rf /usr/local/lib/node_modules/modclean
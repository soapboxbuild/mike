FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ARG MIKE_GIT_REF=main
RUN git clone --depth 1 --branch ${MIKE_GIT_REF} https://github.com/willchen96/mike.git /tmp/mike

WORKDIR /app
RUN cp -r /tmp/mike/backend/. . && rm -rf /tmp/mike

RUN npm install
RUN npm run build

FROM node:22-bookworm-slim

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3001
CMD ["node", "dist/index.js"]

FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ARG MIKE_GIT_REF=main
RUN git clone --depth 1 --branch ${MIKE_GIT_REF} https://github.com/willchen96/mike.git /tmp/mike

WORKDIR /app
RUN cp -r /tmp/mike/backend/. . && rm -rf /tmp/mike

# Default to Claude Opus (Anthropic) instead of Gemini
COPY patch_mike.mjs /tmp/patch_mike.mjs
COPY patch_resend.mjs /tmp/patch_resend.mjs
RUN sed -i 's/"gemini-3-flash-preview"/"claude-opus-4-8"/g' src/lib/llm/models.ts \
 && sed -i 's/"gemini-3.1-flash-lite-preview"/"claude-haiku-4-5"/g' src/lib/llm/models.ts \
 && node /tmp/patch_mike.mjs \
 && node /tmp/patch_resend.mjs

RUN npm install
RUN npm run build

FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app .
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3001
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "dist/index.js"]

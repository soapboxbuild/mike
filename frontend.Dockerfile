FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ARG MIKE_GIT_REF=main
RUN git clone --depth 1 --branch ${MIKE_GIT_REF} https://github.com/willchen96/mike.git /tmp/mike

WORKDIR /app
RUN cp -r /tmp/mike/frontend/. . && rm -rf /tmp/mike

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
ARG NEXT_PUBLIC_API_BASE_URL

RUN npm install
RUN npm run build

FROM node:22-bookworm-slim

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["sh", "-c", "npx next start -H 0.0.0.0 -p ${PORT:-3000}"]

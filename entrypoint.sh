#!/bin/bash
set -e

if [ -n "$DATABASE_URL" ] && [ -f "/app/migrations/000_one_shot_schema.sql" ]; then
    echo "Mike: Waiting for auth schema (GoTrue) to be ready..."
    for i in $(seq 1 30); do
        if psql "$DATABASE_URL" -tAc "SELECT EXISTS (SELECT FROM information_schema.schemata WHERE schema_name = 'auth')" 2>/dev/null | grep -q "t"; then
            echo "Mike: Auth schema found."
            break
        fi
        echo "Mike: Auth schema not ready, retrying in 5s ($i/30)..."
        sleep 5
    done

    TABLE_EXISTS=$(psql "$DATABASE_URL" -tAc \
        "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_profiles')" \
        2>/dev/null || echo "false")

    if [ "$TABLE_EXISTS" = "f" ] || [ "$TABLE_EXISTS" = "false" ]; then
        echo "Mike: Running application schema migration..."
        psql "$DATABASE_URL" -f /app/migrations/000_one_shot_schema.sql
        echo "Mike: Schema migration complete."
    else
        echo "Mike: App schema already initialized."
    fi
fi

exec "$@"

FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@11.9.0 --activate

WORKDIR /app


FROM base AS pruner

COPY . .

RUN pnpm dlx turbo@2.9.18 prune @notas-universitarias/api --docker


FROM base AS builder

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

COPY tsconfig.base.json ./tsconfig.base.json

RUN pnpm --filter=@notas-universitarias/api build


FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3035

CMD ["pnpm", "--filter=@notas-universitarias/api", "start"]
# nextjs-auth

Simple example website with connection to PostgreSQL Database for user login/register server account authentication.

* Using [Next.js](https://nextjs.org/docs) framework with App Router ( /app )
* Build by [pnpm](https://pnpm.io/) package manager

## At first run:
Create new ``.env`` file and fill it in according to [example template](./example.env).

Install all packages and required dependencies:
```
pnpm install
```

migrate prisma database:
```
pnpm exec prisma migrate dev
```

generate new prisma client:
```
pnpm exec prisma generate
```

run whole project as dev:
```
pnpm dev
```

in every change in database and prisma scheme run:
```
pnpm exec prisma db push
```
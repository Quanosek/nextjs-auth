<h1>nextjs-auth</h1>

###

<div>
  <img src="https://skillicons.dev/icons?i=react" height="45" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="45" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="45" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nextjs" height="45" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=sass" height="45" alt="sass logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=prisma" height="45" alt="prisma logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgres" height="45" alt="postgresql logo"  />
</div>

###

<p>Fullstack blog application created using Next.js v14 framework with connection to PostgreSQL Database using Prisma for user login/register server account authentication.</p>

###

<div>
  <img width="100%" src="./screenshot.webp"  />
</div>

###

- Using [Next.js](https://nextjs.org/docs) framework with App Router ( /app )
- Build by [pnpm](https://pnpm.io/) package manager

###

## At first run:

Create new `.env` file and fill it in according to [example template](./example.env).

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

## Features:

- dynamically updating database content in real time
- register and login forms with client and server validation
- toast responsive prompts
- adding, editing and deleting posts on blog page with saving to database
- dedicated profile page for changing password, deleting account or log out from session
- view of all of user posts and comments

## Support:
<a href="https://ko-fi.com/quanosek">
    <img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="quanosek" />
</a>

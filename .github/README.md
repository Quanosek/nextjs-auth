<h1>nextjs-auth</h1>

<div>
  <img alt="react" src="https://skillicons.dev/icons?i=react" height="45" />
  <img width="10" />
  <img alt="typescript" src="https://skillicons.dev/icons?i=ts" height="45" />
  <img width="10" />
  <img alt="nodejs" src="https://skillicons.dev/icons?i=nodejs" height="45" />
  <img width="10" />
  <img alt="nextjs" src="https://skillicons.dev/icons?i=nextjs" height="45" />
  <img width="10" />
  <img alt="sass" src="https://skillicons.dev/icons?i=sass" height="45" />
  <img width="10" />
  <img alt="prisma" src="https://skillicons.dev/icons?i=prisma" height="45" />
  <img width="10" />
  <img alt="postgresql" src="https://skillicons.dev/icons?i=postgres" height="45" />
</div>

<br />

<div>
  <p>Fullstack blog application created using Next.js v14 framework with connection to PostgreSQL Database using Prisma for user login/register server account authentication.</p>

  <ul>
    <li>Using <a href="https://nextjs.org/docs">Next.js</a> framework with App Router ( /app )</li>
    <li>Build by <a href="https://pnpm.io/">pnpm</a> package manager</li>
  </ul>
</div>

<br />

<img width="100%" src="./screenshot.webp" />

<h2>At first run:</h2>

Create new `.env` file and fill it in according to [example template](./example.env).

<br />

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

<h2>Features:</h2>

<ul>
  <li>dynamically updating database content in real time</li>
  <li>register and login forms with client and server validation</li>
  <li>toast responsive prompts</li>
  <li>adding, editing and deleting posts on blog page with saving to database</li>
  <li>dedicated profile page for changing password, deleting account or log out from session</li>
  <li>view of all of user posts and comments</li>
</ul>

<h2>Support:</h2>

<a href="https://ko-fi.com/quanosek">
  <img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="quanosek" />
</a>

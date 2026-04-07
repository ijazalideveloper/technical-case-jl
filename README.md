# NewsHub

**Live demo:** https://technical-case-kappa.vercel.app/

## Demo credentials

| Field | Value |
|---|---|
| Email | `admin@newshub.com` |
| Password | `password123` |

News website built with Nuxt 4, TypeScript, and SCSS. Articles come from [NewsData.io](https://newsdata.io), pagination uses their cursor token system.

## Requirements

- Node.js 20+
- A NewsData.io API key — free tier is enough

## Getting started

```bash
npm install
cp .env.example .env
```

Edit `.env` and fill in the required values:

| Variable | Value | Notes |
|---|---|---|
| `NUXT_NEWS_API_KEY` | your NewsData.io API key | Get one at [newsdata.io](https://newsdata.io) |
| `NUXT_NEWS_API_BASE_URL` | `https://newsdata.io/api/1/latest` | Fixed — do not change |
| `NUXT_AUTH_EMAIL` | any email | Used for local auth |
| `NUXT_AUTH_PASSWORD` | any password | Used for local auth |
| `NUXT_AUTH_NAME` | any name | Display name for the admin user |

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

| | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run preview` | preview production build |
| `npm run generate` | static generation |

## Structure

```
app/
├── assets/styles/       global styles
├── components/          AppNavbar, ArticleCard, ThePagination
├── composables/         useNewsApi.ts
├── layouts/             default.vue
├── pages/               index.vue, news/[id].vue
└── types/               news.ts
```

## Notes

- NewsData.io paginates with a cursor token (`nextPage`), not page numbers. Navigation history is kept in memory and resets on refresh.
- On the free tier, `content`, `sentiment`, and `ai_*` fields are unavailable. The detail page only shows `title`, `description`, and `image_url`.
- The API key ends up in the client bundle via `runtimeConfig.public`. Fine for development; in production it should go through a server route.

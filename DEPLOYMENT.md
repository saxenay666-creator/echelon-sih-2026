# ECHELON deployment

## Supabase

Set these Vercel environment variables for Production/Preview/Development:

- `VITE_SUPABASE_URL=https://bvicvoseefuhcctktmby.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY=<your publishable key>`

Do not add a Supabase secret/service-role key to Vite or any browser-exposed variable.

## Vercel

Import this GitHub repository into Vercel. The repository contains `vercel.json`, which builds with `npm run build` and serves `dist` as a Vite SPA.

## Auth

Supabase Auth must have the deployed site URL in Authentication > URL Configuration > Redirect URLs if email/OAuth redirects are enabled.

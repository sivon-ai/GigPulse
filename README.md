# GigPulse

Modern React + Tailwind frontend for a freelancer marketplace and market-demand analytics platform.

## Production Notes

- Login and registration use JWT access tokens plus an HttpOnly refresh cookie.
- Hosted deployments must run over HTTPS so secure cookies are accepted by the browser.
- Set `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS` for the hosted domain.
- Provide a strong `DJANGO_SECRET_KEY`, `DATABASE_URL`, and `REDIS_URL` in the deployment environment.

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.

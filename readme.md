# Mohd Ali Tahir Portfolio

Personal 3D portfolio website source.

Update contact settings with environment variables:

- `RESEND_API_KEY` for Resend API authentication
- `RESEND_FROM_EMAIL` for sender identity (must be valid for your Resend account/domain)
- `FOLIO_TO_EMAILS` for one or more recipient emails (comma-separated)

<br>

To setup a dev environment:

```bash
# Clone the repository

# Install dependencies 
npm i

# Run the local dev server
npm run dev
```

To serve a production build:

```bash
# Install dependencies if not already done - 'npi i'

# Build for production
npm run build

# Serve the build using express
npm start
```

## Deploy (Render)

This repo includes `render.yaml` for one-click deployment on Render.

1. Push this project to GitHub.
2. In Render, create a new `Blueprint` and select this repo.
3. Set secret env vars in Render:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (example: `Portfolio Contact <onboarding@resend.dev>`)
   - `FOLIO_TO_EMAILS` (example: `mohdalitahir0@gmail.com`)
4. Deploy.

Render will run:
- Build: `npm install && npm run build`
- Start: `npm start`

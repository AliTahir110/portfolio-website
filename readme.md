# Mohd Ali Tahir Portfolio

Personal 3D portfolio website source.

Update contact settings with environment variables:

- `FOLIO_EMAIL` for SMTP auth/sender email
- `FOLIO_PASSWORD` for SMTP auth password
- `FOLIO_TO_EMAILS` for one or more recipient emails (comma-separated). If omitted, `FOLIO_EMAIL` is used.

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
   - `FOLIO_EMAIL` (Gmail address)
   - `FOLIO_PASSWORD` (Gmail App Password)
4. Deploy.

Render will run:
- Build: `npm install && npm run build`
- Start: `npm start`

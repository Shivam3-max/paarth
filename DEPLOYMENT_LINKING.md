# Paarth + Disha Deployment Linking

Deploy these as two separate apps under the same domain family.

## Recommended domains

- Paarth main site: `https://your-domain.com`
- Disha app: `https://disha.your-domain.com`

## Paarth environment

Set this in the Paarth/Vite deployment:

```env
VITE_DISHA_URL=https://disha.your-domain.com
VITE_APPLICATION_API_URL=https://your-domain.com/send-mail.php
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
APPLICATION_MAIL_TO=admissions@your-domain.com
APPLICATION_MAIL_FROM=Paarth Applications <applications@your-domain.com>
```

Paarth uses this value for the Disha links in the navigation and footer. Locally it falls back to:

```txt
http://127.0.0.1:3464
```

The `RESEND_API_KEY`, `APPLICATION_MAIL_TO`, and `APPLICATION_MAIL_FROM` values power the `/api/apply` application email endpoint.

If Paarth is deployed on Hostinger, the easiest same-project setup is to upload the generated site together with `send-mail.php`. The frontend will post to `/send-mail.php` by default.

For the PHP handler, configure these server environment values if Hostinger allows them:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
APPLICATION_MAIL_TO=admissions@your-domain.com
APPLICATION_MAIL_FROM=Paarth Applications <onboarding@resend.dev>
APPLICATION_ALLOWED_ORIGIN=https://your-domain.com
```

`send-mail.php` calls the Resend API server-side, so the browser never sees your API key.

If your Hostinger plan does not expose environment variables for PHP, `send-mail.php` will also look for a `.env` file in the project root first, then beside the script. Keep that `.env` outside the public web root if possible. The included `.htaccess` blocks direct access to dotfiles on Apache-based hosting.

Use a verified Resend sender in `APPLICATION_MAIL_FROM`.

## Disha environment

Set this in the Disha/Next deployment:

```env
NEXT_PUBLIC_PAARTH_URL=https://your-domain.com
```

Disha uses this value for the Paarth links in its navigation and footer. Locally it falls back to:

```txt
http://127.0.0.1:3690
```

## DNS

Create a DNS record for the Disha subdomain pointing to the Disha deployment target:

```txt
disha.your-domain.com -> Disha hosting target
```

Keep the apex/root domain pointing to the Paarth deployment target.

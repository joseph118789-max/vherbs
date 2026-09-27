# VHerbs — deployment guide

Containerized deployment for the VHerbs static site using nginx.

## Files

```
Dockerfile        Multi-stage not needed — nginx:alpine serves the static site
nginx.conf        Custom config: gzip, cache headers, security headers, port 8080
.dockerignore     Excludes dev cruft, screenshots, etc. from the build context
```

## Build

```bash
cd ~/projects/vherbs
docker build -t vherbs:latest .
```

Build context is just the site files (~1.4 MB). Final image is ~50 MB
(`nginx:1.27-alpine` base ≈ 40 MB + site files).

## Run

```bash
# Foreground (logs to stdout)
docker run --rm -p 8080:8080 --name vherbs vherbs:latest

# Background
docker run -d --restart=unless-stopped -p 8080:8080 --name vherbs vherbs:latest

# Custom port
docker run -d -p 9000:8080 --name vherbs vherbs:latest
```

Then open <http://localhost:8080>.

## Verify

```bash
# Healthcheck (matches Dockerfile HEALTHCHECK)
docker inspect --format='{{.State.Health.Status}}' vherbs
# expect: healthy

# Smoke-test the routes
for path in /index.html /about.html /facility.html /products.html /contact.html /assets/logos/vherbs-logo.png; do
  curl -sS -o /dev/null -w "HTTP %{http_code}  %{size_download}B  $path\n" http://localhost:8080$path
done
```

## Production checklist

- [ ] Replace placeholder phone/address in `contact.html`
- [ ] Fill in real product SKUs, weights, prices, MOQs in `products.html`
- [ ] Wire the contact form to a real backend (Formspree, Netlify Forms, or your own endpoint)
- [ ] `server_name vherbs.com.my www.vherbs.com.my;` is already set in `nginx.conf`
- [ ] Drop the brochure PDF into `assets/documents/` and link from the footer / About page
- [ ] If serving over HTTPS (recommended), add a `443 ssl` block with cert paths
- [ ] Tag the image with a version: `docker build -t vherbs:v1.0.0 .`

## Deploying to a registry

```bash
# Tag for your registry
docker tag vherbs:latest registry.example.com/vherbs:v1.0.0

# Push
docker push registry.example.com/vherbs:v1.0.0
```

## Image size optimization (current state)

- Base: `nginx:1.27-alpine` ≈ 40 MB
- Site files: ~1.4 MB
- **Total: ~50 MB**

No build tools or source maps needed — the site is plain HTML/CSS/JS, so
multi-stage builds would just add complexity without saving space.

## Why nginx on 8080?

- **Alpine base** — small, security-patched, well-known image
- **Port 8080** — unprivileged port works in restricted environments (k8s,
  ECS, rootless docker, OpenShift) without extra config. nginx is started
  as the `nginx` user via the base image's default entrypoint behavior.
- **Built-in healthcheck** — orchestrators can probe the homepage.
- **No build step** — every change is just rebuild + push.
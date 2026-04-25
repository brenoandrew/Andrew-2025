# Andrew Henrice

Personal website for Andrew Henrice, built with Astro, Solid, Svelte, and UnoCSS.

## Development

This project uses npm as its package manager. Use `package-lock.json` as the source of truth for installs.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run check
npm run build
```

## Photography

Trip photos belong in country folders inside `public/photos/trips/`. The gallery automatically renders `.jpg`, `.jpeg`, `.png`, `.webp`, and `.avif` files from those folders.

Example:

```text
public/photos/trips/korea/seoul-night.jpg
public/photos/trips/japan/tokyo-street.webp
public/photos/trips/thailand/bangkok-sunset.png
```

Optional metadata can be added in `src/lib/photography.ts` when a photo needs a custom title, alt text, dimensions, or featured status.

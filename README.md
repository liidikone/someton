# Leadikone – website

Pohja uudelle nettisivulle (Vite + React). Sisältää placeholder-versiot seuraavista sektioista:

- Navbar
- Hero (tausta: `public/leadikone-bg.avif`)
- Features
- About
- Pricing
- CTA

Fontti: [Oxanium](https://fonts.google.com/specimen/Oxanium) (ladataan `src/styles/globals.css`-tiedostossa).

## Kehitys paikallisesti

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Tuotos tulee `dist/`-kansioon.

## Vercel-deploy (GitHub)

1. Pushaa tämä projekti GitHub-repoon.
2. Mene [vercel.com](https://vercel.com) → **Add New Project** → tuo GitHub-repo.
3. Vercel tunnistaa automaattisesti Vite-projektin (`vercel.json` on mukana valmiina):
   - Build command: `npm run build`
   - Output directory: `dist`
4. Klikkaa **Deploy**.

## Huom

- Korvaa `public/leadikone-bg.avif` omalla hero-taustakuvalla (sama tiedostonimi, jos haluat säilyttää viittauksen).
- Kaikki tekstit ovat placeholdereita ("Heading goes here", "Button 1" jne.) – korvaa omalla sisällöllä.
- `public/favicon.png` on placeholder-favicon, vaihda omaan tarvittaessa.

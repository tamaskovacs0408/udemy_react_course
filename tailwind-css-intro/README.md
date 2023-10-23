# Tailwind CSS

[Guide az adott framewörkhöz, amivel használni szeretnénk](https://tailwindcss.com/docs/installation/framework-guides) (Vite a React-hoz)

## Installation (React CRA)

`npm install -D tailwindcss` - install tailwindcss
`npx tailwindcss init` - config fájl létrehozása

## Configure template paths

A `tailwind.config.js` alap beállításai React-hoz:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Tailwind CSS directives

Adjuk  akövetkezőket az *alap* `index.css` fájlhoz:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ezek utén el tudjuk kezdeni használni a TalwindCSS-t. Az adott JSX `className`-ébe írjuk a tailwind osztályokat (mint Bootstrap-nél).

## Customize TailwindCSS

Az *alap* index.css fájlba tudunk custom CSS-t írni (pl body, background image beállítás, stb), amiket a tailwind figyelembe vesz. Ha szeretnénk egyedi betűtípust használni, akkor ezt meg kell adnunk a `tailwind.config.js` theme -> extend részénél az alábbi módon:

```js
theme: {
    extend: {
      fontFamily: {
        title: ['"Pacifico"', 'cursive'],
      }
    },
  },
```

A fontFamily-n belüli `title` elnevezéssel tudunk majd hivatkozni a betütípusra a tailwind osztályban az alábbi módon: `className="font-title"`. Fontos, hogy a betűtípus nevét a dupla idézőjelek közé tegyük, amik pedig szimpla idézőjelek között vannak!

## MediaQueries & Pseudo selectors

[Responsive design](https://tailwindcss.com/docs/responsive-design)

[Pseudo selectors](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-classes)
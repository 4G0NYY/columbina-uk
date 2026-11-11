export default {
  plugins: {
    // Tailwind v4 ships its own PostCSS plugin; it also handles vendor
    // prefixing through Lightning CSS, so autoprefixer is gone.
    "@tailwindcss/postcss": {},
  },
};

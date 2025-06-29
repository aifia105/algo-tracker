/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: 'var(--primary)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        main: 'var(--text-main)',
        secondary: 'var(--text-secondary)',
        custom: 'var(--border)',
      },
    },
  },
  plugins: [],
}

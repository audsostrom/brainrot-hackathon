import type { Config } from "tailwindcss";

export default {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--dark-primary)",
        },
        // You can do the same for other colors if needed
        background: {
          DEFAULT: "var(--background)",
          dark: "var(--dark-background)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          dark: "var(--dark-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--dark-secondary)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
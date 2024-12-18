import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6d6afe", 
        red: "#ff5b56",    
        white: "#ffffff",  
        black: "#111322",  
        gray: {
          500: "#3e3e43",  
          400: "#9fa6b2",  
          300: "#ccd5e3",  
          200: "#e7effb",  
          100: "#f0f6ff",  
        },
      },
      screens: {
        xs: "390px", 
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
} satisfies Config;

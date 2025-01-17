import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          base: "#6A4CFF",
          "base-hover": "#5E44E2",

        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          base: '#1A1B27',
          'base-hover': '#14151E'
        },
        tertiary: '#FFD000',
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        express: "#F08524",
        "express-black": "#B16119",
        "express-extra-black": "#844811",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
				overlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				contentShow: {
					from: {
						opacity: "0",
						transform: "translate(-50%, -48%) scale(0.96)",
					},
					to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
				},
        pulse: {
          "0%": {
            transform: "scale(0.8)",
            boxShadow: "0 0 0 0 rgba(106, 76, 255, 1)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 60px rgba(106, 76, 255, 0)",
          },
          "100%": {
            transform: "transform: scale(0.8)",
          },
        },
        "skeletonPulse": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        }
			},
			animation: {
				overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        pulse: "pulse 2s infinite",
        "skeletonPulse": "skeletonPulse 1.5s ease-in-out infinite",
			},
      fontFamily: {
        'alex-brush': ['var(--font-alex-brush)', 'cursive'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

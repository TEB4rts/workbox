import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0A4D68",
          foreground: "#FFFFFF",
          dark: "#083F56",
        },
        secondary: {
          DEFAULT: "#64748B",
          foreground: "#FFFFFF",
          dark: "#4B5563",
        },
        accent: {
          DEFAULT: "#05BFDB",
          foreground: "#FFFFFF",
          dark: "#049DBB",
        },
        destructive: {
          DEFAULT: "#F43F5E",
          foreground: "#FFFFFF",
          dark: "#BE123C",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
          dark: "#1F2937",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
          dark: "#D97706",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0A4D68, #05BFDB)',
        'gradient-primary-dark': 'linear-gradient(to right, #083F56, #049DBB)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
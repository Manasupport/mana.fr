import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  // --- IMPORTANT : préserve les classes dynamiques venant du JSON (gradients) ---
  safelist: [
    // helpers de gradient
    "bg-gradient-to-br",
    "bg-gradient-to-r",

    // JoinPage (cards)
    "from-pink-400", "to-red-500",
    "from-green-400", "to-emerald-500",
    "from-orange-400", "to-pink-500",
    "from-blue-400", "to-indigo-500",

    // Manacademy (formations)
    "from-blue-500", "to-cyan-500",
    "from-green-500", "to-emerald-500",
    "from-purple-500", "to-indigo-500",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        mana: {
          dark: "hsl(var(--mana-dark))",
          soft: "hsl(var(--mana-soft))",
          accent: "hsl(var(--mana-accent))",
        },
        manamind: {
          DEFAULT: "hsl(var(--manamind))",
          light: "hsl(var(--manamind-light))",
          dark: "hsl(var(--manamind-dark))",
        },
        manacademy: {
          DEFAULT: "hsl(var(--manacademy))",
          light: "hsl(var(--manacademy-light))",
          dark: "hsl(var(--manacademy-dark))",
        },
        manadvise: {
          DEFAULT: "hsl(var(--manadvise))",
          light: "hsl(var(--manadvise-light))",
          dark: "hsl(var(--manadvise-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideExpand: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeInUp: "fadeInUp 1s ease-out both",
        slideExpand: "slideExpand 2.5s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

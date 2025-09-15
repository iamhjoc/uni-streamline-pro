import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-success": "var(--gradient-success)",
      },
      boxShadow: {
        "elegant": "var(--shadow-elegant)",
        "card": "var(--shadow-card)",
        "glow": "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        "smooth": "var(--transition-smooth)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "icon-float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },
        "icon-bounce": {
          "0%": {
            transform: "scale(1) rotate(0deg)",
          },
          "25%": {
            transform: "scale(1.2) rotate(5deg)",
          },
          "50%": {
            transform: "scale(1.1) rotate(-3deg)",
          },
          "75%": {
            transform: "scale(1.05) rotate(2deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
          },
        },
        "card-float": {
          "0%, 100%": {
            transform: "translateY(0px) scale(1)",
          },
          "50%": {
            transform: "translateY(-5px) scale(1.02)",
          },
        },
        "depth-3d": {
          "0%": {
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
          },
          "100%": {
            transform: "perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "icon-float": "icon-float 3s ease-in-out infinite",
        "icon-bounce": "icon-bounce 0.6s ease-out",
        "card-float": "card-float 4s ease-in-out infinite",
        "depth-3d": "depth-3d 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

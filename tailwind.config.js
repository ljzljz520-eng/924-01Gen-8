/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#1E3A8A",
        },
        accent: {
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
        },
        success: {
          500: "#10B981",
          600: "#059669",
        },
        danger: {
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(30, 58, 138, 0.15)",
        device: "0 20px 60px -20px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4F46E5 0%, #1E3A8A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)',
      },
    },
  },
  plugins: [],
};

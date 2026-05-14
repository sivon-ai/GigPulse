/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        midnight: "#0B1120",
        navy: "#111827",
        slatecore: "#0F172A",
        electric: "#3B82F6",
        pulsepurple: "#8B5CF6",
        pulsecyan: "#06B6D4"
      },
      boxShadow: {
        glow: "0 0 36px rgba(59, 130, 246, 0.32)",
        cyan: "0 0 34px rgba(6, 182, 212, 0.24)",
        purple: "0 0 42px rgba(139, 92, 246, 0.26)"
      },
      animation: {
        "gradient-shift": "gradientShift 11s ease infinite",
        "ticker": "ticker 25s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.5s ease-in-out infinite",
        "data-flow": "dataFlow 3s ease-in-out infinite",
        "skeleton": "skeleton 1.5s ease-in-out infinite"
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" }
        },
        dataFlow: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(-110%)", opacity: "0" }
        },
        skeleton: {
          "0%": { opacity: "0.45" },
          "50%": { opacity: "0.95" },
          "100%": { opacity: "0.45" }
        }
      }
    }
  },
  plugins: []
};

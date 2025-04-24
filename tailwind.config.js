/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "blood-rain": "bloodRain 2s infinite alternate",
      },
      keyframes: {
        bloodRain: {
          "0%": {
            background: "rgba(139, 0, 0, 0.2)",
            boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)",
          },
          "50%": {
            background: "rgba(139, 0, 0, 0.5)",
            boxShadow: "0 0 20px rgba(139, 0, 0, 0.8)",
          },
          "100%": {
            background: "rgba(139, 0, 0, 0.2)",
            boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};

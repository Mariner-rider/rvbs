module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1650px",
    },
    extend: {
      colors: {},
      boxShadow: {},
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        hk: ["HK Grotesk", "sans-serif"],
      },
      // backgroundImage: {
      // 	'checkbox-checked': 'url('../src/assets/images/checkbox-checked.svg')',
      // 	'gradient-1': 'linear-gradient(to bottom, rgb(18,27,46), transparent)',
      // 	'gradient-2': 'linear-gradient(to bottom, rgb(199,210,254,.3), transparent)',
      // 	'gradient-3': 'linear-gradient(to bottom, rgb(199,210,254,.6), rgb(224,231,255,.6))',
      // 	'gradient-4': 'linear-gradient(to bottom, rgb(199,210,254), transparent)',
      // 	'hero-bg': 'url('../src/assets/images/hero-bg.png')',
      // 	wormhole: 'url('../src/assets/images/wormhole.png')'
      // },
      backgroundImage: {
        "checkbox-checked": "url('../src/assets/images/checkbox-checked.svg')",
        "gradient-1": "linear-gradient(to bottom, rgb(18,27,46), transparent)", //dark: section gradient
        "gradient-2":
          "linear-gradient(to bottom, rgb(199,210,254,.3), transparent)", //light: section gradient
        "gradient-3":
          "linear-gradient(to bottom, rgb(199,210,254,.6), rgb(224,231,255,.6))", //light: navbar item hover
        "gradient-4":
          "linear-gradient(to bottom, rgb(199,210,254), transparent)", //light: integrationIcons inner gradient
        "hero-bg": "url('../src/assets/images/hero-bg.png')",
        wormhole: "url('../src/assets/images/wormhole.png')",
      },
      keyframes: {
        'move-horizontal': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(8px)' }, // You can adjust the px for how far it moves
        },
        ping: {
          "35%": {
            opacity: 0.4,
          },
          "75%, 100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
        "logo-cloud": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - 4rem))",
          },
        },
        "marquee-x": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-y": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
      animation: {
        "ping-0": "ping 8s ease-in-out infinite",
        "ping-1": "ping 8s ease-in-out infinite 2s",
        "ping-2": "ping 8s ease-in-out infinite 4s",
        "ping-3": "ping 8s ease-in-out infinite 6s",
        "logo-cloud": "logo-cloud 30s linear infinite",
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
         'move-horizontal': 'move-horizontal 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};

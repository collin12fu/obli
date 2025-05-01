import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) rotate(15deg)' },
          '50%': { transform: 'translateX(100%) rotate(15deg)' },
          '100%': { transform: 'translateX(200%) rotate(15deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        pulseGlowButton: {
          '0%': {
            boxShadow: '0 0 10px rgba(203, 170, 111, 0.8), 0 0 20px rgba(203, 170, 111, 0.6)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(203, 170, 111, 0.9), 0 0 40px rgba(203, 170, 111, 0.7)',
          },
          '100%': {
            boxShadow: '0 0 10px rgba(203, 170, 111, 0.8), 0 0 20px rgba(203, 170, 111, 0.6)',
          },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        shimmerBackground: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        pulseGlow: 'pulseGlow 3s infinite ease-in-out',
        pulseGlowButton: 'pulseGlowButton 2s infinite ease-in-out',
        glow: 'glow 4s ease-in-out infinite',
        shimmerBackground: 'shimmerBackground 2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
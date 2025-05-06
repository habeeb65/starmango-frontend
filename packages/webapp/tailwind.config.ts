import type { Config } from 'tailwindcss';
import { join } from 'path';

export default {
  content: [
    join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, '../webapp-libs/*/src/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, 'index.html'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FAFF',
          100: '#DAF1FF',
          200: '#B5E5FF',
          300: '#83D3FF',
          400: '#5AB9FA',
          500: '#2F96F3',
          600: '#207AE1',
          700: '#1560C2',
          800: '#0F499B',
          900: '#0B3373',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
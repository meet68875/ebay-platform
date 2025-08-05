/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'purpleshade-100': '#6284f6',
        'purpleshade-300': '#3665f3',
        'purpleshade-400': '#0064d2',
        'grayshade-50': '#e0e0e0',
        'grayshade-100': '#b3b3b3',
        'grayshade-200': '#666666',
        'grayshade-300': '#4d4d4d',
        'grayshade-400': '#2c2c2c',
        'grayshade-500': '#1c1c1c',
        'lightColor-100': '#FFFFFF',
        'lightColor-200': '#f2f2f2',
        'lightColor-300': '#e5e5e5',
        'ebay-blue': '#0064d2',
        'ebay-red': '#cc0000',
        'ebay-yellow': '#f5af02',
        'ebay-gray': '#666666',
        'ebay-light-gray': '#f2f2f2',
        'ebay-dark-bg': '#1c1c1c',
        'ebay-dark-card': '#2c2c2c',
        'ebay-dark-text': '#e0e0e0',
      },
      fontFamily: {
        "urbanist": ['urbanist', 'sans-serif']
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(
            theme('bgGradientDeg', {}),
            {
              10: '10deg',
              15: '15deg',
              20: '20deg',
              25: '25deg',
              30: '30deg',
              45: '45deg',
              60: '60deg',
              90: '90deg',
              120: '120deg',
              135: '135deg',
            }
          )
        }
      )
    })
  ],
}

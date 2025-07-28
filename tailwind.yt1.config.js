/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./source/**/*.{hbs,css,js}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1210px'
    },
    container: {
      center: true,
      padding: '20px'
    },
    extend: {
      colors: {
        primary: '#3b3958',
        accent: {
          '200': '#2e3cf1',
          DEFAULT: '#1723bc',
          '600': "##091285",
        },
        gray: {
          '100': '#f5f4fe',
          '150': '#EAEAF5',
          '180': '#D8D8E6',
          '200': '#cecdd8',
          '300': '#b5b4bd',
          '500': '#767588',
          '700': '#33334d',
          '800': '#29293d',
          '900': '#1b1b29',
        },
        violet: {
          '300': '#bebce4'
        },
        social: {
          'facebook': '#1877F2',
          'twitter': '#1DA1F2',
          'instagram': '#E4405F',
          'youtube': '#FF0000',
          'linkedin': '#0077B6',
        },
        info: '#23d2e2',
        danger: '#ff3d54',
        success: '#615dfa',
      },
      fontFamily: {
        base: ['"Poppins", sans-serif'],
        heading: ['"Poppins", sans-serif']
      },
      fontSize: {
        '3xs': '0.625rem',
        '2xs': '0.6875rem',
        '2sm': '0.8125rem',
        '1.5xl': '1.375rem',
        '2.5xl': '1.6875rem',
        '3.5xl': '2.125rem',
        '5.5xl': '3.375rem',
        '6.5xl': '4.25rem'
      },
      letterSpacing: {
        tightest: '-0.06em'
      },
      lineHeight: {
        tighter: '1.1em',
        relaxed: '1.75em'
      },
      gap: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        // 6.5: "1.625rem",
        7.5: "1.875rem",
        12.5: "3.125rem",
        // 15: "3.75rem",
        // 25: "6.25rem",
      },
      margin: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        // 6.5: "1.625rem",
        7.5: "1.875rem",
        12.5: "3.125rem",
        // 15: "3.75rem",
        // 25: "6.25rem",
      },
      padding: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        // 6.5: "1.625rem",
        7.5: "1.875rem",
        12.5: "3.125rem",
        // 15: "3.75rem",
        // 25: "6.25rem",
      },
      inset: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        // 6.5: "1.625rem",
        7.5: "1.875rem",
        12.5: "3.125rem",
        // 15: "3.75rem",
        // 25: "6.25rem",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        // 6.5: "1.625rem",
        7.5: "1.875rem",
        12.5: "3.125rem",
        // 15: "3.75rem",
        // 25: "6.25rem",
      },
      backgroundImage: {
        'input-success': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12px' height='10px'%3E%3Cpath fill-rule='evenodd' fill='white' d='M12.007,2.506 L4.799,10.007 L-0.007,5.007 L2.396,2.506 L4.799,5.007 L9.604,0.006 L12.007,2.506 Z'/%3E%3C/svg%3E%0A"), linear-gradient(0deg, #615dfa, #615dfa)`,
        'input-invalid': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px'%3E%3Cpath fill-rule='evenodd' fill='white' d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'/%3E%3C/svg%3E%0A"), linear-gradient(0deg, #ff3d54, #ff3d54)`,
        'caret': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%233b3958' d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'/%3E%3C/svg%3E");`,
        'caret-white': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'/%3E%3C/svg%3E");`,
        'gradient-radial-hero': 'radial-gradient(circle at 70% 50%, #5093d2 11%, transparent 41%), radial-gradient(circle at 68% 50%, rgba(255, 250, 195, .1) 13%, transparent 52%)',
      },
      backgroundPosition: {
        'spike-roll': '0px center, 8px center, 16px center, 24px center, 32px center, 40px center, 48px center, 56px center, 64px center'
      },
      boxShadow: {
        '3xl': '0 10px 60px 0 rgba(27, 27, 41, .06)'
      },
      aspectRatio: {
        '14/9': '14 / 9'
      },
      animation: {
        'spike-roll': 'spike-roll .95s linear infinite alternate',
        'popper-pop-in': 'popper-pop-in .1s cubic-bezier(.2, 0, .38, .9) forwards',
        'ring': 'ring 4s ease infinite',
        'dash': 'dash 180s linear alternate',
      },
      keyframes: {
        'spike-roll': {
          "0%": { backgroundSize: "4px 4px" },
          "12.5%": { backgroundSize: "4px 40px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px" },
          "25%": { backgroundSize: "4px 30px, 4px 40px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px" },
          "37.5%": { backgroundSize: "4px 10px, 4px 30px, 4px 40px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px" },
          "50%": { backgroundSize: "4px 4px, 4px 10px, 4px 30px, 4px 40px, 4px 4px, 4px 4px, 4px 4px, 4px 4px" },
          "62.5%": { backgroundSize: "4px 4px, 4px 4px, 4px 10px, 4px 30px, 4px 40px, 4px 4px, 4px 4px, 4px 4px" },
          "75%": { backgroundSize: "4px 4px, 4px 4px, 4px 4px, 4px 10px, 4px 30px, 4px 40px, 4px 4px, 4px 4px" },
          "87.5%": { backgroundSize: "4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 10px, 4px 30px, 4px 40px, 4px 4px" },
          "100%": { backgroundSize: "4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 10px, 4px 30px, 4px 40px" }
        },
        'popper-pop-in': {
          '0%': { opacity: "0", transform: "scale(0.9)" },
          '100%': { opacity: "1", transform: "scale(1)" }
        },
        'ring': {
          '0%': { transform: "rotate(-15deg)" },
          '2%': { transform: "rotate(15deg)" },
          '4%': { transform: "rotate(-18deg)" },
          '6%': { transform: "rotate(18deg)" },
          '8%': { transform: "rotate(-22deg)" },
          '10%': { transform: "rotate(22deg)" },
          '12%': { transform: "rotate(-18deg)" },
          '14%': { transform: "rotate(18deg)" },
          '16%': { transform: "rotate(-12deg)" },
          '18%': { transform: "rotate(12deg)" },
          '20%': { transform: "rotate(0deg)" },
        },
        'dash': {
          '0%': { strokeDashoffset: "1000" },
          '100%': { strokeDashoffset: "0" },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}

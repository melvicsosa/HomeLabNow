/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./source/**/*.{hbs,css,js}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1216px'
    },
    container: {
      center: true,
      padding: '20px'
    },
    extend: {
      colors: {
        primary: '#ff3d54',
        secondary: '#654cff',
        tertiary: '#1934f5',
        quaternary: '#9246ff',
        quinary: '#ff8a00',
        accent: '#3b3958',
        gray: {
          '100': '#f8f8fb',
          '300': '#a6a5be',
          DEFAULT: '#737193',
          '900': '#101823',
        },
      },
      fontFamily: {
        base: [ '"Open Sans", sans-serif' ],
        heading: [ '"Jost", sans-serif' ]
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
      boxShadow: {
        '4xl': '0 10px 60px 0 rgba(59, 57, 88, .10)'
      }
    }
  },
}

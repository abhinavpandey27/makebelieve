const { normalizeReference } = require('markdown-it/lib/common/utils')
const colors = require('tailwindcss/colors')
const { width, fontWeight, letterSpacing } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.njk', './src/**/*.md',],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      display: ['hover', 'focus'],
      borderRadius: {
        'vsm': '1px',
      },
      cursor:{
        'newpage': 'ne-resize'
      },
      boxShadow :{
        '3xl': '2px 2px 20px 0px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: ['hover', 'focus'],
      height: {
        vsm: '.5px',
        nvsm: '2px',
        '128': '32rem',

      },
      animation: ['hover', 'focus'],
      maxWidth: {
        '8xl': '90rem',
       },
       colors: {
        transparent: 'transparent',
        current: 'currentColor',
        bgblue: {
          DEFAULT: '#252B30',
          dark: '#1C1F22',
        },
        fred: {
          DEFAULT: '#D41616',
        },
        fgreen: {
          DEFAULT: '#B9F073',
        },
        bggray: {
          DEFAULT:'#F7F7F7',
          dark: '#FFFFFF'
        },
        gray: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#c0ccda',
          light: '#e0e6ed',
          lightest: '#f9fafc',
        },
      },
      fontFamily: {
        karla: ["'Karla'", ...defaultTheme.fontFamily.sans],
        inter: ["'Inter var'", ...defaultTheme.fontFamily.sans],
        Piazzolla: ["'Piazzolla'", ...defaultTheme.fontFamily.serif],
        OpenSauceSans: ["'Open Sauce Sans'", ...defaultTheme.fontFamily.serif],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            fontFamily: 'Inter var',
            p:{
              maxWidth: '65ch',
              fontSize: '1.1rem',
              lineHeight: '1.62',
              fontWeight: '425',
              letterSpacing: '-0.010em'
            },
            ul:{
              maxWidth: '65ch',
              fontSize: '1.1rem',
            },
            li:{
              maxWidth: '65ch',
              fontSize: '1.1rem',
            },

            img:{
              width:'100%',
            },



            a: {
              color: '#D41616',
              textDecoration: 'none',
              '&:hover': {
                color: '#8D1313',
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontFamily: 'Open Sauce Sans',
              paddingTop:'.2rem',
              fontWeight: '700',
              maxWidth: '600px',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontFamily: 'Open Sauce Sans',
              fontWeight: '700',
              maxWidth: '600px',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontFamily: 'Open Sauce Sans',
              fontWeight: '600',
              maxWidth: '600px',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              fontFamily: 'Open Sauce Sans',
              maxWidth: '600px',
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': {
              content: 'none',
            },
            'code:after': {
              content: 'none',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },

          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            p:{
              maxWidth: '65ch',
              fontSize: '1.1rem',
              lineHeight: '1.62',
              fontWeight: '400',
              letterSpacing: '-0.016em'
            },
            a: {
              color: '#B9F073',
              '&:hover': {
                color: '#DCFFB0',
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
            
          },
        },
      }),
    },
  },
  variants: {
     typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}


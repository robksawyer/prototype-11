/**
 * @file tailwind.config.js
 * Theme colors: https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c
 */
const { colors, fontSize, screens } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  // corePlugins: {
  //   preflight: false,
  // },

  // If you want to support toggling dark mode manually instead of relying on the operating
  // system preference, use the class strategy instead of the media strategy
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      xs: '480px',
      md: '768px',
      lg: '1024px',
      mlg: '1280px',
      xl: '1600px',
      xxl: '1920px',
    },
    extend: {
      transitionDelay: {
        2000: '2000ms',
        2500: '2500ms',
        3000: '3000ms',
      },
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent0: '#f7f7f7',
        accent1: '#F8F9FA',
        accent2: '#333339',
        accent3: '#9F4BC9',
        accent4: '#D5B942',
        accent5: '#60CF88',
        accent6: '#9F51F6',
        accent7: '#4F4598',
        black: '#000000',
        white: '#ffffff',
        gray: {
          ...colors.gray,
          30: '#303738',
          33: '#333333',
          ea: '#EAEAEA',
          d9: '#D9DEE3',
          f5: '#F5F5F5',
          e3: '#E3E6EC',
          eb: '#EBEBEB',
          ed: '#EDEEF0',
        },
        pink: {
          ...colors.pink,
          ac: '#AC46D2',
          90: '#903db1',
          95: '#953cd5',
          f7: '#F70A91',
          ff: '#FF0092',
          '9f': '#9F4BC9',
          fa: '#FA1FB6',
        },
        purple: {
          ...colors.purple,
          'brand-light': '#c026f6',
          'brand-dark': '#5e1ec5',
          '00': '#001440',
          61: '#6134D7',
          b7: '#B765D7',
          77: '#7773E1',
        },
        orange: {
          ...colors.orange,
          ff: '#FF8300',
          ec: '#ec7a00',
        },
        yellow: {
          ff: '#FFB600',
        },
        green: {
          '0e': '#0ef1b3',
          '2f': '#2FFFE7',
          '3f': '#34FFE7',
          34: '#34FFE7',
        },
        red: {
          ...colors.red,
          f5: '#F52513',
          c8: '#C80000',
          ff: '#FF0003',
        },
        blue: {
          ...colors.blue,
          '07': '#07080a',
          'brand-light': '#cbd1db',
          'brand-dark': '#121521',
          '0A': '#0A0B0D',
          '02': '#02003E',
          '04': '#04347A',
          '2d': '#2D4DC8',
        },
      },
      borderRadius: {
        ms: '0.25rem',
      },
      dropShadow: {
        discord: '0px 4px 12px #5865F2',
        discordHover: '0px 2px 8px #5865F2',
        purple: '0px 4px 12px #5865F2',
        purpleHover: '0px 2px 8px #5865F2',
        hotPink: '0px 4px 12px #C8287A',
        hotPinkHover: '0px 2px 8px #C8287A',
        teal: '0px 4px 12px #2CFEFE',
        tealHover: '0px 2px 8px #2CFEFE',
        red: '0px 0px 3px red',
      },
      height: {
        'screen-1/2': '50vh',
        'screen-1/3': '33vh',
      },
      width: {
        profile: '1200px',
        'screen-1/2': '50vw',
        'screen-1/3': '33vw',
      },
      zIndex: {
        '-1': '-10',
        100: 100,
        50: 50,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        content: 10,
        hud: 20,
        modal: 40,
        nav: 45,
        loader: 50,
        cursor: 60,
        infinity: 9999999999,
      },
      fontSize: {
        xxs: '.625rem',
        '2xs': '0.65rem',
        '3xs': '0.6rem',
        '4xs': '0.5rem',
      },
      gap: {
        6: '-1.5rem',
      },
      fontFamily: {
        sans: ['NeueMontreal-Regular', 'Helvetica', 'Arial', 'sans-serif'],
        pp: ['PPSupplyMono', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(.45,.09,.35,.91)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        gradient0:
          'linear-gradient(#5CFF94 0px, #5CFF94 52%, #28c961 53%, #28c961)',
        gradient0Hover:
          'linear-gradient(#28c961 0px, #28c961 52%, #28c961 53%, #28c961)',
      },
    },
  },
  variants: {
    extend: {
      fontFamily: [
        'active',
        'responsive',
        'focus',
        'focus-within',
        'dark',
        'hover',
      ],
    },
  },
  plugins: [require('tailwindcss-touch')()],
};

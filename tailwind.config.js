module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    minHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%'
    },
    extend: {
      transitionTimingFunction: {
        'easy-slide': 'cubic-bezier(.55, 0, .1, 1)'
      }
    },
  },
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus']
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}

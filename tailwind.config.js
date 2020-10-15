module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      height: {
        'max-c': 'max-content'
      },
      width: {
        '28': '7rem'
      },
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

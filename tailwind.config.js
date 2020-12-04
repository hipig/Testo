module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      transitionTimingFunction: {
        'easy-slide': 'cubic-bezier(.55, 0, .1, 1)'
      }
    },
  },
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'checked'],
    translate: ['responsive', 'hover', 'focus', 'checked'],
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}

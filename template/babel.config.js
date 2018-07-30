module.exports = {
  presets: [
    ['@vue/app', {
      "exclude": ["es6.promise"] // @SEE polyfills.js
    }]
  ]
}

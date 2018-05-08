module.exports = {
  // html        : true,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  ghPages     : true,
  stylesheets : true,

  html: {
    excludeFolders: ['layouts', 'macros', 'data', 'partials', 'templates']
  },

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ['./app.js']
    },
    provide: {
        photoswipe: 'photoswipe.min',
        photoswipeUi: 'photoswipe-ui-default.min'
    } 
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'dist'
    }
  },

  production: {
    rev: true
  }
};

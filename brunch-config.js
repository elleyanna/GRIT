var path,
  slice = [].slice;

path = require('path');

exports.config = {
  conventions: {
    assets: /app\/assets\//
  },
  paths: {
    "public": 'public',
    watched: ['app']
  },
  npm: {
    enabled: true,
  },
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': '**/*.js'
      }
    },
    stylesheets: {
      joinTo: {
        'css/style_ie.css': 'app/stylesheets/style_ie.scss',
        'css/style.css': 'app/stylesheets/style.scss'
      }
    }
  },
  plugins: {
    babel: {
      presets: ['es2015'],
      plugins: ['es6-promise']
    },
    sass: {
      mode: 'native',
      options: {
        includePaths: ['node_modules/normalize.css']
      },
      precision: 8,
      sourceMapEmbed: true
    },
    postcss: {
      processors: require('autoprefixer')(['last 8 versions'])
    },
    "static": {
      pathTransform: function(f) {
        return path.relative('pages', f);
      },
      processors: [
        require('html-brunch-static')({
          partials: /\/partials\//,
          layouts: /\/layouts\//,
          handlebars: {
            enableProcessor: true,
            helpers: {
              ifEq: function(a, b, opts) {
                if (a === b) {
                  return opts.fn(this);
                } else {
                  return opts.inverse(this);
                }
              },
              ifEqDebug: function(a, b, opts) {
                console.log("a: '" + a + "'");
                console.log("b: '" + b + "'");
                if (a === b) {
                  return opts.fn(this);
                } else {
                  return opts.inverse(this);
                }
              },
              log: function() {
                var msg;
                msg = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                return console.log(msg);
              }
            }
          }
        })
      ]
    }
  },
  server: {
    port: 7777,
    hostname: '0.0.0.0'
  }
};

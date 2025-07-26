/** ===========================================================================
 *
 * Gulpfile setup.
 *
 * @since 1.0.0
 * @version 3.0.1
 * @author Dan Fisher
 *
 * ========================================================================= */

'use strict';


/** ---------------------------------------------------------------------------
* Load plugins
* ------------------------------------------------------------------------- */

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var minifyJS     = require('gulp-uglify');
var cssNano      = require('gulp-cssnano');
var gulpIf       = require('gulp-if');
var replace      = require('gulp-replace');
var sourcemaps   = require('gulp-sourcemaps');
var fancyLog     = require('fancy-log');
var panini       = require('panini');
var imagemin     = require('gulp-imagemin');
var rename       = require('gulp-rename');
var browser      = require('browser-sync').create();
var sequence     = require('gulp4-run-sequence');
var del          = require('del');
var ftp          = require('vinyl-ftp');
var yargs        = require('yargs');
var postcss      = require('gulp-postcss');
var prettyHtml   = require('gulp-pretty-html');

// Custom
var htmlmin      = require('gulp-htmlmin');


/** ---------------------------------------------------------------------------
* Load settings.
* ------------------------------------------------------------------------- */

const CONFIG = require('./config.json');
const PATHS = CONFIG.PATH;
const FTP = CONFIG.FTP;


/** ---------------------------------------------------------------------------
* Look for the --production flag.
* ------------------------------------------------------------------------- */

const PRODUCTION = yargs.argv.production;


/** ---------------------------------------------------------------------------
* Helper function to build an FTP connection based on the configuration.
* ------------------------------------------------------------------------- */

function getFTPConnection() {
  return ftp.create({
    host: FTP.host,
    port: FTP.port,
    user: FTP.user,
    password: FTP.password,
    parallel: 5,
    log: fancyLog
  });
}


/** ---------------------------------------------------------------------------
* Regular tasks.
* ------------------------------------------------------------------------- */

// Deletes the dist folder so the build can start fresh.
gulp.task( 'reset', function() {
  return del(PATHS.dist);
});

// Copies the necessary files from src to dist.
gulp.task('copy', function() {
  return gulp
    .src(CONFIG.COPY)
    .pipe(gulp.dest(PATHS.dist));
});

// Compiles Handlebars templates with Panini.
gulp.task('pages', function() {
  return gulp
    .src(PATHS.src + '/pages/**/*.hbs')
    .pipe(panini(CONFIG.PANINI))
    // .pipe(gulpIf(PRODUCTION, replace('.css"', '.min.css"')))
    // .pipe(gulpIf(PRODUCTION, replace('core.js', 'core.min.js')))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(prettyHtml(
      {
        indent_size: 2,
        indent_char: ' ',
      }
    ))
    .pipe(gulpIf(!PRODUCTION, htmlmin({ collapseWhitespace: false })))
    .pipe(gulpIf(PRODUCTION, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(PATHS.dist));
});

// Refresh Panini.
gulp.task('panini-refresh', function(done) {
  panini.refresh();
  done();
});

// Creates a server with BrowserSync and watch for file changes.
gulp.task('server', function() {
  browser.init(CONFIG.SERVER);

  // Watch for file changes.
  gulp.watch([PATHS.src + '/{data,helpers,layouts,pages,partials}/**/*', PATHS.src_css + '/**/*.css'], gulp.series(['watch-html', 'watch-css']));
  gulp.watch(PATHS.src_css + '/**/*.css', gulp.series('css'));
  gulp.watch(PATHS.src_js + '/**/*.js', gulp.series('watch-js'));
  gulp.watch([
    PATHS.src_img + '/**/*.{png,jpg,gif,svg,ico}'
  ], gulp.series('watch-img'));
});

// Compiles CSS.
gulp.task('css', function() {
  return gulp
    .src('source/assets/**/*.css')
    .pipe(postcss())
    // .pipe(plumber.stop())
    // .pipe(gulpIf(!PRODUCTION, sourcemaps.write('/maps')))
    // .pipe(gulpIf(PRODUCTION, cssNano()))
    .pipe(gulp.dest('build/assets'))
    .pipe(browser.stream());
});

// Check JS code for errors.
gulp.task('lint-js', function() {
  return gulp
    .src([
      PATHS.src_js + '/**/*.js',
      '!' + PATHS.src_js + '/{cdn-fallback,vendor}/**/*'
    ])
    .pipe(gulp.dest(PATHS.dist_js))
});

// Minify JS init.
gulp.task('js-init', gulp.series('lint-js', function() {
  return gulp
    .src([
      PATHS.src_js + '/**/init.js'
    ])
    .pipe(gulpIf(PRODUCTION, minifyJS()))
    .pipe(gulp.dest(PATHS.dist_js))
    .pipe(browser.stream());
}));

// Compresses images.
gulp.task('img', function() {
  return gulp
    .src([
      PATHS.src_img + '/**/*.{png,jpg,gif,svg,ico}',
      '!' + PATHS.src_img + '/*.{svg}',
      '!' + PATHS.src_img + '/sprites/**'
    ])
    .pipe(gulpIf(PRODUCTION, imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ], {
      verbose: true
    })))
    .pipe(gulp.dest(PATHS.dist_img));
});

// Deploy to FTP.
gulp.task('ftp-deploy', function() {
  var conn = getFTPConnection();

  return gulp
    .src(FTP.localFiles, {
      base: PATHS.dist,
      buffer: false
    })
    .pipe(conn.newer(FTP.remoteFolder))
    .pipe(conn.dest(FTP.remoteFolder));
});


/** ---------------------------------------------------------------------------
* Watch tasks
* ------------------------------------------------------------------------- */

// HTML
gulp.task('watch-html', gulp.series('panini-refresh', 'pages', function(done) {
  browser.reload();
  done();
}));

// CSS
gulp.task('watch-css', gulp.series('css', function(done) {
  browser.reload();
  done();
}));

// JS
gulp.task('watch-js', gulp.series('js-init', function(done) {
  browser.reload();
  done();
}));

// Images
gulp.task('watch-img', gulp.series('img', function(done){
  browser.reload();
  done();
}));

// Watch all files and upload to FTP when a change is detected
gulp.task('deploy-watch', function() {
  var conn = getFTPConnection();

  gulp.watch(FTP.localFiles).on('change', function(event) {
    console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

    return gulp
      .src([event.path], {
        base: PATHS.dist,
        buffer: false
      })
      .pipe(conn.newer(FTP.remoteFolder))
      .pipe(conn.dest(FTP.remoteFolder));
  });
});


/** ---------------------------------------------------------------------------
* Other tasks.
* ------------------------------------------------------------------------- */



/** ---------------------------------------------------------------------------
* Main tasks.
* ------------------------------------------------------------------------- */

gulp.task('build', function(cb) {
  sequence('reset', gulp.series('copy', 'pages'), gulp.series('css', 'js-init', 'img'), cb);
});

gulp.task('default', function(cb) {
  sequence('build', 'server', cb);
});

gulp.task('deploy', function(cb) {
  sequence('build', 'ftp-deploy', cb);
});



/** ---------------------------------------------------------------------------
* ThemeForest Pack.
* ------------------------------------------------------------------------- */

// Copies all files for buyers.
gulp.task('export', function() {
  return gulp
    .src([
      PATHS.src + '/**',
      PATHS.dist + '/**',
      '.editorconfig',
      '.jshintrc',
      'config.json',
      'gulpfile.js',
      'package.json',
      'package-lock.json',
      'postcss.config.js',
      'prettier.config.js',
      'tailwind.config.js',
      'tailwind.yt1.config.js',
      'tailwind.yt2.config.js',
      'tailwind.str1.config.js',
      'tailwind.str2.config.js'
    ], {
      base: '.'
    })
    .pipe(gulp.dest('../HomeLabNow/EXPORT'));
});

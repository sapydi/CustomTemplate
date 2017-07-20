var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sh = require('shelljs');
var typescript = require('gulp-tsc');
var uglifycss = require('gulp-uglifycss');
var flatten = require('gulp-flatten');

gulp.task('build-all', ['clean', 'vendor', 'compile']);

var vendorPaths = {
		  src: {
			  js: ['./node_modules/jquery/dist/jquery.min.js',
					'./node_modules/jqueryui/jquery-ui.min.js',
					'./node_modules/jquery-contextmenu/dist/jquery.contextMenu.min.js',
					'./node_modules/Bia/js/biaCadViewerVendor.min.js',
					'./node_modules/Bia/js/biaCadViewerApp.min.js',
					'./node_modules/bia.sdk.api/dist/app/index.min.js',
					'./node_modules/bia.sdk.api.impl/dist/app/index.min.js'
				  ],
			  css: ['./node_modules/Bia/styling/**/*.css'],
			  fonts: ['./node_modules/Bia/styling/fonts/**/*'],
			  images: ['./node_modules/Bia/images/**/*']
		  },
		  dest: {
			  base: 'www/vendor/**/*',
			  js: 'www/vendor/js',
			  css: 'www/vendor/css',
			  fonts: 'www/vendor/fonts',
			  images: 'www/vendor/images'  
		  }
};

var appPaths = {
		  src: {
			  sass: ['./scss/**/*.scss'],
			  ts: ['./src/**/*.ts'],
			  html: ['./src/**/*.html'],
			  js: ['./src/**/*.js']
		  },
		  dest: {
			  base: ['www/js/**/*', 'www/templates/**/*'],
			  sass: 'www/css',
			  html: 'www/templates',
			  js: 'www/js'
		  }
};

//Clean folders.
gulp.task('clean', ['clean-vendor', 'clean-app']);

gulp.task('clean-vendor', function () {
	del(vendorPaths.dest.base);
});

gulp.task('clean-app', function () {
	del(appPaths.dest.base);
});

// Copy vendor dependencies.
gulp.task('vendor', ['vendor-js', 'vendor-css', 'vendor-fonts', 'vendor-images']);

gulp.task('vendor-js', function(){
	gulp.src(vendorPaths.src.js)
	    .pipe(concat('vendor.min.js')) 
	    .pipe(gulp.dest(vendorPaths.dest.js));
});

gulp.task('vendor-css', function () {
	gulp.src(vendorPaths.src.css)
	    .pipe(concat('vendor.min.css'))
	    .pipe(uglifycss({
	         "maxLineLen": 80
	      }))
	    .pipe(gulp.dest(vendorPaths.dest.css));
});

gulp.task('vendor-fonts', function () {
	gulp.src(vendorPaths.src.fonts)
         .pipe(gulp.dest(vendorPaths.dest.fonts));
});

gulp.task('vendor-images', function () {
	gulp.src(vendorPaths.src.images)
         .pipe(gulp.dest(vendorPaths.dest.images));
});

//Compile and copy application files.
gulp.task('compile', ['compile-ts', 'copy-js', 'copy-html']);


gulp.task('compile-ts', function(){
	  gulp.src(appPaths.src.ts)
	  .pipe(typescript({
	     emitError: false}
	   ))
	  .pipe(gulp.dest(appPaths.dest.js))

});

gulp.task('copy-js', function(){
	  //gulp.src(appPaths.src.js)
	  //.pipe(gulp.dest(appPaths.dest.js))
	  gulp.src(appPaths.src.js)
      .pipe(concat('main.js')) 
      .pipe(gulp.dest(appPaths.dest.js));

});

gulp.task('copy-html', function(){
	  gulp.src(appPaths.src.html)
	  .pipe(flatten())
	  .pipe(gulp.dest(appPaths.dest.html));
	  //gulp.src(appPaths.src.html)
	  //.pipe(gulp.dest(appPaths.dest.html))

});

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch-saas', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.src, ['compileTs']);
});

gulp.task('watch', function () {
	  gulp.watch('src/**/*', ['compile']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

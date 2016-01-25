var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell'),
    glob = require('glob'),
    livereload = require('gulp-livereload'),
    less = require('gulp-less'),
    htmlreplace = require('gulp-html-replace');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'react-dom',
    'react/addons',
    'react-tap-event-plugin'
];

var indexRoute = './src/index.html';

function copyStatic() {
    gulp.src(indexRoute)
        .pipe(gulp.dest('./build'));
}

function browserifyTask(options) {
    var appBundler = browserify({
        entries: [options.src],
        transform: [babelify],
        debug: options.development,
        cache: {}, packageCache: {}, fullPaths: options.development
    });

    copyStatic();
    appBundler.external(options.development ? dependencies : []);

    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.development, livereload()))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + ' ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    if (options.development) {

        if (!options.development) {
            dependencies.splice(dependencies.indexOf('react/addons'), 1);
        }

        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + ' ms');
            }));
    }
}

function cssTask(options) {
    if (options.development) {
        var run = function () {
            console.log(arguments);
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('main.css'))
                .pipe(less())
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('main.css'))
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
}

// Starts our development workflow
gulp.task('default', function () {

    browserifyTask({
        development: true,
        src: './src/app/main.js',
        dest: './build'
    });

    cssTask({
        development: true,
        src: './src/www/css/**/*.less',
        dest: './build'
    });

});

gulp.task('deploy', function () {

    browserifyTask({
        development: false,
        src: './src/app/main.js',
        dest: './dist'
    });

    cssTask({
        development: false,
        src: './src/www/css/**/*.less',
        dest: './dist'
    });

});

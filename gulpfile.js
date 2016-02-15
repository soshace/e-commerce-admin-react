var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    reactify = require('reactify'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    babel = require('gulp-babel');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'react-dom',
    'react-router',
    'react-tap-event-plugin'
];

var themeJS = [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/Waves/dist/waves.min.js'
];

var staticFiles = [
    '!./src/www/less/**/*.less',
    './src/www/**/*',
    './src/index.html'
];

var cssVendors = [
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './bower_components/animate.css/animate.min.css',
    './bower_components/Waves/dist/waves.min.css'
];

var lazyLoadFiles = [
    './bower_components/**/jquery.easypiechart.fill.js',
    './bower_components/**/jquery.sparkline.retina.js',
    './bower_components/**/jquery.flot.js',
    './bower_components/**/jquery.flot.resize.js',
    './bower_components/**/jquery.flot.pie.js',
    './bower_components/**/jquery.flot.tooltip.min.js',
    './bower_components/**/jquery.flot.spline.min.js',
    './bower_components/**/jquery.flot.orderBars.js',
    './bower_components/**/jquery-jvectormap-1.2.2.min.js',
    './bower_components/**/jquery-jvectormap-1.2.2.css',
    './bower_components/**/jquery-jvectormap-world-mill-en.js',
    './bower_components/**/jquery-jvectormap-us-aea-en.js',
    './bower_components/**/jquery.dataTables.min.js',
    './bower_components/**/dataTables.bootstrap.js',
    './bower_components/**/dataTables.bootstrap.css',
    './bower_components/**/footable.all.min.js',
    './bower_components/**/footable.core.css'
];

function copyStatic() {
    var copy = function () {
        console.log('coping static...');
        gulp.src(staticFiles)
            .pipe(gulp.dest('./build'));
    };
    copy();

    gulp.watch(staticFiles, copy);

    gulp.src(lazyLoadFiles)
        .pipe(gulp.dest('./build/libs'));

    copyFonts();
}

function copyFonts() {
    gulp.src('./bower_components/font-awesome/fonts/*.*')
        .pipe(gulp.dest('./build/fonts'));

    gulp.src('./src/www/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'));
}

function copyCssVendors() {
    gulp.src(cssVendors)
        .pipe(concat('vendors.css'))
        //.pipe(less())
        .pipe(gulp.dest('./build/styles'));
}

function buildThemeJS() {
    gulp.src(themeJS)
        .pipe(concat('libs.js'))
        //.pipe(less())
        .pipe(gulp.dest('./build/scripts'));
}

function browserifyTask(options) {
    console.log(options.src);
    var appBundler = browserify({
        entries: [options.src],
        transform:  [babelify],
        debug: options.development
        //cache: {}, packageCache: {}, fullPaths: options.development
    })
        //.transform(babelify, {presets: ["es2015", "react"]});
    appBundler.external(options.development ? dependencies : []);

    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(babel({
                presets: ['es2015']
            }).on('error', gutil.log))))
            .pipe(gulpif(!options.development, streamify(uglify().on('error', gutil.log))))
            .pipe(gulp.dest(options.dest))
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

    copyStatic();
    copyCssVendors();
    buildThemeJS();

    browserifyTask({
        development: true,
        src: './src/app/main.js',
        dest: './build/scripts'
    });

    cssTask({
        development: true,
        src: './src/www/less/app.less',
        dest: './build/styles'
    });

});

gulp.task('deploy', function () {
    copyStatic();
    copyCssVendors();
    buildThemeJS();

    browserifyTask({
        development: false,
        src: './src/app/main.js',
        dest: './build/scripts'
    });

    cssTask({
        development: false,
        src: './src/www/css/**/*.less',
        dest: './build/styles'
    });

});

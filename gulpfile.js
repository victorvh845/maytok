var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');


var dir = {
    assets: 'app/Resources/assets/',
    prod: 'web/'
}

var assets = {
    base_css: [
        'app/Resources/assets/css/app.css',
        'app/Resources/assets/css/screen.css',
        'app/Resources/assets/css/ie.css',
        'app/Resources/assets/css/owl.carousel.css',
        'app/Resources/assets/css/owl.theme.css',
        'app/Resources/assets/css/dakota.css'
    ],
    grid_index_css: [
        'app/Resources/assets/css/component-covers.css',
        'app/Resources/assets/css/animated-covers.css'
    ],
    base_js: [
        'app/Resources/assets/js/jquery-1.10.2.min.js',
        'app/Resources/assets/js/jquery-migrate.js',
        'app/Resources/assets/js/plugins.js',
        'app/Resources/assets/js/headroom.js',
        'app/Resources/assets/js/jquery.unveilEffects.js',
        'app/Resources/assets/js/custom.js',
        'app/Resources/assets/js/owl.carousel.js',
        'app/Resources/assets/js/dakota.js'
    ],
    base_head_js: [
        'app/Resources/assets/js/modernizr.js',
        'app/Resources/assets/js/detection.js'
    ],
    grid_index_js: [
        'app/Resources/assets/js/masonry.pkgd.min.js',
        'app/Resources/assets/js/imagesloaded.pkgd.min.js',
        'app/Resources/assets/js/classie.js',
        'app/Resources/assets/js/Vibrant.min.js',
        'app/Resources/assets/js/gridScrollFx.js',
        'app/Resources/assets/js/jquery.downCount.js'
    ],
    medium_editor_js: [
        'app/Resources/assets/js/medium-editor.js',
        'app/Resources/assets/js/medium-editor-mobile-plugin.js',
        'app/Resources/assets/js/handlebars.runtime.min.js',
        'app/Resources/assets/js/jquery-sortable-min.js',
        'app/Resources/assets/js/jquery.ui.widget.js',
        'app/Resources/assets/js/jquery.iframe-transport.js',
        'app/Resources/assets/js/jquery.fileupload.js',
        'app/Resources/assets/js/medium-editor-insert-plugin.min.js'
    ],
    medium_editor_css: [
        'app/Resources/assets/css/medium-editor.css',
        'app/Resources/assets/css/medium-editor-insert-plugin.css'
    ]
}

// Copy assets
gulp.task('copyAssets', function() {
    gulp.src(dir.assets + 'fonts/**/*.*').pipe(gulp.dest(dir.prod + 'fonts'));
    gulp.src(dir.assets + 'reader/**/*.*').pipe(gulp.dest(dir.prod + 'reader'));
    gulp.src(dir.assets + 'css/custom-fonts.css.*').pipe(gulp.dest(dir.prod + 'css'));
    //Minyfing images
    gulp.src(dir.assets + 'img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(dir.prod + 'img'))
});

//Minyfy js
gulp.task('build-js', function() {
    gulp.src(assets.base_head_js)
        .pipe(concat('base-head.min.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest(dir.prod + 'js'));

    gulp.src(assets.base_js)
        .pipe(concat('base.min.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest(dir.prod + 'js'));

    gulp.src(assets.grid_index_js)
        .pipe(concat('grid-index.min.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest(dir.prod + 'js'));

    gulp.src(assets.medium_editor_js)
        .pipe(concat('medium-editor.min.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest(dir.prod + 'js'));

    gulp.src(dir.assets + 'js/backend-loader.js')
        .pipe(concat('backend-loader.min.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest(dir.prod + 'js'));
});

gulp.task('build-css', function() {
    gulp.src(assets.base_css)
        .pipe(concat('base.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(dir.prod + 'css'));

        gulp.src(assets.grid_index_css)
        .pipe(concat('grid-index.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(dir.prod + 'css'));

        gulp.src(assets.medium_editor_css)
        .pipe(concat('medium-editor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(dir.prod + 'css'));
});

gulp.task('default', ['copyAssets', 'build-js'], function() {
    return gutil.log('Gulp is running!')
});
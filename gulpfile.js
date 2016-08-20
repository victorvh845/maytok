var gulp = require('gulp');
var gutil = require('gulp-util');

var dir = {
    assets: 'app/Resources/assets/',
    prod: 'web/'
}

// Copy assets
gulp.task('copyAssets', function() {
    gulp.src(dir.assets + 'fonts/**/*.*').pipe(gulp.dest(dir.prod + 'fonts'));
    gulp.src(dir.assets + 'reader/**/*.*').pipe(gulp.dest(dir.prod + 'reader'));
    gulp.src(dir.assets + 'css/custom-fonts.css.*').pipe(gulp.dest(dir.prod + 'css'));
});

gulp.task('default', ['copyAssets'], function() {
    return gutil.log('Gulp is running!')
});

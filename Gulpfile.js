var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
var path = require("path");

var gutil = require('gulp-util');
var rename = require('gulp-rename');

gulp.task('less', function () {
    var processors = [
        autoprefixer
    ];

    // gutil.log("the path",path.join(__dirname, 'less', 'includes'))

    return gulp.src('./css/style.less')
        .pipe(less({
                paths: [
                    path.join(__dirname, 'css'),
                    // path.join(__dirname, 'theme', 'less'),
                    // path.join(__dirname, 'theme'),
                    //path.join(__dirname, 'theme/less/plone.toolbar.vars.less')
                ]
            })
                .on('error', gutil.log)
                .on('error', gutil.beep)
        )
        .pipe(postcss(processors))
        .pipe(rename('./css/style.css'))
        .pipe(gulp.dest(''))
});

// Watch task
gulp.task('watch', function () {
    gulp.watch('./css/**/*.less', ['less']);
});

// Default task
gulp.task('default', ['watch','less']);


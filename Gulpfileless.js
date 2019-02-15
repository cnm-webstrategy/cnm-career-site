var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require("gulp-rename");
var path = require("path");

gulp.task('less', function () {
    var processors = [
        autoprefixer
    ];

    // gutil.log("the path",path.join(__dirname, 'less', 'includes'))

    return gulp.src('./css/**/*.less')
        .pipe(less({
                paths: [
                    path.join(__dirname, 'css')
                ]
            })
        )
        .pipe(postcss(processors))
        .pipe(rename('./css/style.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.task('less'));

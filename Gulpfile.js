var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
var path = require("path");
var GulpSSH = require('gulp-ssh');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var config = {
    host: 'www01',
    port: 22,
    username: 'webuser',
    privateKey: fs.readFileSync('/Users/bwalch/.ssh/id_rsa')
}

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
})

gulp.task('less', function (done) {
    var processors = [
        autoprefixer
    ];

    // gutil.log("the path",path.join(__dirname, 'less', 'includes'))

    return gulp.src('./css/**/*.less')
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
        .pipe(gulp.dest('./'));
});

// Watch task
gulp.task('watch', function () {
    gulp.watch('./css/**/*.less', gulp.series('less','dest'));
    gulp.watch('./js/default.js', gulp.task('destJS'));
});

// ssh task
gulp.task('exec', function () {
    return gulpSSH
        .exec(['uptime', 'ls -a', 'pwd'], {filePath: 'commands.log'})
        .pipe(gulp.dest('logs'))
});

gulp.task('dest', gulp.task('less'), function () {
    return gulp
        .src(['./css/style.css'])
        .pipe(gulpSSH.dest('/u01/data/docroots/external-directories/cornerstone_resources/'))
});

gulp.task('destJS', function () {
    return gulp
        .src(['./js/default.js'])
        .pipe(gulpSSH.dest('/u01/data/docroots/external-directories/cornerstone_resources/'))
});

// Default task
gulp.task('default', gulp.series('watch','less','dest','destJS'));

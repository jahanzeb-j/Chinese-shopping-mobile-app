var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var gutil = require('gulp-util')
var minifyCss = require('gulp-minify-css');
//静态js css合并
gulp.task('js-bundle', function() {

    return gulp.src('./static/css/*.js')

    .pipe(concat('JQplugins.js'))
        .pipe(uglify().on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('./static/bundle/'));

})

gulp.task('css-bundle', function() {

        return gulp.src('./static/css/*.css')
            .pipe(concat('global.css'))
            //.pipe(minifyCss())
            .pipe(gulp.dest('./static/bundle/'));

    })
    //src 打包后的css压缩
gulp.task('app-css', function() {

    return gulp.src('./dist/static/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/static/css/'));

})

// gulp.task('default', ['js-bundle', 'css-bundle'], function() {

// });

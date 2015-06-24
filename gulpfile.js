var gulp = require('gulp');

// css组件
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

// js组件
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// 通用组件
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// 增强容错性
var plumber = require('gulp-plumber');


var paths = {
    sass:'css/sass/*.scss',
    css:'css/*.css',
    js:'js/*.js',
    assets:'assets'
}

// 清理文件夹
gulp.task('cleanJS', function(cb) {
    del(['assets/js/all.min.js'], cb);
});

// 生成最终css
// gulp.task('sass', function() {
//     gulp.src(paths.sass)
//         .pipe(plumber())
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(gulp.dest('css'))
//         .pipe(minifycss())
//         .pipe(rename('style.min.css'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('assets/css'))

// });

gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('assets/css'))
});

// 检测js
gulp.task('lint', function() {
    gulp.src(paths.js)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 生成最终js
// gulp.task('js', ['cleanJS'], function() {
//     gulp.src(paths.js)
//         .pipe(plumber())
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(concat('all.min.js'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('assets/js'))
// });

gulp.task('js', ['cleanJS'], function() {
    gulp.src(paths.js)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['watch']);

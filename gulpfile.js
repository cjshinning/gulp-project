var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var concat= require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
const spritesmith = require('gulp.spritesmith');

// html
gulp.task('htmlTask', function(){
    gulp.src('./src/*.html')
        .pipe(reload({ stream: true}))
        .pipe(gulp.dest('./dist'))
})

// 压缩css
gulp.task('cssTask', function(){
    gulp.src('./src/css/*.css')
        .pipe(reload({ stream: true}))
        .pipe(rename({suffix:'.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'))
})

// 压缩合并js
gulp.task('jsTask', function(){
    gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix:'.min'}))
        .pipe(reload({ stream: true}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('spritesmith', function() {
    gulp.src('./src/images/icon/*')
      .pipe(cache(
          imagemin()
      ))  
      .pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.css',
          padding:5
      }))
      .pipe(gulp.dest('./dist/images/icon/'))
      .pipe(reload({ stream: true}))
});

// 压缩图片
gulp.task('imageTask', () =>
    gulp.src('./src/images/*')
        .pipe(cache(
            imagemin()
        ))
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({ stream: true}))
);

// 自动刷新
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist",
            proxy:'localhost'
        }
    });
});

// 清理dist文件
gulp.task('clean:dist', function() {
    return del.sync(['./dist/**/*', '!dist/images', '!dist/images/**/*']);
});  

gulp.task('watch', function() {
    // gulp.watch('./src/images/*', ['imageTask']);
    gulp.watch('./src/css/*.css', ['cssTask']);
    gulp.watch('./src/js/*.js', ['jsTask']);
    gulp.watch('./src/*.html', ['htmlTask']);
})

gulp.task('default',function(callback){
    runSequence(['clean:dist','htmlTask','jsTask','cssTask','spritesmith','imageTask','browserSync','watch'],callback)
})
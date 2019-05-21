var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// html
gulp.task('htmlTask', function(){
    gulp.src('./src/*.html')
        .pipe(reload({ stream: true}))
        .pipe(gulp.dest('./dist'))
})

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist",
            proxy:'localhost'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/*.html', ['htmlTask']);
})

gulp.task('default',['htmlTask','browserSync','watch'],function(){
    console.log('任务执行结束.')
})
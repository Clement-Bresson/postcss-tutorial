const browserSync = require('browser-sync')
const gulp = require('gulp')
const njRender = require('gulp-nunjucks-render')
const nj = njRender.nunjucks
const reload = browserSync.reload

gulp.task('markup', () => {
  nj.configure(['src/templates'], {watch: false})
  return gulp.src('src/html/**/*.+(html|nj|nunjucks)')
    .pipe(njRender())
    .pipe(gulp.dest('dist'))
})

gulp.task('sync', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  })
})

gulp.task('watch', function () {
  gulp.watch('src/templates/**/*.+(html|nj|nunjucks)', ['markup', reload])
  gulp.watch('src/html/**/*.+(html|nj|nunjucks)', ['markup', reload])
  gulp.watch('*.html', reload)
})

gulp.task('default', ['markup', 'sync', 'watch'])

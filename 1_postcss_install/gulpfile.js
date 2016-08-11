const browserSync = require('browser-sync')
const gulp = require('gulp')
const njRender = require('gulp-nunjucks-render')
const nj = njRender.nunjucks
const reload = browserSync.reload

// 1 - Command line : npm install --save-dev gulp-postcss
// 2 - Require postcss after npm
const postcss = require('gulp-postcss')

// 3 - Create a task styles to process css files with postcss !! Specific to gulp
gulp.task('styles', () => {
  const processors = []
  return gulp.src('src/styles/styles.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist'))
})

gulp.task('markup', () => {
  nj.configure(['src/templates'], {watch: false})
  return gulp.src('src/html/**/*.+(html|nj|nunjucks)')
    .pipe(njRender())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  gulp.watch('src/templates/**/*.+(html|nj|nunjucks)', ['markup', reload])
  gulp.watch('src/html/**/*.+(html|nj|nunjucks)', ['markup', reload])
  gulp.watch('src/styles/**/*.css', ['styles', reload])
  gulp.watch(['src/images/**/*.+(gif|jpg|png|svg)'], ['images', reload])
  gulp.watch('*.html', reload)
})

gulp.task('sync', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  })
})

// 4 - Add 'styles' task to gulp tasks pile
gulp.task('default', ['markup', 'styles', 'sync', 'watch'])

const browserSync = require('browser-sync')
const gulp = require('gulp')
const njRender = require('gulp-nunjucks-render')
const nj = njRender.nunjucks
const reload = browserSync.reload

const postcss = require('gulp-postcss')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const lost = require('lost')

gulp.task('styles', () => {
  const processors = [
    precss(),
    lost,
    autoprefixer({browsers: ['last 2 versions']})
  ]
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

gulp.task('images', () => {
  return gulp.src('src/images/**/*.+(gif|jpg|png|svg)')
    .pipe(gulp.dest('dist/images'))
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

gulp.task('default', ['markup', 'styles', 'images', 'sync', 'watch'])
